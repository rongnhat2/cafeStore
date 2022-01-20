const View = {
    table: {
        __generateDTRow(data){
            return [
                `<div class="id-order">${data.id}</div>`,
                data.name,
                data.size,
                ` <div class="view-data modal-side-control" style="cursor: pointer" atr="Delete" data-id="${data.id}"><i class="anticon anticon-delete"></i></div>`
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
                        title: 'Kích thước',
                        name: 'icon',
                        orderable: true,
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
                var data_size         = $(`${resource}`).find('.data-size').val();

                if (data_name == '') { required_data.push('Nhập tên sản phẩm.'); onPushData = false }
                if (data_size == '') { required_data.push('Nhập giá tiền.'); onPushData = false }

                if (onPushData) {
                    fd.append('data_name', data_name);
                    fd.append('data_size', data_size);
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
                var modalBodyHTML   = Template.Table.Create();
                var modalFooterHTML = ['Đóng', 'Tạo mới'];

                ViewIndex.modalsSide.launch(this.resource, modalTitleHTML, modalBodyHTML, modalFooterHTML);
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
                var modalBodyHTML  = Template.Table.Delete();
                var modalFooterHTML = ['Đóng', 'Xóa'];
                ViewIndex.modalsSide.launch(this.resource, modalTitleHTML, modalBodyHTML, modalFooterHTML);
            }
        },
        init() {
            this.Create.init();
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
        View.modalsSide.Create.onPush("Push", (fd) => {
            ViewIndex.helper.showToastProcessing('Processing', 'Đang tạo!');
            Api.Table.Store(fd)
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
    ViewIndex.modalsSide.onControl("Delete", (id) => {
        var resource = View.modalsSide.Delete.resource;
        ViewIndex.modalsSide.onShow(resource);

        View.modalsSide.Delete.onPush("Push", () => {
            ViewIndex.helper.showToastProcessing('Processing', 'Đang xóa!');
            Api.Table.Delete(id)
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
    function getData(){
        Api.Table.GetAll()
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
