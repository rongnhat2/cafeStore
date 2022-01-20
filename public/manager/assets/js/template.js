const Template = {
    Product: {
        Create(){
            return `<div class="row">
                        <div class="error-log col-md-12"></div>
                        <div class="form-group col-md-12">
                            <label >Tên sản phẩm <span class="data-name-return"></span></label>
                            <input type="text" class="form-control data-name" placeholder="Tên sản phẩm">
                        </div>   
                        <div class="form-group image-select-group col-md-12">
                            <div class="form-header">
                                <label>Icon (220 x 220) </label>
                                <label class="image-select" for="image"><i class="fas fa-search m-r-10"></i>Chọn ảnh</label>
                                <input type="file" class="form-control image-input" id="image" name="image"  accept="image/*">
                            </div>
                            <div class="form-preview icon-preview form_1_1" style="background-image: url('/manager/images_global/noimage.jpg');"> </div>
                        </div>
                        <div class="form-group col-md-12">
                            <label >Đơn giá <span class="data-prices-return"></span></label>
                            <input type="number" class="form-control number-box data-prices" placeholder="Đơn giá">
                        </div>   
                    </div>`
        },
        Update(){
            return `<input type="hidden" class="form-control data-id" required="">
                    <div class="row">
                        <div class="error-log col-md-12"></div>
                        <div class="form-group col-md-12">
                            <label >Tên sản phẩm <span class="data-name-return"></span></label>
                            <input type="text" class="form-control data-name" placeholder="Tên sản phẩm">
                        </div>   
                        <div class="form-group image-select-group col-md-12">
                            <div class="form-header">
                                <label>Icon (220 x 220) </label>
                                <label class="image-select" for="image-update"><i class="fas fa-search m-r-10"></i>Chọn ảnh</label>
                                <input type="file" class="form-control image-input" id="image-update" name="image"  accept="image/*">
                            </div>
                            <div class="form-preview icon-preview form_1_1 data-image" style="background-image: url('/manager/images_global/noimage.jpg');"> </div>
                        </div>
                        <div class="form-group col-md-12">
                            <label >Đơn giá <span class="data-prices-return"></span></label>
                            <input type="number" class="form-control number-box data-prices" placeholder="Đơn giá">
                        </div>   
                    </div>`
        },
        Delete(){
            return `<div class="wrapper d-flex justify-center"><img src="/images_global/funny.gif" alt=""></div>`
        }
    },
    Permission: {
        Create(){
            return `<div class="row">
                        <div class="error-log col-md-12"></div>
                        <div class="form-group col-md-12">
                            <label >Chức vụ <span class="data-name-return"></span></label>
                            <input type="text" class="form-control data-name" placeholder="Chức vụ">
                        </div>   
                        <div class="form-group permission-list col-md-12">
                            <label >Quyền </label>
                            
                        </div>
                    </div>`
        },
        Update(){
            return `<input type="hidden" class="form-control data-id" required="">
                    <div class="row">
                        <div class="error-log col-md-12"></div>
                        <div class="form-group col-md-12">
                            <label >Chức vụ <span class="data-name-return"></span></label>
                            <input type="text" class="form-control data-name" placeholder="Chức vụ">
                        </div>   
                        <div class="form-group permission-list col-md-12">
                            <label >Quyền </label>
                            
                        </div>
                    </div>`
        },
        Delete(){
            return `<div class="wrapper d-flex justify-center"><img src="/images_global/funny.gif" alt=""></div>`
        }
    },
    Staff: {
        Create(){
            return `<div class="row">
                        <div class="error-log col-md-12"></div>
                        <div class="form-group col-md-12">
                            <label >Email <span class="data-email-return"></span></label>
                            <input type="email" class="form-control data-email" placeholder="Email">
                        </div>   
                        <div class="form-group col-md-12">
                            <label >Mật khẩu <span class="data-password-return"></span></label>
                            <input type="password" class="form-control data-password" placeholder="Mật khẩu">
                        </div>   
                        <div class="form-group col-md-12">
                            <label >Họ và tên <span class="data-name-return"></span></label>
                            <input type="text" class="form-control data-name" placeholder="Họ và tên">
                        </div>  
                        <div class="form-group col-md-12">
                            <label >Điện thoại <span class="data-telephone-return"></span></label>
                            <input type="text" class="form-control data-telephone" placeholder="Điện thoại">
                        </div>  
                        <div class="form-group col-md-12">
                            <label >Địa chỉ <span class="data-address-return"></span></label>
                            <input type="text" class="form-control data-address" placeholder="Địa chỉ">
                        </div>  
                        <div class="form-group col-md-12">
                            <label >Số chứng minh nhân dân <span class="data-code-return"></span></label>
                            <input type="text" class="form-control data-code" placeholder="Số chứng minh nhân dân">
                        </div>    
                        <div class="form-group col-md-12">
                            <label class="d-flex">Chức vụ </label>
                            <label class="m-r-20"><input type="radio" name="permission" class="permission-item" value="0"><span class="m-l-5">Nhân viên</span></label>
                            <label class="m-r-20"><input type="radio" name="permission" class="permission-item" value="1"><span class="m-l-5">Quản lí</span></label>
                        </div>
                        <div class="form-group role-list hidden col-md-12">
                            <label class="d-flex">Phân quyền</label>
                            
                        </div>
                    </div>`
        },
        Update(){
            return `<input type="hidden" class="form-control data-id" required="">
                    <input type="hidden" class="form-control data-manager_id" required="">
                    <div class="row">
                        <div class="error-log col-md-12"></div>
                        <div class="form-group col-md-12">
                            <label >Email <span class="data-email-return"></span></label>
                            <input type="email" class="form-control data-email" placeholder="Email" readonly>
                        </div>   
                        <div class="form-group col-md-12">
                            <label >Họ và tên <span class="data-name-return"></span></label>
                            <input type="text" class="form-control data-name" placeholder="Họ và tên">
                        </div>  
                        <div class="form-group col-md-12">
                            <label >Điện thoại <span class="data-telephone-return"></span></label>
                            <input type="text" class="form-control data-telephone" placeholder="Điện thoại">
                        </div>  
                        <div class="form-group col-md-12">
                            <label >Địa chỉ <span class="data-address-return"></span></label>
                            <input type="text" class="form-control data-address" placeholder="Địa chỉ">
                        </div>  
                        <div class="form-group col-md-12">
                            <label >Số chứng minh nhân dân <span class="data-code-return"></span></label>
                            <input type="text" class="form-control data-code" placeholder="Số chứng minh nhân dân">
                        </div>    
                        <div class="form-group col-md-12">
                            <label class="d-flex">Chức vụ </label>
                            <label class="m-r-20"><input type="radio" name="permission" class="permission-item" value="0"><span class="m-l-5">Nhân viên</span></label>
                            <label class="m-r-20"><input type="radio" name="permission" class="permission-item" value="1"><span class="m-l-5">Quản lí</span></label>
                        </div>
                        <div class="form-group role-list hidden col-md-12">
                            <label class="d-flex">Phân quyền</label>
                        </div>
                    </div>`
        },
        Delete(){
            return `<div class="wrapper d-flex justify-center"><img src="/images_global/funny.gif" alt=""></div>`
        }
    },
    Table: {
        Create(){
            return `<div class="row">
                        <div class="error-log col-md-12"></div>
                        <div class="form-group col-md-12">
                            <label >Tên bàn <span class="data-name-return"></span></label>
                            <input type="text" class="form-control data-name" placeholder="Ví dụ: bàn 1">
                        </div>  
                        <div class="form-group col-md-12">
                            <label >Kích thước <span class="data-size-return"></span></label>
                            <input type="text" class="form-control data-size" placeholder="Ví dụ: 4 chỗ">
                        </div>  
                    </div>`
        },
        Delete(){
            return `<div class="wrapper d-flex justify-center"><img src="/images_global/funny.gif" alt=""></div>`
        }
    },
    Order: {
        Update(){
            return `<div class="row">
                        <input type="hidden" class="form-control data-id" required="">
                        <div class="error-log col-md-12"></div>
                        <div class="form-group col-md-12">
                            <label class="d-flex">Đơn hàng</label>
                            <div class="order-list m-b-10"></div>
                            <div class="order-action justify-content-end m-b-20">
                                <button class="btn btn-success create-product">Tạo mới</button>
                            </div>
                            <div class="order-action m-b-20">
                                <h4 class="text-center total_prices_data"></h4>
                                <button class="btn btn-success w-100 sum-price-product">Tổng</button>
                            </div>
                            <div class="order-action justify-content-end">
                                <button class="btn btn-primary w-100 price-order" atr="Price">Thanh toán</button>
                            </div>
                        </div>  
                    </div>`
        },
    },
}