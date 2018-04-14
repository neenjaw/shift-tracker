<?php require('../partials/01-prehead.php'); ?>
<?php require('../partials/02-head-prestyle.php'); ?>
    <link rel="stylesheet" type="text/css" media="screen" href="/assets/css/report.css<? echoGetQueryWithDate(); ?>" />
<?php require('../partials/03-head-poststyle.php'); ?>
<?php require('../partials/04-nav.php'); ?>
<?php require('../partials/05-flash.php'); ?>

<div class="title rounded-outline">
    <h2>Shift Reports</h2>
    <h4 class="text-muted">Pick a report to view:</h4>
</div>

<div class="button-container rounded-outline">
    <a href="/shift/assignment-report.php" class="btn btn-lg btn-primary">Make Assignment Report</a>
</div>

<?php require('../partials/06-prescript.php'); ?>
    <script src="/assets/js/main.js<? echoGetQueryWithDate(); ?>"></script>
<?php require('../partials/07-footer.php'); ?>
