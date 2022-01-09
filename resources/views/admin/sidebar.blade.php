<div class="side-nav">
    <div class="side-nav-inner">
        <ul class="side-nav-menu scrollable">
            <li class="nav-item dropdown statistic-group">
                <a class="dropdown-toggle statistic" href="{{ route('admin.statistic.index') }}">
                    <span class="icon-holder">
                        <i class="anticon anticon-dashboard"></i>
                    </span>
                    <span class="title">Thống kê</span>
                </a>
            </li>
            <li class="nav-item dropdown product-group">
                <a class="dropdown-toggle product" href="{{ route('admin.product.index') }}">
                    <span class="icon-holder">
                        <i class="anticon anticon-appstore"></i>
                    </span>
                    <span class="title">Sản phẩm</span>
                </a>
            </li>
            <li class="nav-item dropdown table-group">
                <a class="dropdown-toggle table-list" href="{{ route('admin.table.index') }}">
                    <span class="icon-holder">
                        <i class="anticon anticon-inbox"></i>
                    </span>
                    <span class="title">Chỗ ngồi</span>
                </a>
            </li>
            <li class="nav-item dropdown time-group">
                <a class="dropdown-toggle time" href="{{ route('admin.time.index') }}">
                    <span class="icon-holder">
                        <i class="anticon anticon-schedule"></i>
                    </span>
                    <span class="title">Ca làm việc</span>
                </a>
            </li>
            <li class="nav-item dropdown staff-group">
                <a class="dropdown-toggle staff" href="{{ route('admin.staff.index') }}">
                    <span class="icon-holder">
                        <i class="anticon anticon-team"></i>
                    </span>
                    <span class="title">Nhân viên</span>
                </a>
            </li>
            <li class="nav-item dropdown permission-group">
                <a class="dropdown-toggle permission" href="{{ route('admin.permission.index') }}">
                    <span class="icon-holder">
                        <i class="anticon anticon-setting"></i>
                    </span>
                    <span class="title">Phân quyền</span>
                </a>
            </li>
        </ul>
    </div>
</div>