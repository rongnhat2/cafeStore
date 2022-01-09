const View = {
    Waiter: {
        data: [],
        dataWaiter: [],
        jsonWaiter: {},
        render(data){
            $('.staff-list').find(`option`).remove()
            $('.staff-list').append(`<option value="0">----------------------</option>`)
            data.map(v => {
                $('.staff-list').append(`<option value="${v.id}">${v.name}</option>`)
            })
        }
    },
    Calendar:{
        getVal(){
            var staff_morning_01   = $('.morning-time1').val()
            var staff_morning_02   = $('.morning-time2').val()
            var staff_afternoon_01 = $('.afternoon-time1').val()
            var staff_afternoon_02 = $('.afternoon-time2').val()

            return `${staff_morning_01} ~ 1 | ${staff_morning_02} ~ 1 | ${staff_afternoon_01} ~ 2 | ${staff_afternoon_02} ~ 2`;
        },
        setVal(data){
            var data_date = ["0 ~ 0", "0 ~ 0", "0 ~ 0", "0 ~ 0"];
            View.Waiter.data.map(v => {
                if (v.date_data == data) {
                    data_date = v.staff_id.split(" | ")
                }
            })
            var staff_morning_01   = $('.morning-time1').val(data_date[0].split(" ~ ")[0])
            var staff_morning_02   = $('.morning-time2').val(data_date[1].split(" ~ ")[0])
            var staff_afternoon_01 = $('.afternoon-time1').val(data_date[2].split(" ~ ")[0])
            var staff_afternoon_02 = $('.afternoon-time2').val(data_date[3].split(" ~ ")[0])
        },
        onDaySelect(callback){
            $(document).on('click', `.days-item`, function() {
                $(".days-item").removeClass("selected")
                $(this).addClass("selected")
                var day     = $(this).attr("data-day")
                var month   = $(this).attr("data-month")
                var date    = $(this).attr("data-date")
                var year    = $(this).attr("data-year")
                var calendar_string = `${day} | ${month} | ${date} | ${year}`
                callback(calendar_string)
            });
        },
        onNext(callback){
            $(document).on('click', `.calendar-control`, function() {
                callback()
            });
        },
        renderWaiter(data){
            $( ".days-item " ).find(".staff-item").remove()
            data.map(v => {
                var [day, month, date, year] = v.date_data.split(" | ");
                $( ".days-item " ).each(function( index ) {
                    if ($(this).attr("data-day") == day && $(this).attr("data-month") == month && $(this).attr("data-date") == date && $(this).attr("data-year") == year) {
                        var time_data = $(this)
                        v.staff_id.split(" | ").map(q => {
                            time_data.find(".staff-list-item").append(`
                                <div class="staff-item badge badge-pill ${q.split(" ~ ")[1] == 1 ? "badge-green" : "badge-orange"}">
                                    ${View.Waiter.jsonWaiter[q.split(" ~ ")[0]] ?? null}
                                </div>`)
                        })
                    }
                });
            })
        },
        onUpdate( callback){
            $(document).on('click', `.update-data`, function() {
                callback()
            });
        },
        init(){
            var date = 0;
            const nextYear = new Date().getFullYear() + 1;
            const calender = new myCalender('#calendar', {
                min: new Date(),
                max: new Date(nextYear, 10) 
            }, []);
        }
    },
    init(){
        View.Calendar.init()
    }
};
(() => {
    View.init();
    
    View.Calendar.onDaySelect((data) => {
        $(document).off('click', `.update-data`);
        View.Calendar.setVal(data)
        View.Calendar.onUpdate( () => {
            var fd = new FormData();
            fd.append('calendar', View.Calendar.getVal());
            fd.append('day_select', data);
            Api.Calendar.Store(fd)
                .done(res => {
                    ViewIndex.helper.showToastSuccess('Success', 'Cập nhật thành công !');
                    GetCalendar()
                })
                .fail(err => { ViewIndex.helper.showToastError('Error', 'Có lỗi sảy ra'); })
                .always(() => { });
        })
    })
    View.Calendar.onNext(() => {
        GetCalendar()
    }) 
    function init(){
        GetWaiter()
        GetCalendar()
    }
    function GetWaiter(){
        Api.Staff.GetWaiter()
            .done(res => {
                View.Waiter.render(res.data)
                View.Waiter.dataWaiter = res.data;
                res.data.map(v => {
                    View.Waiter.jsonWaiter[v.id] = v.name;
                })
            })
            .fail(err => { ViewIndex.helper.showToastError('Error', 'Có lỗi sảy ra'); })
            .always(() => { });
    }
    function GetCalendar(){
        Api.Calendar.GetAll()
            .done(res => {
                View.Waiter.data = res.data
                View.Calendar.renderWaiter(res.data);
            })
            .fail(err => { ViewIndex.helper.showToastError('Error', 'Có lỗi sảy ra'); })
            .always(() => { });
    }
    init();
})();
