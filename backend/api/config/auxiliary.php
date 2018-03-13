<?php

function isDateFormatted($date) {
    return (preg_match('/^[12][0-9]{3}-[0-1][0-9]-[0-3][0-9]$/', $date) === 1);
}

function isThisIntegerlike($int) {
    return (filter_var($int, FILTER_VALIDATE_INT) !== false);
}