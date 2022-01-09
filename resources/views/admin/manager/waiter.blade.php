<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Admin - Đặt bàn</title>

    <!-- Favicon -->
    <link rel="shortcut icon" href="">

    <!-- page css -->
    <link href="{{ asset('manager/assets/vendors/datatables/dataTables.bootstrap.min.css') }}" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css" rel="stylesheet">
    @yield('css')

    <!-- Core css -->
    <link href="{{ asset('manager/assets/css/app.min.css') }}" rel="stylesheet">
    <link href="{{ asset('manager/assets/css/custom.css') }}" rel="stylesheet">
    <link href="{{ asset('manager/assets/css/myCalendar.css') }}" rel="stylesheet">
    <meta name="csrf-token" content="{{ csrf_token() }}" />

</head>

<body>
    <input type="hidden" class="manager_id" value="{{ \Request::cookie('_token__') }}">
    <div class="app">
        <div class="layout">
            <div class="header">
                <div class="logo logo-dark">
                    <a href="/" class="logo-title">
                        <span class="logo-full">Cafe</span>
                        <span class="logo-part">C</span>
                    </a>
                </div>
                <div class="nav-wrap">
                    <ul class="nav-left"> </ul>
                    <ul class="nav-right">
                        <li class="dropdown dropdown-animated scale-left">
                            <div class="pointer" data-toggle="dropdown">
                                <div class="avatar avatar-image  m-h-10 m-r-15">
                                    <img src="manager/assets/images/avatars/thumb-3.jpg"  alt="">
                                </div>
                            </div>
                            <div class="p-b-15 p-t-20 dropdown-menu pop-profile">
                                <div class="p-h-20 p-b-15 m-b-10 border-bottom">
                                    <div class="d-flex m-r-50">
                                        <div class="avatar avatar-lg avatar-image">
                                            <img src="manager/assets/images/avatars/thumb-3.jpg" alt="">
                                        </div>
                                        <div class="m-l-10">
                                            <p class="m-b-0 text-dark font-weight-semibold">Admin</p>
                                            <p class="m-b-0 opacity-07">@super-admin</p>
                                        </div>
                                    </div>
                                </div>
                                <a href="javascript:void(0);" class="dropdown-item d-block p-h-15 p-v-10">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div>
                                            <i class="anticon opacity-04 font-size-16 anticon-lock"></i>
                                            <span class="m-l-10">Cài đặt tài khoản</span>
                                        </div>
                                        <i class="anticon font-size-10 anticon-right"></i>
                                    </div>
                                </a>
                                <a href="javascript:void(0);"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();" class="dropdown-item d-block p-h-15 p-v-10">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div>
                                            <i class="anticon opacity-04 font-size-16 anticon-logout"></i>
                                            <span class="m-l-10">Đăng xuất</span>
                                        </div>
                                        <i class="anticon font-size-10 anticon-right"></i>
                                    </div>
                                </a>
                                <form id="logout-form" action="{{ route('admin.logout') }}" method="POST" class="d-none">
                                    @csrf
                                </form>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>    
            <div class="container">
                <div class="card m-t-80">
                    <div class="card-body">
                        <div class="row table-list">

                        </div>
                    </div>
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

    
    <!-- Core Vendors JS -->
    <script src="{{ asset('manager/assets/js/vendors.min.js') }}"></script>

    <!-- page js -->
    <script src="{{ asset('manager/assets/js/api.js') }}"></script>

    <script src="{{ asset('manager/assets/js/lazy-load/jquery.lazy.min.js') }}"></script>
    <script src="{{ asset('manager/assets/js/lazy-load/jquery.lazy.plugins.min.js') }}"></script>

    <script src="{{ asset('manager/assets/js/summernote/summernote-lite.min.js') }}"></script>

    <script src="{{ asset('manager/assets/vendors/datatables/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('manager/assets/vendors/datatables/dataTables.bootstrap.min.js') }}"></script>
    <script src="{{ asset('manager/assets/js/pages/datatables.js') }}"></script>

    {{-- Custom library js --}}
    <script src="{{ asset('manager/assets/js/layout.js') }}"></script>
    {{-- Modal Template JS --}}
    <script src="{{ asset('manager/assets/js/template.js') }}"></script>

    <!-- page js -->
    <script src="{{ asset('manager/assets/js/window.js') }}"></script>
    <script src="{{ asset('manager/assets/js/page/table.js') }}"></script>

    <!-- Core JS -->
    <script src="{{ asset('manager/assets/js/app.min.js') }}"></script>

</body>

</html>