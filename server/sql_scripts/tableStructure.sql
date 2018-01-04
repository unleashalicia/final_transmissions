SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*
I have no idea what the above four lines of code is doing
*/



DROP TABLE if EXISTS `states`;
CREATE TABLE `states` (
  `state_id` varchar(10) NOT NULL,
  `state_details` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE if EXISTS `state_actions`;
CREATE TABLE `state_actions` (
  `state_id` varchar(10) NOT NULL,
  `action` varchar(15) NOT NULL,
  `next_state_id` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE if EXISTS `users`;
CREATE TABLE `users` (
  `ID` mediumint(9) NOT NULL AUTO_INCREMENT,
  `state_id` varchar(10) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

COMMIT;