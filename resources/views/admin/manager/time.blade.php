@extends('admin.layout')
@section('title', 'Ca làm việc')
@section('menu-data')
<input type="hidden" name="" class="menu-data" value="time-group | time">
@endsection()


@section('css')

@endsection()


@section('body')

    
<div class="card">
    <div class="card-body">
        <div class="m-t-25">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                    <div id='calendar'>
                        
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 border-left">
                     <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <h3>Ca sáng</h3>
                            <div class="form-group col-md-12">
                                <label >Nhân viên </label>
                                <select name="" class="form-control staff-list morning-time1" >

                                </select>
                            </div>   
                            <div class="form-group col-md-12">
                                <label >Nhân viên </label>
                                <select name="" class="form-control staff-list morning-time2" >

                                </select>
                            </div>   
                            <h3>Ca Chiều</h3>
                            <div class="form-group col-md-12">
                                <label >Nhân viên </label>
                                <select name="" class="form-control staff-list afternoon-time1" >

                                </select>
                            </div>   
                            <div class="form-group col-md-12">
                                <label >Nhân viên </label>
                                <select name="" class="form-control staff-list afternoon-time2" >

                                </select>
                            </div>   
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <button type="" class="btn btn-success update-data" style="float: right;">Lưu lại</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection()


@section('sub_layout')

<div class="modal modal-right fade quick-view" id="create-modal-side">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header justify-content-between align-items-center">
                <h5 class="modal-title"></h5>
            </div>
            <div class="modal-body scrollable">

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default modal-action close-modal m-r-10"> </button>
                <button type="button" class="btn btn-primary modal-action push-modal" atr="Push"> </button>
            </div>
        </div>
    </div>            
</div>
<div class="modal modal-right fade quick-view" id="update-modal-side">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header justify-content-between align-items-center">
                <h5 class="modal-title"></h5>
            </div>
            <div class="modal-body scrollable">

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default modal-action close-modal m-r-10"> </button>
                <button type="button" class="btn btn-primary modal-action push-modal" atr="Push"> </button>
            </div>
        </div>
    </div>            
</div>
<div class="modal modal-right fade quick-view" id="delete-modal-side">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header justify-content-between align-items-center">
                <h5 class="modal-title"></h5>
            </div>
            <div class="modal-body scrollable">

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default modal-action close-modal m-r-10"> </button>
                <button type="button" class="btn btn-primary modal-action push-modal" atr="Push"> </button>
            </div>
        </div>
    </div>            
</div>

@endsection()

@section('js')
    
    <script src="{{ asset('manager/assets/js/myCalender.js') }}"></script>
    <script src="{{ asset('manager/assets/js/page/time.js') }}"></script>

@endsection()