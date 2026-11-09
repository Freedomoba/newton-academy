<?php
$track = strtolower($_GET['track'] ?? 'de');
$name = urlencode($_GET['name'] ?? '');
$email = urlencode($_GET['email'] ?? '');
$phone = urlencode($_GET['phone'] ?? '');

$target = ($track === 'dm') ? 'curriculum-dm.php' : 'curriculum-de.php';
$target .= "?name=$name&email=$email&phone=$phone";

header("Location: $target");
exit;
