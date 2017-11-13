CREATE TABLE IF NOT EXISTS bugs (
    id INT UNSIGNED AUTO_INCREMENT,
    reporter VARCHAR(40) NOT NULL,
    description TEXT NOT NULL,
    affects_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status ENUM('OPEN','CLOSED','HOLD','RESOLVED') NOT NULL DEFAULT 'OPEN',
    PRIMARY KEY(id)
    ) CHARSET=utf8;

-- ALTER TABLE bugs CHANGE affects_date affects_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;