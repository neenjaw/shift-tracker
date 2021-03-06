<?php require('../partials/01-prehead.php'); ?>
<?php require('../partials/02-head-prestyle.php'); ?>

<link rel="stylesheet" type="text/css" media="screen" href="/assets/css/home.css<?php echoGetQueryWithDate(); ?>" />
<link rel="stylesheet" type="text/css" media="screen" href="/assets/css/shifttable.css<?php echoGetQueryWithDate(); ?>" />

<?php require('../partials/03-head-poststyle.php'); ?>
<?php require('../partials/04-nav.php'); ?>
<?php require('../partials/05-flash.php'); ?>

<div class="title rounded-outline">
    <h1>Shift Tracker</h1>
    <p class="text-muted">A tool for tracking staff shift mix.</p>
</div>

<div class="shifts-display rounded-outline">
    <h4>Shifts for the last <span class="number-of-days">15</span> days:</h4>
    <div class="shift-container">
        
    </div>
</div>

<?php require('../partials/06-prescript.php'); ?>

<script src="/assets/js/main.js<?php echoGetQueryWithDate(); ?>"></script>
<script src="/assets/js/modal.js<?php echoGetQueryWithDate(); ?>"></script>
<script src="/assets/js/shift-entry-modal.js<?php echoGetQueryWithDate(); ?>"></script>
<script src="/assets/js/home.js<?php echoGetQueryWithDate(); ?>"></script>

<?php require('../partials/07-footer.php'); ?>