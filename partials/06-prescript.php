<?php include_once(dirname(__FILE__).'/../assets/lib/util.php'); ?>
        <div class="modal-container hidden"></div>
    </div>
    
    <!-- JS Libs - jQuery, Popper, Bootstrap, Axios, Moment, Handlebars Runtime -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.21.0/moment.min.js" integrity="sha256-9YAuB2VnFZNJ+lKfpaQ3dKQT9/C0j3VUla76hHbiVF8=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.11/handlebars.runtime.min.js" integrity="sha256-UoS1yAHj9HqfbFL+oYoF0gkPrJiMK9t4zeciRCafl8I=" crossorigin="anonymous"></script>

    <?php
        if (
            preg_match('~MSIE|Internet Explorer~i', $_SERVER['HTTP_USER_AGENT']) || 
            (strpos($_SERVER['HTTP_USER_AGENT'], 'Trident/7.0; rv:11.0') !== false)
        ) {
    ?>
    <script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script> 
    <?php    
        }
    ?>
        
    <!-- JS - Compiled HBS Template, Custom JS -->
    <script>
    <?php if (isset($_SESSION['user'])) { ?>
    var User = {
        name: '<?= $_SESSION['user']->login ?>',
        admin: <?= ($_SESSION['user']->admin) ? 'true' : 'false' ?>
    };
    <?php } else { ?>
    var User = null;
    <?php } ?>
    </script>

    <script src="/assets/templates/templates.js<?php echoGetQueryWithDate(); ?>"></script>
    <script src="/assets/js/helpers.js<?php echoGetQueryWithDate(); ?>"></script>