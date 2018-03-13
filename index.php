<?php
session_start();

if (isset($_SESSION['user'])) {
  header("Location: /home");
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title>Shift Tracker</title>

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSS - Bootstrap -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" media="screen" href="/assets/css/main.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="/assets/css/login.css" />
    <!-- JS - FontAwesome -->
    <script defer src="https://use.fontawesome.com/releases/v5.0.8/js/all.js"></script>
</head>
<body>

    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#">Shift Tracker</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="/staff" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Staff
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="/staff">View Staff</a>
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="/shift" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Shifts
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="/shift">View Actions</a>
                    <a class="dropdown-item" href="/shift/add-one-shift.php">Add a shift</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="/shift/add-unit-shift.php">Add unit</a>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#">admin</a>
                </li>
                </ul>
            </div>
        </nav>
    </div>

    <div class="container">
        <div class="alert alert-success" role="alert">
            <strong>Well done!</strong> You successfully read this important alert message.
        </div>
    </div>

    <div class="container">
        <form class="login">
            <div class="form-group">
                <label for="username">Log in:</label>
                <input type="text" class="form-control" id="username" aria-describedby="loginHelp" 
                    placeholder="username" required minlength="4" maxlength="20" pattern="\S{4,20}">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" placeholder="password" 
                    required  minlength="6" maxlength="20" pattern="\S{6,20}">
            </div>
            <button type="submit" class="btn btn-block btn-primary">Log in</button>
        </form>
    </div>
    
    <!-- JS Libs - jQuery, Popper, Bootstrap, Axios -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <!-- JS -->
    <script src="/assets/js/main.js"></script>
    <script src="/assets/js/login.js"></script>
</body>
</html>