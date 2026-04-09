<?php
// config.example.php
// IMPORTANT: This is a TEMPLATE file showing the structure.
// To use this script, create a new file called "config.php" in the same directory.
// DO NOT push config.php to GitHub - use .gitignore to exclude it.

// For LOCAL DEVELOPMENT (XAMPP):
// $servername = "localhost";
// $username = "root";
// $password = "";
// $dbname = "experiment9_db";

// For LIVE SERVER (InfinityFree or similar shared hosting):
// Get these values from your Control Panel (cPanel) under "Create New MySQL Database"
// $servername = "sql123.epizy.com";  // Your host name from cPanel
// $username = "epiz_12345678";        // Your InfinityFree username
// $password = "your_db_password";     // Password you set for the database
// $dbname = "epiz_12345678_exp9";     // Database name you created

// Enable error reporting for mysqli
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    // Set charset to utf8mb4
    $conn->set_charset("utf8mb4");
} catch(Exception $e) {
    die("ERROR: Could not connect to database. " . $e->getMessage());
}
?>