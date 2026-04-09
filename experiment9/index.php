<?php
// Include the database config
require_once "config.php";

// Set default theme
$current_theme = 'light';

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect POST values
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $role = isset($_POST['role']) ? trim($_POST['role']) : '';
    // Skills comes as an array because of name="skills[]"
    $skills = isset($_POST['skills']) ? implode(', ', $_POST['skills']) : 'None';
    $theme = isset($_POST['theme']) ? trim($_POST['theme']) : 'light';

    $current_theme = $theme; // Remember for UI

    if (!empty($name) && !empty($role)) {
        // Prepare statement to avoid SQL injection
        $stmt = $conn->prepare("INSERT INTO form_data (name, role, skills, theme) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $name, $role, $skills, $theme);

        if ($stmt->execute()) {
            // Success! To prevent form resubmission on page reload, we can redirect or just let it flow.
            // A redirect is cleaner:
            // header("Location: index.php?success=1&theme=" . htmlspecialchars($theme));
            // exit();
        } else {
            $error = "Oops! Something went wrong inserting data.";
        }
        $stmt->close();
    } else {
        $error = "Name and Role fields are required.";
    }
} else if (isset($_GET['theme'])) {
    $current_theme = htmlspecialchars($_GET['theme']);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PHP Database Form & Data Table (Experiment 9)</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body class="<?php echo htmlspecialchars($current_theme); ?>">
  <div class="glass-container">
    <header>
      <h1>Data Collector Pro (PHP)</h1>
      <p>Submit your details below and manage your records stored in the database.</p>
      <?php if(isset($error)): ?>
          <p style="color: #ef4444; font-weight: bold;"><?php echo $error; ?></p>
      <?php endif; ?>
    </header>

    <div class="layout">
      <!-- Form Section -->
      <section class="form-section">
        <form id="myForm" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="POST">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input type="text" id="name" name="name" required placeholder="Enter your name.">
          </div>

          <div class="form-group">
            <label>Role</label>
            <div class="radio-group">
              <label class="custom-radio">
                <input type="radio" name="role" value="Developer" required>
                <span>Developer</span>
              </label>
              <label class="custom-radio">
                <input type="radio" name="role" value="Designer">
                <span>Designer</span>
              </label>
            </div>
          </div>

          <div class="form-group">
            <label>Skills</label>
            <div class="checkbox-group">
              <!-- Notice the brackets '[]' in name="skills[]" needed by PHP to parse checkboxes into array -->
              <label class="custom-checkbox">
                <input type="checkbox" name="skills[]" value="HTML">
                <span>HTML</span>
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" name="skills[]" value="CSS">
                <span>CSS</span>
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" name="skills[]" value="JS">
                <span>JavaScript</span>
              </label>
            </div>
          </div>

          <div class="form-group">
            <label for="theme">UI Theme</label>
            <select name="theme" id="theme">
              <option value="light" <?php if($current_theme=='light') echo 'selected'; ?>>Light Mode</option>
              <option value="dark" <?php if($current_theme=='dark') echo 'selected'; ?>>Dark Mode</option>
            </select>
          </div>

          <button type="submit" class="submit-btn">
            <span>Submit Data</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </form>
      </section>

      <!-- Table Section -->
      <section class="data-section">
        <div class="table-actions">
          <h2>Recorded Data</h2>
          <div class="action-buttons">
            <!-- Buttons preserved for JS UI -->
            <button type="button" id="copy-btn" class="icon-btn" title="Copy to Clipboard">
              📋 Copy
            </button>
            <button type="button" id="download-btn" class="icon-btn" title="Download CSV">
              💾 CSV
            </button>
          </div>
        </div>
        
        <div class="table-wrapper">
          <table id="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Skills</th>
                <th>Theme</th>
                <th>Time & Date</th>
              </tr>
            </thead>
            <tbody>
              <?php
              // Fetch data from database
              $sql = "SELECT * FROM form_data ORDER BY submitted_at DESC";
              $result = $conn->query($sql);

              if ($result && $result->num_rows > 0) {
                  // Output data of each row
                  while($row = $result->fetch_assoc()) {
                      // Formatting the timestamp to be readable
                      $time_formatted = date("h:i A j/n/y", strtotime($row["submitted_at"]));
                      
                      echo "<tr>";
                      echo "<td>" . htmlspecialchars($row['id']) . "</td>";
                      echo "<td>" . htmlspecialchars($row['name']) . "</td>";
                      echo "<td>" . htmlspecialchars($row['role']) . "</td>";
                      echo "<td>" . htmlspecialchars($row['skills']) . "</td>";
                      echo "<td>" . htmlspecialchars($row['theme']) . "</td>";
                      echo "<td>" . $time_formatted . "</td>";
                      echo "</tr>";
                  }
              } else {
                  echo "<tr class='empty-row'><td colspan='6' id='empty-state' style='text-align: center;'>No records found in database</td></tr>";
              }
              $conn->close();
              ?>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>