-- database setup for experiment 9

-- Create table for storing form data
CREATE TABLE IF NOT EXISTS form_data (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100) NOT NULL,
    skills VARCHAR(255) NOT NULL,
    theme VARCHAR(50) NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
