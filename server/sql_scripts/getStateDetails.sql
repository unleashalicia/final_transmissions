DELIMITER $$

DROP PROCEDURE IF EXISTS `getUserStateDetails`
    $$
CREATE PROCEDURE `getUserStateDetails` (
    IN `userId` INT,
    IN `storyId` INT
  )  READS SQL DATA

    BEGIN
  SELECT a.outer_audio_url, a.inner_audio_url, 			 ar.marker,
       	 l.latitude, l.longitude, l.outer_threshold, l.inner_threshold,
         sa.action

    FROM user_stories AS us

    JOIN audio AS a
    ON a.state_id = us.state_id
    JOIN location AS l
    ON l.state_id = us.state_id
    JOIN augmented_reality AS ar
    ON ar.state_id = us.state_id
    JOIN state_actions AS sa
    ON sa.state_id = us.state_id

    WHERE us.id = userId AND us.story_id = storyId;

    END $$

DELIMITER ;