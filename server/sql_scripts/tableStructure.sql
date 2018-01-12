SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


DROP TABLE if EXISTS `states`;
CREATE TABLE `states` (
  `story_id` SMALLINT(3) NOT NULL,
  `state_id` SMALLINT(3) NOT NULL,
  `state_details` VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE if EXISTS `state_actions`;
CREATE TABLE `state_actions` (
  `story_id` smallint(5) NOT NULL,
  `state_id` smallint(3) NOT NULL,
  `action` varchar(15) NOT NULL,
  `next_state_id` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(50) UNSIGNED NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `location`;
CREATE TABLE `location` (
  `story_id` smallint(5) NOT NULL,
  `state_id` smallint(3) NOT NULL,
  `latitude` varchar(30) NOT NULL,
  `longitude` varchar(30) NOT NULL,
  `outer_threshold` smallint(3) NOT NULL,
  `inner_threshold` smallint(3) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `audio`;
CREATE TABLE `audio` (
  `story_id` smallint(5) NOT NULL,
  `state_id` smallint(3) NOT NULL,
  `outer_audio_url` varchar(30) NOT NULL,
  `inner_audio_url` varchar(30) NOT NULL,
  `completed_audio_url` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `augmented_reality`;
CREATE TABLE `augmented_reality` (
  `story_id` smallint(5) NOT NULL,
  `state_id` smallint(3) NOT NULL,
  `marker` varchar(20) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `stories`;
CREATE TABLE `stories` (
  `name` varchar(50) NOT NULL,
  `story_id` smallint(5) NOT NULL,
  `story_img` varchar(50) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




DROP TABLE IF EXISTS `story_details`;
CREATE TABLE `story_details` (
  `story_id` smallint(5) NOT NULL,
  `start_lat` varchar(30) NOT NULL,
  `start_lon` varchar(30) NOT NULL,
  `description` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `user_stories`;
CREATE TABLE `user_stories` (
  `id` smallint(5) NOT NULL,
  `story_id` smallint(5) NOT NULL,
  `state_id` smallint(5) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;