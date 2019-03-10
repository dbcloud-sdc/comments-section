CREATE DATABASE IF NOT EXISTS comments_section;

USE comments_section;

CREATE TABLE IF NOT EXISTS comments (
  id INT NOT NULL AUTO_INCREMENT,
  songId INT NOT NULL,
  songTime SMALLINT NOT NULL,
  followers INT,
  username VARCHAR(48) NOT NULL,
  postedAt INT,
  message VARCHAR(280),
  INDEX idx_songId (songID),
  PRIMARY KEY (id)
);
