<?php require('../partials/01-prehead.php'); ?>
<?php require('../partials/02-head-prestyle.php'); ?>
    <link rel="stylesheet" type="text/css" media="screen" href="/assets/css/add-unit-shift.css<?php echoGetQueryWithDate(); ?>" />
<?php require('../partials/03-head-poststyle.php'); ?>
<?php require('../partials/04-nav.php'); ?>
<?php require('../partials/05-flash.php'); ?>

<div class="title rounded-outline">
    <h2>Add day/night Shift</h2>
    <h4 class="text-muted">Add a shift for the entire shift</h4>
</div>

<div class="add-container rounded-outline">

</div>
    
<?php require('../partials/06-prescript.php'); ?>
    <script src="/assets/js/main.js<?php echoGetQueryWithDate(); ?>"></script>
    <script src="/assets/js/add-shift.js<?php echoGetQueryWithDate(); ?>"></script>
    <script src="/assets/js/add-unit-shift.js<?php echoGetQueryWithDate(); ?>"></script>
<?php require('../partials/07-footer.php'); ?>
