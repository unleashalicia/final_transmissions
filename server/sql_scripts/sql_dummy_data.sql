INSERT INTO `audio` (`state_id`, `outer_audio_url`, `inner_audio_url`) VALUES
(10, './sounds/stuff', './sounds/stuff2'),
(11, './sounds/stuff', './sounds/stuff2'),
(12, './sounds/stuff', './sounds/stuff2');

INSERT INTO `augmented_reality` (`state_id`, `marker`) VALUES
(10, 'hiro'),
(11, 'fire'),
(12, 'water');

INSERT INTO `location` (`state_id`, `latitude`, `longitude`, `outer_threshold`, `inner_threshold`) VALUES
(10, '33.6347489', '-117.7406006', 50, 8),
(11, '33.6347489', '-117.7406006', 25, 4),
(12, '33.6347489', '-117.7406006', 12, 2);

INSERT INTO `states` (`state_id`, `state_details`, `story`, `chapter`) VALUES
(10, 'Epilogue to our first story', 1, 0),
(11, 'Our first chapter', 1, 1),
(12, 'Our second chapter', 1, 2);


INSERT INTO `state_actions` (`state_id`, `action`, `next_state_id`) VALUES
(10, 'proceed', '11'),
(11, 'proceed', '12'),
(12, 'proceed', '10');

COMMIT;