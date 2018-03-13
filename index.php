<?php
//skip require ../partials/01-prehead.php aince we need custom header
session_start();

if (isset($_SESSION['user'])) {
  header("Location: /home");
}
?>

<!DOCTYPE html>
<html>

<?php require('partials/02-head-prestyle.php'); ?>
    <link rel="stylesheet" type="text/css" media="screen" href="/assets/css/login.css" />
<?php require('partials/03-head-poststyle.php'); ?>
<?php require('partials/04-nav.php'); ?>
<?php require('partials/05-flash.php'); ?>

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
    
<?php require('partials/06-prescript.php'); ?>

    <script src="/assets/js/main.js"></script>
    <script src="/assets/js/login.js"></script>

<?php require('partials/07-footer.php'); ?>