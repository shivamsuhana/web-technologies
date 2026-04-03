<?php
// Exercise 3 - PHP Basics: Data Types
$str_var = "Hello Students";
$int_var = 123;
$float_var = 12.34;
$bool_var = true;
$null_var = null;
$array_var = ["PHP", "HTML", "CSS"];

echo "<h1>PHP Data Types & Verification</h1>";
echo '<pre>';
echo "Value: \"$str_var\" -> Type: " . gettype($str_var) . " (is_string: " . (is_string($str_var) ? 'Yes' : 'No') . ")\n";
echo "Value: $int_var -> Type: " . gettype($int_var) . " (is_int: " . (is_int($int_var) ? 'Yes' : 'No') . ")\n";
echo "Value: $float_var -> Type: " . gettype($float_var) . " (is_float: " . (is_float($float_var) ? 'Yes' : 'No') . ")\n";
echo "Value: " . ($bool_var ? 'true' : 'false') . " -> Type: " . gettype($bool_var) . " (is_bool: " . (is_bool($bool_var) ? 'Yes' : 'No') . ")\n";
echo "Value: NULL -> Type: " . gettype($null_var) . " (is_null: " . (is_null($null_var) ? 'Yes' : 'No') . ")\n";
echo "Value: Array -> Type: " . gettype($array_var) . " (is_array: " . (is_array($array_var) ? 'Yes' : 'No') . ")\n";
echo '</pre>';
?>
