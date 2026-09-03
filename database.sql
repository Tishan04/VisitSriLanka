CREATE DATABASE IF NOT EXISTS visit_sri_lanka
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE visit_sri_lanka;

CREATE TABLE IF NOT EXISTS travel_plans (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(190) NOT NULL,
    phone VARCHAR(40) NULL,
    country VARCHAR(100) NULL,
    arrival_date DATE NOT NULL,
    departure_date DATE NOT NULL,
    number_of_days INT UNSIGNED NOT NULL,
    number_of_people INT UNSIGNED NOT NULL,
    selected_places JSON NOT NULL,
    notes TEXT NULL,
    estimated_cost DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_travel_plans_email (email),
    INDEX idx_travel_plans_created_at (created_at)
);
