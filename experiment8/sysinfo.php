<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP System Information</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 40px; color: #333; }
        .container { max-width: 800px; margin: auto; background-color: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
        h1 { border-bottom: 2px solid #3498db; padding-bottom: 15px; color: #3498db; }
        .info-card { background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-top: 20px; }
        .info-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
        .info-item:last-child { border-bottom: none; }
        .label { font-weight: 600; color: #555; }
        #clock { font-weight: bold; color: #e74c3c; }
        .tech-list { list-style: none; padding: 0; margin-top: 20px; }
        .tech-list li { background-color: #e3f2fd; padding: 10px; border-radius: 4px; margin-bottom: 8px; color: #1976d2; }
    </style>
</head>
<body>
    <div class="container">
        <h1>PHP System & Server Info Challenge</h1>
        <div class="info-card">
            <div class="info-item">
                <span class="label">PHP Version:</span>
                <span><?php echo PHP_VERSION; ?></span>
            </div>
            <div class="info-item">
                <span class="label">Operating System:</span>
                <span><?php echo PHP_OS; ?></span>
            </div>
            <div class="info-item">
                <span class="label">Maximum Integer:</span>
                <span><?php echo PHP_INT_MAX; ?></span>
            </div>
            <div class="info-item">
                <span class="label">End of Line Character:</span>
                <span><?php echo 'PHP_EOL (' . json_encode(PHP_EOL) . ')'; ?></span>
            </div>
            <div class="info-item">
                <span class="label">Current Date:</span>
                <span><?php echo date('l, d F Y'); ?></span>
            </div>
            <div class="info-item">
                <span class="label">Current Server Time:</span>
                <span id="clock"><?php echo date('H:i:s'); ?></span>
            </div>
            <div class="info-item">
                <span class="label">Document Root:</span>
                <span><code><?php echo $_SERVER['DOCUMENT_ROOT']; ?></code></span>
            </div>
            <div class="info-item">
                <span class="label">Current Script Location:</span>
                <span><code><?php echo $_SERVER['SCRIPT_FILENAME']; ?></code></span>
            </div>
        </div>

        <h2>My Favourite Technologies</h2>
        <ul class="tech-list">
            <?php 
                $fav_techs = ["PHP - Backend Programming", "Next.js - Frontend Magic", "PostgreSQL - Database Mastery"];
                foreach ($fav_techs as $tech) { 
                    echo "<li>" . $tech . "</li>"; 
                } 
            ?>
        </ul>

        <p style="margin-top: 40px; font-size: 0.9em; color: #777;">
            <em>Note: This page refreshes each request — PHP re-runs every time.</em>
        </p>
    </div>
</body>
</html>
