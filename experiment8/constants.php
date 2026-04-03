<?php
// Exercise 3 - PHP Basics: Constants
define('SITE_NAME', "Krishu's Coddy Zone");
define('VERSION', '1.0.0-Beta');
define('MAX_ITEMS', 50);

echo "<h1>Site Info (Using Constants)</h1>";
echo "<p>Site Name: " . SITE_NAME . "</p>";
echo "<p>Version: " . VERSION . "</p>";
echo "<p>Max Items per Page: " . MAX_ITEMS . "</p>";

echo "<h2>Demonstrating String Quotes</h2>";
$language = 'PHP (Hypertext Preprocessor)';

echo '<p>Single Quoted: \'$language is great\' -> ' . '$language is great</p>';
echo "<p>Double Quoted: \"$language is great\" -> $language is great</p>";
?>
