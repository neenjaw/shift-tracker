<?php
//skip require ../partials/01-prehead.php aince we need custom header
session_start();

include_once('assets/lib/flash.php');
$flash = new Flash(session_status());

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
                    required  minlength="8" maxlength="16" pattern="\S{8,16}">
            </div>
            <button type="submit" class="btn btn-block btn-primary">Log in</button>
        </form>
    
<?php require('partials/06-prescript.php'); ?>

    <script src="/assets/js/main.js<?php echoGetQueryWithDate(); ?>"></script>
    <script src="/assets/js/login.js<?php echoGetQueryWithDate(); ?>"></script>

<?php require('partials/07-footer.php'); ?>