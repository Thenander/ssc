CREATE TABLE
  Track_Samples (
    track_id INT,
    sample_id INT,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    changed TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (track_id, sample_id),
    FOREIGN KEY (track_id) REFERENCES Tracks (id) ON DELETE CASCADE,
    FOREIGN KEY (sample_id) REFERENCES Samples (id) ON DELETE CASCADE
  );