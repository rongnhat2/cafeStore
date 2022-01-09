/**
 * @class CalendarPicker2.
 * @description Provides a simple way to get a minimalistic calender in your DOM.
 * @author KirrNguyen - 25 December 2020.
 */

class myCalender {
    constructor(element, options, data) {
        // Core variables.
        this.date = new Date();
        this._formatDateToInit(this.date);
        this.day = this.date.getDay()
        this.month = this.date.getMonth();
        this.year = this.date.getFullYear();

        this.today = this.date;
        this.value = this.date;

        this.min = options.min;
        this.max = options.max;

        this._formatDateToInit(this.min)
        this._formatDateToInit(this.max)

        this.listOfSubAllDaysAsText = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun' ];
        this.listOfSubAllMonthsAsText = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]; 

        this.father = $(`${element}`)
        var layout = `<div class="calendar-wrapper">
                            <div class="calendar-control">
                                <div class="control-button control-left" id="prev-month"> <i class="fas fa-caret-left"></i> </div>
                                <div class="time-render" id="calendar-year"> </div>
                                <div class="control-button control-right" id="next-month"> <i class="fas fa-caret-right"></i> </div>
                            </div>
                            <div class="calendar-main">
                                <div class="day-header"> </div>
                                <div class="day-wrapper"> </div>
                            </div>
                        </div>`;
        this.father.append(layout);
        this.listOfSubAllDaysAsText.map(v => {
            $(`${element} .day-header` ).append(`<div class="head-item">${v}</div>`)
        })
        $(`${element} #calendar-year`).append(`${this.listOfSubAllMonthsAsText[this.month]} - ${this.year}`)  
        [this.dayAsText, this.monthAsText, this.dateAsText, this.yearAsText] = this.date.toString().split(' '); 
        this._insertDaysIntoGrid();
        this._insertCalendarDays();

    } 
    _getDaysInMonth(month, year){
        if ((!month && month !== 0) || (!year && year !== 0)) return;

        const date = new Date(year, month, 1);
        const days = [];

        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    } 
    _formatDateToInit(date){
        if (!date) return;
        date.setHours(0, 0, 0);
    } 
    _insertCalendarDays(){
        $(".calendar-control").on('click', (clickEvent) => {
            if (clickEvent.target.closest(`#prev-month`)) {
                if (this.month === 0) {
                    this.month = 11;
                    this.year -= 1;
                } else {
                    this.month -= 1;
                }
                this._updateCalendar();
            }
            if (clickEvent.target.closest(`#next-month`)) {
                if (this.month === 11) {
                    this.month = 0;
                    this.year += 1;
                } else {
                    this.month += 1;
                }
                this._updateCalendar();
            }
        })
    }
    _updateCalendar(){
        this.date = new Date(this.year, this.month);
        [this.dayAsText, this.monthAsText, this.dateAsText, this.yearAsText] = this.date.toString().split(' ');
        this.day = this.date.getDay();
        this.month = this.date.getMonth();
        this.year = this.date.getFullYear();
        window.requestAnimationFrame(() => {
            this.father.find(`#calendar-year`).html(`${this.listOfSubAllMonthsAsText[this.month]} - ${this.year}`);
            this._insertDaysIntoGrid();
        })
    }

    _insertDaysIntoGrid(){ 
        let arrayOfDays = this._getDaysInMonth(this.month, this.year);
        let firstDayOfMonth = arrayOfDays[0].getDay();
        firstDayOfMonth = firstDayOfMonth === 0 ? 7 : firstDayOfMonth;
        if (1 < firstDayOfMonth) {
            arrayOfDays = Array(firstDayOfMonth - 1).fill(false, 0).concat(arrayOfDays);
        }
        $("#calendar").find(`.day-wrapper`).find(".days-item").remove()
        arrayOfDays.map(date =>{
            const [Day, Month, Date, Year] = date.toString().split(' ');

            const dateIsTheCurrentValue = this.value.toString() === date.toString();
            const dateIsBetweenAllowedRange = (this.min || this.max) && 
                                                (date.toString() !== this.today.toString() && 
                                                (date < this.min || date > this.max)) || 
                                                (`${Day}` == `Sat`) ||
                                                (`${Day}` == `Sun`);
            $("#calendar")
                .find(`.day-wrapper`)
                .append(`<div class="days-item ${dateIsTheCurrentValue ? "today" : ""}" data-day="${Day}" data-month="${Month}" data-date="${Date}" data-year="${Year}">
                            <div class="title">${date ? Date : ''}</div>
                            <div class="staff-list-item"> </div>
                        </div>`)
        })
    }

}
