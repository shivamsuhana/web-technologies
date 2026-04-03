<?php
// Exercise 3 - PHP Basics: Profile
$name = "Shiv";
$age = 22;
$city = "Bhopal";
$fav_lang = "PHP";

echo "<h1>My Profile</h1>";
echo "<p>Name: $name</p>";
echo "<p>Age: $age</p>";
echo "<p>City: $city</p>";
echo "<p>Favourite Language: $fav_lang</p>";

echo "<h2>Readable Debug Info (var_dump)</h2>";
echo '<pre>';
var_dump($name);
var_dump($age);
var_dump($city);
var_dump($fav_lang);
echo '</pre>';

echo "<h2>Personal Details (Associative Array)</h2>";
$details = [
    "Full Name" => $name,
    "Age" => $age,
    "Home City" => $city,
    "Coding Skill" => $fav_lang
];
echo '<pre>';
print_r($details);
echo '</pre>';
?>
