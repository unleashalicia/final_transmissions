SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*
I have no idea what the above four lines of code are doing
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


DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(50) UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `state_id` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

COMMIT;