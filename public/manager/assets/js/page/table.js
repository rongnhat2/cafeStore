const View = {
    Product: {
        data: [],
        dataPrice: {},
        getData(){
            var option_data = ``;
            this.data.map(v => {
                option_data += `<option value="${v.id}" data-prices="${v.prices}">${v.name} - ${v.prices}</option>`
            })
            return option_data;
        }
    },
    Order: {
        onCreate(callback){
            $(document).on('click', `.create-product`, function() {
                callback();
            });
        },
        sumPrices(){
            var total_prices = 0;
            $('.sub-item').each(function(index) {
                var price = $(this).find(".data-item").val()
                var qty = $(this).find(".data-quantity").val()
                total_prices += View.Product.dataPrice[price]*+qty;
            });
            return total_prices;
        },
        productList(){
            var list_data = "";
            $('.sub-item').each(function(index) {
                var price = $(this).find(".data-item").val()
                var qty = $(this).find(".data-quantity").val()
                list_data += price + "~" + qty;
                console.log(index);
                if (index != $('.sub-item').length-1) list_data += " | ";
            });
            return list_data;
        },
        renderSub(){
            var option_data = View.Product.getData();
            $('.order-list').append(`<div class="sub-item row m-b-10">
                                        <div class="col-md-6 p-l-15 p-r-5">
                                            <select class="form-control w-100 data-item" name="" id="">${option_data}</select>
                                        </div>
                                        <div class="col-md-4 p-l-5 p-r-5">
                                            <input type="text" class="form-control data-quantity w-100" placeholder="Số lượng">
                                        </div>
                                        <div class="col-md-2 p-l-5 p-r-15">
                                            <button class="btn btn-primary w-100 remove-sub-item">x</button>
                                        </div>
                                    </div>`)
        },
        init(){
            $(document).on('click', `.sum-price-product`, function() {
                $(".total_prices_data").html(View.Order.sumPrices().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "đ")
            });
            $(document).on('click', `.remove-sub-item`, function() {
                $(this).parent().parent().remove();
            });
        }
    },
    tableSize: {
        render(data){
            var status = ["onwork", "empty", "full"];
            data.map(v => {
                $(".table-list").find(".table-item-wrapper").remove()
                $(".table-list").append(`
                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 table-item-wrapper modal-side-control" atr="View" data-id="${v.id}">
                        <div class="table-item ${status[v.status]}">
                            <div class="table-name">${v.name} - ${v.size} chỗ</div>
                            <div class="table-total">${v.total_prices.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "đ"}</div>
                        </div>
                    </div>
                `)
            })
        }
    },
    modalsSide: {
        Update: {
            resource: '#update-modal-side',
            setDefaul(){ this.init();  },
            setVal(id){ 
                $(this.resource).find('.data-id').val(id)
            },
            textDefaul(){
                ViewIndex.textCount.defaul(this.resource +' .data-name', this.resource + ' .data-name-return', 254)
            },
            getVal(){
                var resource = this.resource;
                var fd = new FormData();
                var required_data = [];
                var onPushData = true;

                var data_manager_id     = $('.manager_id').val();
                var data_id             = $(`${resource}`).find('.data-id').val();
                var data_prices         = View.Order.sumPrices();
                var data_items          = View.Order.productList();

                if (onPushData) {
                    fd.append('data_manager_id', data_manager_id);
                    fd.append('data_id', data_id);
                    fd.append('data_prices', data_prices);
                    fd.append('data_items', data_items);

                    return fd;
                }else{
                    $(`${resource}`).find('.error-log .js-errors').remove();
                    var required_noti = ``;
                    for (var i = 0; i < required_data.length; i++) { required_noti += `<li class="error">${required_data[i]}</li>`; }
                    $(`${resource}`).find('.error-log').prepend(` <ul class="js-errors">${required_noti}</ul> `)
                    return false;
                }
            },
            onUpdate(name, callback){
                var resource = this.resource;
                $(document).on('click', `${this.resource} .push-modal`, function() {
                    if($(this).attr('atr').trim() == name) {
                        var data = View.modalsSide.Update.getVal();
                        if (data) callback(data);
                    }
                });
            },
            onPrice(name, callback){
                var resource = this.resource;
                $(document).on('click', `${this.resource} .price-order`, function() {
                    if($(this).attr('atr').trim() == name) {
                        var data = View.modalsSide.Update.getVal();
                        if (data) callback(data);
                    }
                });
            },
            init() {
                var modalTitleHTML  = `Cập nhật`;
                var modalBodyHTML   = Template.Order.Update();
                var modalFooterHTML = ['Đóng', 'Bàn trống'];

                ViewIndex.modalsSide.launch(this.resource, modalTitleHTML, modalBodyHTML, modalFooterHTML);
                ViewIndex.numberInputBox(".number-box")
                ViewIndex.textCount.init('.data-name', '.data-name-return', 254);
            }
        },
        init() {
            this.Update.init();
        }
    },
    init(){
        View.modalsSide.init();
        View.Order.init();
    }
};
(() => {
    View.init();

    View.Order.onCreate(() => {
        View.Order.renderSub()
    })

    ViewIndex.modalsSide.onControl("View", (id) => {
        var resource = View.modalsSide.Update.resource;
        ViewIndex.modalsSide.onShow(resource);

        Api.Waiter.getOne(id)
            .done(res => {
                View.modalsSide.Update.setVal(id);
                View.modalsSide.Update.onPrice("Price", (fd) => {
                    ViewIndex.helper.showToastProcessing('Processing', 'Đang tạo!');
                    Api.Waiter.Store(fd)
                        .done(res => {
                            ViewIndex.helper.showToastSuccess('Success', 'Thanh toán thành công !');
                            getData();
                        })
                        .fail(err => { ViewIndex.helper.showToastError('Error', 'Có lỗi sảy ra'); })
                        .always(() => { });
                    ViewIndex.modalsSide.onHide(resource)
                })
                View.modalsSide.Update.onUpdate ("Push", (fd) => {
                    ViewIndex.helper.showToastProcessing('Processing', 'Đang tạo!');
                    Api.Waiter.Update(fd)
                        .done(res => {
                            ViewIndex.helper.showToastSuccess('Success', 'Thanh toán thành công !');
                            getData();
                        })
                        .fail(err => { ViewIndex.helper.showToastError('Error', 'Có lỗi sảy ra'); })
                        .always(() => { });
                    ViewIndex.modalsSide.onHide(resource)
                })
            })
            .fail(err => { ViewIndex.helper.showToastError('Error', 'Có lỗi sảy ra'); })
            .always(() => { }); 
    })
        
    function init(){
        getData();
        getProduct()
    }

    function getData(){
        Api.Waiter.GetTable()
            .done(res => {
                View.tableSize.render(res.data)
            })
            .fail(err => { ViewIndex.helper.showToastError('Error', 'Có lỗi sảy ra'); })
            .always(() => { });
    }
    function getProduct(){
        Api.Waiter.GetProduct()
            .done(res => {
                View.Product.data = res.data;
                res.data.map(v => {
                    View.Product.dataPrice[v.id] = v.prices
                })
            })
            .fail(err => { ViewIndex.helper.showToastError('Error', 'Có lỗi sảy ra'); })
            .always(() => { });
    }
    init();
})();
