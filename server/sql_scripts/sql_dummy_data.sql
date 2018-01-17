


INSERT INTO `audio` (`story_id`, `state_id`, `outer_audio_url`, `inner_audio_url`, `completed_audio_url`) VALUES
(1, 1, 'sounds/CH1-MUSIC.ogg', 'sounds/CH1-READING.ogg', './sounds/stuff3'),
(1, 2, './sounds/stuff', './sounds/stuff2', './sounds/stuff3'),
(1, 3, './sounds/stuff', './sounds/stuff2', './sounds/stuff3');


INSERT INTO `augmented_reality` (`story_id`, `state_id`, `marker`) VALUES
(1, 1, 'hiro'),
(1, 2, 'fire'),
(1, 3, 'water');


INSERT INTO `location` (`story_id`, `state_id`, `latitude`, `longitude`, `outer_threshold`, `inner_threshold`) VALUES
(1, 1, '33.6347489', '-117.7406006', 50, 8),
(1, 2, '33.6353568', '-117.7411797', 25, 4),
(1, 3, '33.6352599', '-117.7419794', 12, 2),
(1, 4, '33.6352078', '-117.7427459', 25, 8);


INSERT INTO `states` (`state_id`, `state_details`, `story_id`) VALUES
(1, 'Epilogue to our first story', 1),
(2, 'Our first chapter', 1),
(3, 'Our second chapter', 1);


INSERT INTO `state_actions` (`story_id`, `state_id`, `action`, `next_state_id`) VALUES
(1, 1, 'proceed', '2'),
(1, 2, 'proceed', '3'),
(1, 3, 'proceed', '1');


INSERT INTO `stories` (`name`, `story_img`, `status`) VALUES
('Prologue', 'images/library/story_img_1.jpg', 1),
('Story X', 'images/library/story_img_2.jpg', 0),
('Story Y', 'images/library/story_img_3.jpg', 0),
('Epilogue', 'images/library/story_img_4.jpg', 0);


INSERT INTO `story_details` (`story_id`, `start_lat`, `start_lon`, `description`, `est_time`, `start_address`) VALUES
(1, '33.6347489', '-117.7406006', 'This is our prologue story yeah woohoo sup the sky', '00:30:00', '9200 Irvine Center Dr, Irvine, CA 92618');



COMMIT;