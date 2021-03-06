    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="/home">Shift Tracker</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="/">home</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="/staff" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        staff
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="/staff">view all staff</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="/staff/add-staff.php">add a staff</a>
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="/shift" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        shifts
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="/shift">shift reports</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="/shift/add-one-shift.php">add a shift</a>
                    <a class="dropdown-item" href="/shift/add-unit-shift.php">add unit shift</a>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/admin">admin</a>
                </li>
                <?php if (isset($_SESSION['user'])) { ?>
                <li class="nav-item">
                    <a class="nav-link" href="/api/user/logout.php">logout</a>
                </li>
                <?php } ?>
                </ul>
            </div>
        </nav>
    </div>