CREATE TABLE
  Source_Samples (
    source_id INT,
    sample_id INT,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    changed TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (source_id, sample_id),
    FOREIGN KEY (source_id) REFERENCES Sources (id) ON DELETE CASCADE,
    FOREIGN KEY (sample_id) REFERENCES Samples (id) ON DELETE CASCADE
  );