const View = {
    table: {
        __generateDTRow(data){
            return [
                `<div class="id-order">${data.id}</div>`,
                data.email,
                data.name,
                data.telephone,
                data.permission_status == 0 ? "Nhân viên" : "Quản lí",
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
                        title: 'Email',
                        name: 'email',
                        orderable: true,
                    },
                    {
                        title: 'Họ và tên',
                        name: 'name',
                        orderable: true,
                    },
                    {
                        title: 'Số điện thoại',
                        name: 'name',
                        orderable: true,
                    },
                    {
                        title: 'Chức vụ',
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
    Role: {
        setVal(data){
            $(`.role-item[value=${data}]`).prop('checked', true);
        },
        getVal(resource){
            return $(`${resource} .role-item:checked`).val();
        },
        render(data, resource){
            $(resource).find('.role-list').find(`label.role-item-label`).remove()
            data.map(v => {
                $(resource).find('.role-list').append(`<label class="m-r-20 role-item-label"><input type="radio" class="role-item" name="role_data" value="${v.id}"><span class="m-l-5">${v.name}</span></label>`)
            })
        }
    },
    Permission: {
        setVal(data){
            $(`.permission-item[value=${data}]`).prop('checked', true);
            if (data == 1) 
                $(".role-list").removeClass("hidden")
            else
                $(".role-list").addClass("hidden")
        },
        onChange(){
            $(document).on('change', `.permission-item`, function() {
                if($(this).val() == 0) {
                    $('.role-list').addClass("hidden")
                }else{
                    $('.role-list').removeClass("hidden")
                }
            });
        },
        getVal(resource){
            return $(`${resource} .permission-item:checked`).val();
        },
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
                var data_password          = $(`${resource}`).find('.data-password').val();
                var data_email          = $(`${resource}`).find('.data-email').val();
                var data_telephone      = $(`${resource}`).find('.data-telephone').val();
                var data_address        = $(`${resource}`).find('.data-address').val();
                var data_code           = $(`${resource}`).find('.data-code').val();
                var data_permission     = View.Permission.getVal(resource);
                var data_role           = data_permission == 0 ? null : View.Role.getVal(resource);

                if (data_name == '') { required_data.push('Nhập tên.'); onPushData = false }
                if (data_email == '') { required_data.push('Nhập Email.'); onPushData = false }
                if (data_password == '') { required_data.push('Nhập Mật khẩu.'); onPushData = false }


                if (onPushData) {
                    fd.append('data_name', data_name);
                    fd.append('data_email', data_email);
                    fd.append('data_password', data_password);
                    fd.append('data_telephone', data_telephone);
                    fd.append('data_address', data_address);
                    fd.append('data_code', data_code);
                    fd.append('data_permission', data_permission);
                    fd.append('data_role', data_role);
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
                var modalBodyHTML   = Template.Staff.Create();
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
                $(this.resource).find('.data-id').val(data[0].info_id)
                $(this.resource).find('.data-manager_id').val(data[0].id)
                $(this.resource).find('.data-email').val(data[0].email)
                $(this.resource).find('.data-name').val(data[0].name)
                $(this.resource).find('.data-telephone').val(data[0].telephone)
                $(this.resource).find('.data-address').val(data[0].address)
                $(this.resource).find('.data-code').val(data[0].code)
                View.Permission.setVal(data[0].permission_status);
                View.Role.setVal(data[0].role_id);
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
                var manager_id          = $(`${resource}`).find('.data-manager_id').val();
                var data_name           = $(`${resource}`).find('.data-name').val();
                var data_email          = $(`${resource}`).find('.data-email').val();
                var data_telephone      = $(`${resource}`).find('.data-telephone').val();
                var data_address        = $(`${resource}`).find('.data-address').val();
                var data_code           = $(`${resource}`).find('.data-code').val();
                var data_permission     = View.Permission.getVal(resource);
                var data_role           = data_permission == 0 ? null : View.Role.getVal(resource);

                if (data_name == '') { required_data.push('Nhập tên.'); onPushData = false }


                if (onPushData) {
                    fd.append('data_id', data_id);
                    fd.append('manager_id', manager_id);
                    fd.append('data_name', data_name);
                    fd.append('data_email', data_email);
                    fd.append('data_telephone', data_telephone);
                    fd.append('data_address', data_address);
                    fd.append('data_code', data_code);
                    fd.append('data_permission', data_permission);
                    fd.append('data_role', data_role);
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
                var modalBodyHTML   = Template.Staff.Update();
                var modalFooterHTML = ['Đóng', 'Cập nhật'];

                ViewIndex.modalsSide.launch(this.resource, modalTitleHTML, modalBodyHTML, modalFooterHTML);
                ViewIndex.numberInputBox(".number-box")
                ViewIndex.textCount.init('.data-name', '.data-name-return', 254);
                ViewIndex.textCount.init('.data-telephone', '.data-telephone-return', 254);
                ViewIndex.textCount.init('.data-address', '.data-address-return', 254);
                ViewIndex.textCount.init('.data-code', '.data-code-return', 254);
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
                var modalBodyHTML  = Template.Staff.Delete();
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
        View.Permission.onChange()
    }
};
(() => {
    View.init();

    ViewIndex.modalsSide.onControl("Create", () => {
        var resource = View.modalsSide.Create.resource;
        ViewIndex.modalsSide.onShow(resource);
        getRole(resource);
        View.modalsSide.Create.onPush("Push", (fd) => {
            ViewIndex.helper.showToastProcessing('Processing', 'Đang tạo!');
            Api.Staff.Store(fd)
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
        getRole(resource);
        Api.Staff.getOne(id)
            .done(res => {
                View.modalsSide.Update.setVal(res.data);
                View.modalsSide.Update.textDefaul()
                View.modalsSide.Update.onPush("Push", (fd) => {
                    ViewIndex.helper.showToastProcessing('Processing', 'Đang tạo!');
                    Api.Staff.Update(fd)
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
            Api.Staff.Delete(id)
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

    function getRole(resource){
        Api.Role.GetAll()
            .done(res => {
                View.Role.render(res.data, resource)
            })
            .fail(err => { ViewIndex.helper.showToastError('Error', 'Có lỗi sảy ra'); })
            .always(() => { });
    }

    function getData(){
        Api.Staff.GetAll()
            .done(res => {
                ViewIndex.table.clearRows();
                Object.values(res.data).map(v => {
                    if (v.permission_status != null) {
                        ViewIndex.table.insertRow(View.table.__generateDTRow(v));
                        ViewIndex.table.render();
                    }
                })
                ViewIndex.table.render();
            })
            .fail(err => { ViewIndex.helper.showToastError('Error', 'Có lỗi sảy ra'); })
            .always(() => { });
    }
    init();
})();
