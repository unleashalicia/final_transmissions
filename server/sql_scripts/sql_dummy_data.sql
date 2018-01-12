


INSERT INTO `audio` (`story_id`, `state_id`, `outer_audio_url`, `inner_audio_url`, `completed_audio_url`) VALUES
(1, 1, './sounds/stuff', './sounds/stuff2', './sounds/stuff3'),
(1, 2, './sounds/stuff', './sounds/stuff2', './sounds/stuff3'),
(1, 3, './sounds/stuff', './sounds/stuff2', './sounds/stuff3');


INSERT INTO `augmented_reality` (`story_id`, `state_id`, `marker`) VALUES
(1, 1, 'hiro'),
(1, 2, 'fire'),
(1, 3, 'water');


INSERT INTO `location` (`story_id`, `state_id`, `latitude`, `longitude`, `outer_threshold`, `inner_threshold`) VALUES
(1, 1, '33.6347489', '-117.7406006', 50, 8),
(1, 2, '33.6347489', '-117.7406006', 25, 4),
(1, 3, '33.6347489', '-117.7406006', 12, 2);


INSERT INTO `states` (`state_id`, `state_details`, `story_id`) VALUES
(1, 'Epilogue to our first story', 1),
(2, 'Our first chapter', 1),
(3, 'Our second chapter', 1);


INSERT INTO `state_actions` (`story_id`, `state_id`, `action`, `next_state_id`) VALUES
(1, 1, 'proceed', '2'),
(1, 2, 'proceed', '3'),
(1, 3, 'proceed', '1');


INSERT INTO `stories` (`name`, `story_id`, `story_img`, `status`) VALUES
('The Spaghetti Monster', 1, 'images/spaghetti.jpeg', 1);


INSERT INTO `users` (`id`, `email`, `password`, `user_name`) VALUES
(34, 'asdf@asdf.com', '$2a$10$3EErFVRAKiOZxgiUWBqiQO2GuOrq1Xe8.a.GB.ZftJxae/kU.nqY2', 'asdf'),
(35, 'prettypotato@taters.com', '$2a$10$KQCBPRzQUfGGYG335MQ44OwV8CDTJlp7HAZGTWP3qwUJlgPbk76CO', 'ceskamo');


INSERT INTO `user_stories` (`id`, `story_id`, `state_id`) VALUES
(34, 1, 2);





COMMIT;