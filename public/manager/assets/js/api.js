const Api = {
    Product: {},
    Permission: {},
    Role: {},
    Staff: {},
    Calendar: {},
    Table: {},
    Waiter: {},

};
(() => {
    $.ajaxSetup({
        headers: { 
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content'),
        },
        crossDomain: true
    });
})();


//Product
(() => {
    Api.Product.GetAll = () => $.ajax({
        url: `/apip/product/get`,
        method: 'GET',
    });
    Api.Product.Store = (data) => $.ajax({
        url: `/apip/product/store`,
        method: 'POST',
        data: data,
        contentType: false,
        processData: false,
    });
    Api.Product.getOne = (id) => $.ajax({
        url: `/apip/product/get-one/${id}`,
        method: 'GET',
    });
    Api.Product.Update = (data) => $.ajax({
        url: `/apip/product/update`,
        method: 'POST',
        data: data,
        contentType: false,
        processData: false,
    });
    Api.Product.Delete = (id) => $.ajax({
        url: `/apip/product/delete/${id}`,
        method: 'GET',
    });
})();

//Permission
(() => {
    Api.Permission.GetAll = () => $.ajax({
        url: `/apip/permission/get`,
        method: 'GET',
    });

    Api.Role.GetAll = () => $.ajax({
        url: `/apip/role/get`,
        method: 'GET',
    });
    Api.Role.Store = (data) => $.ajax({
        url: `/apip/role/store`,
        method: 'POST',
        data: data,
        contentType: false,
        processData: false,
    });
    Api.Role.getOne = (id) => $.ajax({
        url: `/apip/role/get-one/${id}`,
        method: 'GET',
    });
    Api.Role.Update = (data) => $.ajax({
        url: `/apip/role/update`,
        method: 'POST',
        data: data,
        contentType: false,
        processData: false,
    });
    Api.Role.Delete = (id) => $.ajax({
        url: `/apip/role/delete/${id}`,
        method: 'GET',
    });
})();

//Staff
(() => {
    Api.Staff.GetAll = () => $.ajax({
        url: `/apip/staff/get`,
        method: 'GET',
    });
    Api.Staff.Store = (data) => $.ajax({
        url: `/apip/staff/store`,
        method: 'POST',
        data: data,
        contentType: false,
        processData: false,
    });
    Api.Staff.getOne = (id) => $.ajax({
        url: `/apip/staff/get-one/${id}`,
        method: 'GET',
    });
    Api.Staff.Update = (data) => $.ajax({
        url: `/apip/staff/update`,
        method: 'POST',
        data: data,
        contentType: false,
        processData: false,
    });
    Api.Staff.Delete = (id) => $.ajax({
        url: `/apip/staff/delete/${id}`,
        method: 'GET',
    });

    Api.Staff.GetWaiter = () => $.ajax({
        url: `/apip/staff/get-waiter`,
        method: 'GET',
    });
})();

//Calendar
(() => {
    Api.Calendar.GetAll = () => $.ajax({
        url: `/apip/calendar/get`,
        method: 'GET',
    });
    Api.Calendar.Store = (data) => $.ajax({
        url: `/apip/calendar/store`,
        method: 'POST',
        data: data,
        contentType: false,
        processData: false,
    });

})();

//Table
(() => {
    Api.Table.GetAll = () => $.ajax({
        url: `/apip/table/get`,
        method: 'GET',
    });
    Api.Table.Store = (data) => $.ajax({
        url: `/apip/table/store`,
        method: 'POST',
        data: data,
        contentType: false,
        processData: false,
    });
    Api.Table.Delete = (id) => $.ajax({
        url: `/apip/table/delete/${id}`,
        method: 'GET',
    });
})();

//Table
(() => {
    Api.Waiter.GetTable = () => $.ajax({
        url: `/apip/waiter/get-table`,
        method: 'GET',
    });
    Api.Waiter.GetProduct = () => $.ajax({
        url: `/apip/waiter/get-product`,
        method: 'GET',
    });
    Api.Waiter.getOne = (id) => $.ajax({
        url: `/apip/waiter/get-one/${id}`,
        method: 'GET',
    });

    Api.Waiter.Store = (data) => $.ajax({
        url: `/apip/waiter/store`,
        method: 'POST',
        data: data,
        contentType: false,
        processData: false,
    });
    Api.Waiter.Update = (data) => $.ajax({
        url: `/apip/waiter/update`,
        method: 'POST',
        data: data,
        contentType: false,
        processData: false,
    });
})();


