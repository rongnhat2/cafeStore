const View = {
    table: {
        __generateDTRow(data){
            return [
                `<div class="id-order">${data.id}</div>`,
                data.name,
                data.metadata,
                `<div class="view-data modal-fs-control" style="cursor: pointer" atr="View" data-id="${data.id}"><i class="anticon anticon-edit"></i></div>
                <div class="view-data modal-fs-control" style="cursor: pointer" atr="Delete" data-id="${data.id}"><i class="anticon anticon-delete"></i></div>`
            ]
        },
        init(){
            var row_table = [
                    {
                        title: 'ID',
                        name: 'id',
                        orderable: true,
                        width: '10%',
                    },
                    {
                        title: 'Tên',
                        name: 'name',
                        orderable: true,
                    },
                    {
                        title: 'Metadata',
                        name: 'icon',
                        orderable: true,
                        width: '50%',
                    },
                    {
                        title: 'Hành động',
                        name: 'Action',
                        orderable: true,
                        width: '10%',
                    },
                ];
            ViewIndex.table.init("#data-table", row_table);
        }
    },
    Metadata: {
        getVal(resource){
            var data_return = "";
            var list_metadata = $( `${resource} .metadata-item` ).filter((index, item) => $(item).val() != "");
            list_metadata.each(function( index ) {
                if ($(this).val() != ""){
                    data_return += $(this).val()
                    if (index < list_metadata.length - 1) data_return += " | ";
                }
            });
            return data_return;
        },
        setVal(resource, value_input){
            $(`${resource} .metadata-group`).append(`
                <div class="row m-b-10 meta-item">
                    <div class="col-xs-12 col-sm-12 col-md-10 col-lg-10">
                        <input type="text" class="form-control metadata-item" placeholder="" value="${value_input}">
                    </div> 
                    <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2">
                        <button class="btn btn-danger metadata-remove" atr="Metadata Delete"><i class="fas fa-times"></i></button>
                    </div> 
                </div>  
            `);
        },
        Create(resource){
            $(`${resource} .metadata-group`).append(`
                <div class="row m-b-10 meta-item">
                    <div class="col-xs-12 col-sm-12 col-md-10 col-lg-10">
                        <input type="text" class="form-control metadata-item" placeholder="">
                    </div> 
                    <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2">
                        <button class="btn btn-danger metadata-remove" atr="Metadata Delete"><i class="fas fa-times"></i></button>
                    </div> 
                </div>  
            `);
        },
        onCreate(resource, name){
            $(document).on('click', `${resource} .metadata-create`, function() {
                if($(this).attr('atr').trim() == name) {
                    View.Metadata.Create(resource);
                }
            });
        },
        onRemove(resource, name){
            $(document).on('click', `${resource} .metadata-remove`, function() {
                if($(this).attr('atr').trim() == name) {
                    $(this).parent().parent().remove();
                }
            });
        },
        clear(resource){
            $(`${resource} .metadata-group`).find('.meta-item').remove()
        }
    },
    modals: {
        onControl(name, callback){
            $(document).on('click', '.modal-fs-control', function() {
                var id = $(this).attr('data-id');
                if($(this).attr('atr').trim() == name) {
                    callback(id);
                }
            });
        },
        onClose(){
            $(document).on('click', '.modal-close', function() {
                $('.modal-fullscreen').removeClass('show');
                $('body').removeClass('modal-fs-open');
            });
            $(document).on('click', '.close-modal', function() {
                $('.modal-fullscreen').removeClass('show');
                $('body').removeClass('modal-fs-open');
            });
            $(document).mouseup(function(e) {
                var container = $(".fs-body");
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    $('.modal-fullscreen').removeClass('show');
                    $('body').removeClass('modal-fs-open');
                }
            });
        },
        launch(resource, modalTitleHTML, modalBodyHTML, modalFooterHTML){
            $(`${resource} .fs-title .modal-title`).html(modalTitleHTML);
            $(`${resource} .fs-content .fs-content-wrapper`).html(modalBodyHTML);
            $(`${resource} .fs-footer .close-modal`).html(modalFooterHTML[0]);
            $(`${resource} .fs-footer .push-modal`).html(modalFooterHTML[1]);
        },
        onShow(resource){
            $(resource).addClass('show');
            $('body').addClass('modal-fs-open');
            $(document).off('click', `${resource} .push-modal`);
        },
        onHide(resource){
            $(resource).removeClass('show');
            $('body').removeClass('modal-fs-open');
        },
        Create: {
            resource: '#create-modal',
            setDefaul(){ this.init();  },
            setVal(data){ },
            getVal(){
                var resource = this.resource;
                var fd = new FormData();
                var required_data = [];
                var onPushData = true;

                var data_name      = $(`${resource}`).find('.data-name').val();
                var data_meta      = View.Metadata.getVal(resource);
                var data_image     = $(`${resource}`).find('.image-input[name=image]')[0].files;

                if (data_name == "") { required_data.push('Hãy nhập tên danh mục.'); onPushData = false }
                if (data_image.length <= 0) { required_data.push('Hãy chọn ảnh.'); onPushData = false }
                if (data_meta == "") { required_data.push('Hãy nhập Metadata.'); onPushData = false }

                if (onPushData) {
                    fd.append('file_image', data_image[0]);
                    fd.append('data_name', data_name);
                    fd.append('data_meta', data_meta);
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
                        var data = View.modals.Create.getVal();
                        if (data) callback(data);
                    }
                });
            },
            init() {
                var modalTitleHTML  = `Tạo mới danh mục`;
                var modalBodyHTML   = Template.Category.Create();
                var modalFooterHTML = ['Đóng', 'Tạo mới'];

                View.modals.launch(this.resource, modalTitleHTML, modalBodyHTML, modalFooterHTML);
                ViewIndex.textCount.init('.data-name', '.data-name-return', 254);

                $(document).off('click', `${View.modals.Create.resource} .metadata-create`);
                $(document).off('click', `${View.modals.Create.resource} .metadata-remove`);
                View.Metadata.onCreate(View.modals.Create.resource, "Metadata Create");
                View.Metadata.onRemove(View.modals.Create.resource, "Metadata Delete");
            }
        },
        Update: {
            resource: '#update-modal',
            setDefaul(){ this.init();  },
            textDefaul(){
                ViewIndex.textCount.defaul(this.resource +' .data-name', this.resource + ' .data-name-return', 254)
            },
            setVal(data){
                $(this.resource).find('.data-id').val(data[0].id);
                $(this.resource).find('.data-name').val(data[0].name);
                $(this.resource).find('.icon-preview').css({
                    'background-image': `url('/${data[0].image ?? 'icon/noimage.png'}')`
                })
                var metadata_list = data[0].metadata.split(" | ");
                View.Metadata.clear('#update-modal');
                for (var i = 0; i < metadata_list.length; i++) {
                    View.Metadata.setVal('#update-modal', metadata_list[i])
                }
            },
            getVal(){
                var resource = this.resource;
                var fd = new FormData();
                var onPushData = true;

                var data_id      = $(`${resource}`).find('.data-id').val();
                var data_name      = $(`${resource}`).find('.data-name').val();
                var data_meta      = View.Metadata.getVal(resource);
                var data_image     = $(`${resource}`).find('.image-input[name=image]')[0].files;

                if (onPushData) {
                    fd.append('data_id', data_id);
                    fd.append('file_image', data_image[0] ?? "null");
                    fd.append('data_name', data_name);
                    fd.append('data_meta', data_meta);
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
                        var data = View.modals.Update.getVal();
                        if (data) callback(data);
                    }
                });
            },
            init() {
                var modalTitleHTML = `Cập nhật dịch vụ`;
                var modalBodyHTML  = Template.Category.Update();
                var modalFooterHTML = ['Đóng', 'Cập nhật'];
                View.modals.launch(this.resource, modalTitleHTML, modalBodyHTML, modalFooterHTML);

                $(document).off('click', `${View.modals.Update.resource} .metadata-create`);
                $(document).off('click', `${View.modals.Update.resource} .metadata-remove`);
                View.Metadata.onCreate(View.modals.Update.resource, "Metadata Create");
                View.Metadata.onRemove(View.modals.Update.resource, "Metadata Delete");
            }
        },
        Delete: {
            resource: '#delete-modal',
            setDefaul(){ this.init(); },
            textDefaul(){ },
            setVal(data){ },
            getVal(){
            },
            onPush(name, callback){
                var resource = this.resource;
                $(document).on('click', `${this.resource} .push-modal`, function() {
                    if($(this).attr('atr').trim() == name) {
                        callback();
                    }
                });
            },
            init() {
                var modalTitleHTML = `Xóa bài viết`;
                var modalBodyHTML  = Template.Category.Delete();
                var modalFooterHTML = ['Đóng', 'Xóa'];
                View.modals.launch(this.resource, modalTitleHTML, modalBodyHTML, modalFooterHTML);
            }
        },
        init() {
            this.onClose();

            this.Create.init();
            this.Update.init();
            this.Delete.init();
        }
    },
    init(){
        View.table.init();
        View.modals.init();
    }
};
(() => {
    View.init();


    View.modals.onControl("Create", () => {
        var resource = View.modals.Create.resource;
        View.modals.onShow(resource);
        View.modals.Create.onPush("Push", (fd) => {
            ViewIndex.helper.showToastProcessing('Processing', 'Đang tạo!');
            Api.Category.Store(fd)
                .done(res => {
                    ViewIndex.helper.showToastSuccess('Success', 'Tạo thành công !');
                    getData();
                })
                .fail(err => { ViewIndex.helper.showToastError('Error', 'Có lỗi sảy ra'); })
                .always(() => { });
            View.modals.onHide(resource)
            View.modals.Create.setDefaul();
        })
    })
    View.modals.onControl("View", (id) => {
        var resource = View.modals.Update.resource;
        View.Metadata.clear(View.modals.Update.resource)
        Api.Category.getOne(id)
            .done(res => {
                View.modals.onShow(resource);
                View.modals.Update.setVal(res.data);
                View.modals.Update.textDefaul()
                View.modals.Update.onPush("Push", (fd) => {
                ViewIndex.helper.showToastProcessing('Processing', 'Đang cập nhật!');
                Api.Category.Update(fd)
                    .done(res => {
                        ViewIndex.helper.showToastSuccess('Success', 'Cập nhật thành công !');
                        getData();
                    })
                    .fail(err => { ViewIndex.helper.showToastError('Error', 'Có lỗi sảy ra'); })
                    .always(() => { });
                    View.modals.onHide(resource)
                    View.modals.Update.setDefaul();
                })
            })
            .fail(err => { ViewIndex.helper.showToastError('Error', 'Có lỗi sảy ra'); })
            .always(() => { }); 
    })
    View.modals.onControl("Delete", (id) => {
        var resource = View.modals.Delete.resource;
        View.modals.onShow(resource);
        View.modals.Delete.onPush("Push", () => {
        ViewIndex.helper.showToastProcessing('Processing', 'Đang xóa!');
        Api.Category.Delete(id)
            .done(res => {
                ViewIndex.helper.showToastSuccess('Success', 'Xóa thành công !');
                getData();
            })
            .fail(err => { ViewIndex.helper.showToastError('Error', 'Có lỗi sảy ra'); })
            .always(() => { });
            View.modals.onHide(resource)
            View.modals.Delete.setDefaul();
        })
    })


    function init(){
        getData();
    }
    function getData(){
        Api.Category.GetAll()
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
