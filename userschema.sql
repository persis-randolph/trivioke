DROP DATABASE IF EXISTS trivioke;

CREATE DATABASE trivioke;

GRANT ALL ON *.* TO 'root'@'localhost' WITH GRANT OPTION;

USE trivioke;

CREATE TABLE users (
  googleId varchar(21) NOT NULL,
  username varchar(15) NOT NULL UNIQUE,
  score int(3) NULL,
  PRIMARY KEY (googleId)
);

CREATE TABLE songs (
  id int NOT NULL AUTO_INCREMENT,
  song varchar(100) NOT NULL UNIQUE,
  uri varchar(100) NOT NULL,
  PRIMARY KEY (id)
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < userschema.sql
 *  to create the database and the tables.*/