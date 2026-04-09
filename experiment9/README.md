# Experiment 9: PHP Form with Database

This experiment converts Experiment 7's static form into a dynamic, database-driven PHP application.

## Setup Instructions

### Local Setup (XAMPP)

1. **Create Database**
   - Open phpMyAdmin (usually `http://localhost/phpmyadmin`)
   - Create a new database called `experiment9_db`
   - Select it and run the SQL query from `schema.sql` to create the table

2. **Configure Connection**
   - Copy `config.example.php` to `config.php`
   - Update credentials (for XAMPP, defaults work: `root` / no password / `experiment9_db`)

3. **Run Locally**
   - Make sure XAMPP Apache and MySQL are running
   - Access: `http://localhost/webtechnology/web-technologies/experiment9/index.php`
   - Submit the form to test - data should appear in the table below

### Live Server Setup (InfinityFree)

1. **Create Database in Control Panel**
   - Go to your InfinityFree cPanel
   - Find "MySQL Databases" or "Create New MySQL Database"
   - Create a database (you'll get a name like `epiz_12345678_exp9`)
   - Note your database host, username, and password

2. **Run Schema Query**
   - Open phpMyAdmin in your cPanel
   - Select your new database
   - Go to "SQL" tab and paste the contents of `schema.sql`
   - Click Execute

3. **Create config.php**
   - On the live server, use File Manager to navigate to `htdocs/experiment9/`
   - Create a new file called `config.php`
   - Copy contents from `config.example.php` but use your InfinityFree credentials from step 1
   - Save it

4. **Deploy**
   - Push your changes to GitHub (the `.gitignore` prevents `config.php` from being committed)
   - The GitHub Actions workflow will automatically deploy to your server
   - Access: `https://your-domain/experiment9/index.php`

## File Structure

- `index.php` — Main form page with PHP backend logic
- `config.php` — **DO NOT COMMIT** — Local database credentials
- `config.example.php` — Template showing structure (safe to commit)
- `schema.sql` — Database table creation script
- `style.css` — Styling from Experiment 7
- `script.js` — UI interactions (theme toggle, copy/download)

## Important Security Notes

- **NEVER** commit `config.php` to GitHub (it contains passwords!)
- Use `.gitignore` to automatically exclude sensitive files
- `config.example.php` is provided as a reference only
- For production, always use environment-specific credentials
