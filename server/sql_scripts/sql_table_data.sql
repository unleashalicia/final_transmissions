

INSERT INTO `audio` (`story_id`, `state_id`, `outer_audio_url`, `inner_audio_url`, `completed_audio_url`) VALUES
(1, 1, 'sounds/CH1-MUSIC.ogg', 'sounds/CH1-READING.ogg', './sounds/stuff3'),
(1, 2, 'sounds/CH2-MUSIC.ogg', 'sounds/CH2-READING.ogg', './sounds/stuff3'),
(1, 3, 'sounds/CH3-MUSIC.ogg', 'sounds/CH3-READING.ogg', './sounds/stuff3'),
(1, 4, 'sounds/CH4-MUSIC.ogg', 'sounds/CH4-READING.ogg', './sounds/stuff3'),
(1, 5, 'sounds/CH5-MUSIC.ogg', 'sounds/CH5-READING.ogg', 'sounds/CH5-AFTER.ogg');


INSERT INTO `augmented_reality` (`story_id`, `state_id`, `marker`) VALUES
(1, 1, 'hiro'),
(1, 2, 'fire'),
(1, 3, 'water');


INSERT INTO `location` (`story_id`, `state_id`, `latitude`, `longitude`, `outer_threshold`, `inner_threshold`) VALUES
(1, 1, '33.6347489', '-117.7406006', 100000, 100000),
(1, 2, '33.6353568', '-117.7411797', 100000, 100000),
(1, 3, '33.6352599', '-117.7419794', 100000, 100000),
(1, 4, '33.6352078', '-117.7427459', 100000, 100000),
(1, 5, '33.6349192', '-117.743631', 10000, 10000);


INSERT INTO `states` (`story_id`, `state_id`, `state_details`) VALUES
(1, 1, 'Chapter One'),
(1, 2, 'Chapter Two'),
(1, 3, 'Chapter Three'),
(1, 4, 'Chapter Four'),
(1, 5, 'Chapter Five');


DROP TABLE IF EXISTS `state_actions`;
CREATE TABLE `state_actions` (
  `story_id` smallint(5) NOT NULL,
  `state_id` smallint(3) NOT NULL,
  `action` varchar(15) NOT NULL,
  `next_state_id` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `state_actions` (`story_id`, `state_id`, `action`, `next_state_id`) VALUES
(1, 1, 'proceed', '2'),
(1, 2, 'proceed', '3'),
(1, 3, 'proceed', '4'),
(1, 4, 'proceed', '5');


INSERT INTO `stories` (`id`, `name`, `story_img`, `status`) VALUES
(1, 'Prologue', 'images/library/story_img_1.jpg', 1),
(2, 'Echoes from the Afterlife', 'images/library/story_img_2.jpg', 0),
(3, 'Lantern Light', 'images/library/story_img_3.jpg', 0),
(4, 'Epilogue', 'images/library/story_img_4.jpg', 0);


INSERT INTO `story_details` (`story_id`, `start_lat`, `start_lon`, `description`, `est_time`, `start_address`) VALUES
(1, '33.6347489', '-117.7406006', 'Where it all starts. Fire, strange voices, & transmissions from the other side.', '30 min.', '9200 Irvine Center Dr, Irvine, CA 92618');


COMMIT;