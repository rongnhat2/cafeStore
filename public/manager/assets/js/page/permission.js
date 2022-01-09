const View = {
    table: {
        __generateDTRow(data){
            return [
                `<div class="id-order">${data.id}</div>`,
                data.name,
                `<div class="view-data modal-side-control" style="cursor: pointer" atr="View" data-id="${data.id}"><i class="anticon anticon-edit"></i></div>
                <div class="view-data modal-side-control" style="cursor: pointer" atr="Delete" data-id="${data.id}"><i class="anticon anticon-delete"></i></div>`
            ]
        },
        init(){
            var row_table = [
                    {
                        title: 'ID',
                        name: 'id',
                        orderable: true,
                    },
                    {
                        title: 'Tên',
                        name: 'name',
                        orderable: true,
                    },
                    {
                        title: 'Hành động',
                        name: 'Action',
                        orderable: true,
                    },
                ];
            ViewIndex.table.init("#data-table", row_table);
        }
    },
    Permission: {
        setVal(data){
            data.map(v => {
                $(`.permission-item[value=${v.permission_id}]`).prop('checked', true);
            })
        },
        getVal(resource){
            var item = $(`${resource} .permission-item:checked`);
            var permission_string = ""
            for (var i = 0; i < item.length; i++) {
                permission_string +=  $(item[i]).val()
                if (i != item.length-1) permission_string += " | "
            }
            return permission_string;
        },
        render(data){
            $('.permission-list').find(`label`).remove()
            data.map(v => {
                $('.permission-list').append(`<label class="m-r-20"><input type="checkbox" class="permission-item" value="${v.id}"><span class="m-l-5">${v.display_name}</span></label>`)
            })
        }
    },
    modalsSide: {
        Create: {
            resource: '#create-modal-side',
            setDefaul(){ this.init();  },
            setVal(data){ 

            },
            getVal(){
                var resource = this.resource;
                var fd = new FormData();
                var required_data = [];
                var onPushData = true;

                var data_name           = $(`${resource}`).find('.data-name').val();
                var data_permission     = View.Permission.getVal(resource);

                if (data_name == '') { required_data.push('Nhập tên.'); onPushData = false }

                if (onPushData) {
                    fd.append('data_name', data_name);
                    fd.append('data_permission', data_permission);
                    return fd;
                }else{
                    $(`${resource}`).find('.error-log .js-errors').remove();
                    var required_noti = ``;
                    for (var i = 0; i < required_data.length; i++) { required_noti += `<li class="error">${required_data[i]}</li>`; }
                    $(`${resource}`).find('.error-log').prepend(` <ul class="js-errors">${required_noti}</ul> `)
                    return false;
                }
            },
            onPush(name, callback){
                var resource = this.resource;
                $(document).on('click', `${this.resource} .push-modal`, function() {
                    if($(this).attr('atr').trim() == name) {
                        var data = View.modalsSide.Create.getVal();
                        if (data) callback(data);
                    }
                });
            },
            init() {
                var modalTitleHTML  = `Tạo mới`;
                var modalBodyHTML   = Template.Permission.Create();
                var modalFooterHTML = ['Đóng', 'Tạo mới'];

                ViewIndex.modalsSide.launch(this.resource, modalTitleHTML, modalBodyHTML, modalFooterHTML);
                ViewIndex.numberInputBox(".number-box")
                ViewIndex.textCount.init('.data-name', '.data-name-return', 254);
            }
        },
        Update: {
            resource: '#update-modal-side',
            setDefaul(){ this.init();  },
            setVal(data){ 
                $(this.resource).find('.data-id').val(data["role"][0].id)
                $(this.resource).find('.data-name').val(data["role"][0].name)
                View.Permission.setVal(data["permission"]);
            },
            textDefaul(){
                ViewIndex.textCount.defaul(this.resource +' .data-name', this.resource + ' .data-name-return', 254)
            },
            getVal(){
                var resource = this.resource;
                var fd = new FormData();
                var required_data = [];
                var onPushData = true;

                var data_id             = $(`${resource}`).find('.data-id').val();
                var data_name           = $(`${resource}`).find('.data-name').val();
                var data_permission     = View.Permission.getVal(resource);


                if (data_name == '') { required_data.push('Nhập tên.'); onPushData = false }


                if (onPushData) {
                    fd.append('data_id', data_id);
                    fd.append('data_name', data_name);
                    fd.append('data_permission', data_permission);
                    return fd;
                }else{
                    $(`${resource}`).find('.error-log .js-errors').remove();
                    var required_noti = ``;
                    for (var i = 0; i < required_data.length; i++) { required_noti += `<li class="error">${required_data[i]}</li>`; }
                    $(`${resource}`).find('.error-log').prepend(` <ul class="js-errors">${required_noti}</ul> `)
                    return false;
                }
            },
            onPush(name, callback){
                var resource = this.resource;
                $(document).on('click', `${this.resource} .push-modal`, function() {
                    if($(this).attr('atr').trim() == name) {
                        var data = View.modalsSide.Update.getVal();
                        if (data) callback(data);
                    }
                });
            },
            init() {
                var modalTitleHTML  = `Cập nhật`;
                var modalBodyHTML   = Template.Permission.Update();
                var modalFooterHTML = ['Đóng', 'Cập nhật'];

                ViewIndex.modalsSide.launch(this.resource, modalTitleHTML, modalBodyHTML, modalFooterHTML);
                ViewIndex.numberInputBox(".number-box")
                ViewIndex.textCount.init('.data-name', '.data-name-return', 254);
            }
        },
        Delete: {
            resource: '#delete-modal-side',
            setDefaul(){ this.init(); },
            textDefaul(){ },
            setVal(data){ },
            getVal(){
            },
            onPush(name, callback){
                var resource = this.resource;
                $(document).on('click', `${this.resource} .push-modal`, function() {
                    if($(this).attr('atr').trim() == name) {
                        callback($(this).attr('data-id'));
                    }
                });
            },
            init() {
                var modalTitleHTML = `Xóa`;
                var modalBodyHTML  = Template.Product.Delete();
                var modalFooterHTML = ['Đóng', 'Xóa'];
                ViewIndex.modalsSide.launch(this.resource, modalTitleHTML, modalBodyHTML, modalFooterHTML);
            }
        },
        init() {

            this.Create.init();
            this.Update.init();
            this.Delete.init();
        }
    },
    init(){
        View.table.init();
        View.modalsSide.init();
    }
};
(() => {
    View.init();

    ViewIndex.modalsSide.onControl("Create", () => {
        var resource = View.modalsSide.Create.resource;
        ViewIndex.modalsSide.onShow(resource);
        getPermission(resource)
        View.modalsSide.Create.onPush("Push", (fd) => {
            ViewIndex.helper.showToastProcessing('Processing', 'Đang tạo!');
            Api.Role.Store(fd)
                .done(res => {
                    ViewIndex.helper.showToastSuccess('Success', 'Tạo thành công !');
                    getData();
                })
                .fail(err => { ViewIndex.helper.showToastError('Error', 'Có lỗi sảy ra'); })
                .always(() => { });
            ViewIndex.modalsSide.onHide(resource)
            View.modalsSide.Create.setDefaul();
        })
    })

    ViewIndex.modalsSide.onControl("View", (id) => {
        var resource = View.modalsSide.Update.resource;
        ViewIndex.modalsSide.onShow(resource);
        getPermission(resource)
        Api.Role.getOne(id)
            .done(res => {
                View.modalsSide.Update.setVal(res.data);
                View.modalsSide.Update.textDefaul()
                View.modalsSide.Update.onPush("Push", (fd) => {
                    ViewIndex.helper.showToastProcessing('Processing', 'Đang tạo!');
                    Api.Role.Update(fd)
                        .done(res => {
                            ViewIndex.helper.showToastSuccess('Success', 'Cập nhật thành công !');
                            getData();
                        })
                        .fail(err => { ViewIndex.helper.showToastError('Error', 'Có lỗi sảy ra'); })
                        .always(() => { });
                    ViewIndex.modalsSide.onHide(resource)
                    View.modalsSide.Update.setDefaul();
                })
            })
            .fail(err => { ViewIndex.helper.showToastError('Error', 'Có lỗi sảy ra'); })
            .always(() => { }); 
        
    })
    ViewIndex.modalsSide.onControl("Delete", (id) => {
        var resource = View.modalsSide.Delete.resource;
        ViewIndex.modalsSide.onShow(resource);

        View.modalsSide.Delete.onPush("Push", () => {
            ViewIndex.helper.showToastProcessing('Processing', 'Đang xóa!');
            Api.Role.Delete(id)
                .done(res => {
                    ViewIndex.helper.showToastSuccess('Success', 'Xóa thành công !');
                    getData();
                })
                .fail(err => { ViewIndex.helper.showToastError('Error', 'Có lỗi sảy ra'); })
                .always(() => { });
            ViewIndex.modalsSide.onHide(resource)
            View.modalsSide.Delete.setDefaul();
        })
    })

    function init(){
        getData();
    }

    function getPermission(resource){
        Api.Permission.GetAll()
            .done(res => {
                View.Permission.render(res.data);
            })
            .fail(err => { ViewIndex.helper.showToastError('Error', 'Có lỗi sảy ra'); })
            .always(() => { });
    }

    function getData(){
        Api.Role.GetAll()
            .done(res => {
                ViewIndex.table.clearRows();
                Object.values(res.data).map(v => {
                    ViewIndex.table.insertRow(View.table.__generateDTRow(v));
                    ViewIndex.table.render();
                })
                ViewIndex.table.render();
            })
            .fail(err => { ViewIndex.helper.showToastError('Error', 'Có lỗi sảy ra'); })
            .always(() => { });
    }
    init();
})();
