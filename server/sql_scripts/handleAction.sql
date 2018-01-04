

DELIMITER $$

DROP PROCEDURE IF EXISTS `handleUserAction` $$
CREATE PROCEDURE `handleUserAction` (
    BEGIN
    IN `userId` INT,
    IN `user_action` VARCHAR(15)
    )  NO SQL


  SELECT sa.next_state_id FROM states AS s
	JOIN users AS u
    ON u.state_id = s.state_id
  JOIN state_actions AS sa
    ON sa.state_id = s.state_id
    WHERE userId = u.ID AND user_action = sa.action

    END $$