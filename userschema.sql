DROP DATABASE IF EXISTS trivioke;

CREATE DATABASE trivioke;

GRANT ALL ON *.* TO 'root'@'localhost' WITH GRANT OPTION;

USE trivioke;

CREATE TABLE users (
  googleId varchar(21) NOT NULL,
  username varchar(25) NOT NULL UNIQUE,
  score int(3) NULL,
  wins INT DEFAULT 0,
  losses INT DEFAULT 0,
  highScore INT DEFAULT 0,
  featuredSong varchar(30),
  PRIMARY KEY (googleId)
);

CREATE TABLE songs (
  id int NOT NULL AUTO_INCREMENT,
  song varchar(100) NOT NULL UNIQUE,
  uri varchar(100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE teams (
  id int NOT NULL AUTO_INCREMENT,
  teamName varchar(30) NOT NULL UNIQUE,
  wins INT DEFAULT 0,
  losses INT DEFAULT 0,
  draws INT DEFAULT 0,
  highScore INT DEFAULT 0,
  currentScore INT DEFAULT 0,
  userId varchar(21),
  FOREIGN KEY (userId)
    REFERENCES users(googleId),
  PRIMARY KEY (id)
)


/*  Execute this file from the command line by typing:
 *    mysql -u root < userschema.sql
 *  to create the database and the tables.*/