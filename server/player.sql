CREATE DATABASE playerchatapp;
CREATE DATABASE playerusers;
use playerusers;

CREATE TABLE `artistusers` (
 `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
 `artistName` varchar(30) NOT NULL,
 `followers` varchar(20) NOT NULL,
 `views` int(20) NOT NULL,
 `profileImage` varchar(30) NOT NULL,
 `notification` varchar(30) NOT NULL,
 `messagesList` varchar(30) NOT NULL,
 `email` varchar(30) NOT NULL,
 `password` varchar(30) NOT NULL,
 `fevorites` varchar(50) NOT NULL,
 `songs` varchar(20) NOT NULL,
 `BIO` varchar(1000) NOT NULL,
 `aboutMe` varchar(5000) NOT NULL,
 `following` varchar(20) NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

CREATE TABLE `myclients` (
 `id` int(30) unsigned NOT NULL AUTO_INCREMENT,
 `name` varchar(100) NOT NULL,
 `message` varchar(100) NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `normalusers` (
 `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
 `name` varchar(30) NOT NULL,
 `email` varchar(30) NOT NULL,
 `profileImage` varchar(30) NOT NULL,
 `notification` varchar(30) NOT NULL,
 `messagesList` varchar(30) NOT NULL,
 `password` varchar(30) NOT NULL,
 `fevorites` varchar(50) NOT NULL,
 `following` varchar(20) NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;