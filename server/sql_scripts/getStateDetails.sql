DELIMITER $$

DROP PROCEDURE IF EXISTS `getUserStateDetails`
    $$
CREATE PROCEDURE `getUserStateDetails` (IN `userId` INT)  READS SQL DATA

    BEGIN
  SELECT s.state_details, a.outer_audio_url, a.inner_audio_url, 			 ar.marker,
       	 l.latitude, l.longitude, l.outer_threshold, l.inner_threshold,
         sa.action

    FROM users AS u

	JOIN states AS s
    ON  s.state_id = u.state_id
    JOIN audio AS a
    ON a.state_id = u.state_id
    JOIN location AS l
    ON l.state_id = u.state_id
    JOIN augmented_reality AS ar
    ON ar.state_id = u.state_id
    JOIN state_actions AS sa
    ON sa.state_id = u.state_id

    WHERE userId = u.id;

    END $$

DELIMITER ;