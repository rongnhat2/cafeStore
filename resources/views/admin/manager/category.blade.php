@extends('admin.layout')
@section('title', 'Bài viết')
@section('menu-data')
<input type="hidden" name="" class="menu-data" value="manager-group | category">
@endsection()


@section('css')
    <link href="{{ asset('manager/assets/vendors/bootstrap-datepicker/bootstrap-datepicker.min.css') }}" rel="stylesheet">
@endsection()


@section('body')

    
<div class="page-header no-gutters has-tab">
    <div class="d-md-flex m-b-15 align-items-center justify-content-between notification relative" id="notification">
        <div class="media align-center justify-content-between m-b-15 w-100">
            <div class="m-l-15">
                <h4 class="m-b-0">Danh mục</h4>
            </div>
            @include('admin.alert')
        </div>
    </div>
</div>
<div class="card">
    <div class="card-body">
        <div class="row">
            <div class="col-sm-12 col-md-6">
                
            </div>
            <div class="col-sm-12 col-md-6">
                <div class="align-justify-center">
                    <a href="#" class="btn btn-default btn-sm flex-right modal-fs-control" atr="Create">Danh mục<i class="fas fa-plus m-l-5"></i></a> 
                </div>
            </div>
        </div>
        <div class="m-t-25">
            <table id="data-table" class="table"> </table>
        </div>
    </div>
</div>

@endsection()


@section('sub_layout')


<div class="modal-fullscreen" id="create-modal">
    <div class="fs-wrapper">
        <div class="fs-body">
            <div class="fs-title">
                <h4 class="modal-title"> </h4>
                <div class="modal-close">
                    <i class="fas fa-times"></i>
                </div>
            </div>
            <div class="fs-content is-scrolling">
                <div class="fs-content-wrapper">
                </div>
            </div>
            <div class="fs-footer">
                <button type="button" class="btn btn-default close-modal m-r-10" ></button>
                <button type="button" class="btn btn-primary push-modal" atr="Push"></button>
            </div>
        </div>
    </div>
</div>
<div class="modal-fullscreen" id="update-modal">
    <div class="fs-wrapper">
        <div class="fs-body">
            <div class="fs-title">
                <h4 class="modal-title"> </h4>
                <div class="modal-close">
                    <i class="fas fa-times"></i>
                </div>
            </div>
            <div class="fs-content is-scrolling">
                <div class="fs-content-wrapper">
                </div>
            </div>
            <div class="fs-footer">
                <button type="button" class="btn btn-default close-modal m-r-10" ></button>
                <button type="button" class="btn btn-primary push-modal" atr="Push"></button>
            </div>
        </div>
    </div>
</div>
<div class="modal-fullscreen" id="delete-modal">
    <div class="fs-wrapper">
        <div class="fs-body">
            <div class="fs-title">
                <h4 class="modal-title"> </h4>
                <div class="modal-close">
                    <i class="fas fa-times"></i>
                </div>
            </div>
            <div class="fs-content is-scrolling">
                <div class="fs-content-wrapper">
                </div>
            </div>
            <div class="fs-footer">
                <button type="button" class="btn btn-default close-modal m-r-10" ></button>
                <button type="button" class="btn btn-primary push-modal" atr="Push"></button>
            </div>
        </div>
    </div>
</div>

@endsection()

@section('js')
    
    <script src="{{ asset('manager/assets/js/page/category.js') }}"></script>

@endsection()