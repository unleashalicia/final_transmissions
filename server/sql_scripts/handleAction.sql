

DELIMITER $$

DROP PROCEDURE IF EXISTS `handleUserAction` $$
CREATE PROCEDURE `handleUserAction` (
    IN `userId` INT,
    IN `user_action` VARCHAR(15)
  )  MODIFIES SQL DATA

  BEGIN
    SELECT sa.next_state_id FROM users AS u
      JOIN state_actions AS sa
      ON sa.state_id = u.state_id
      WHERE userId = u.ID AND user_action = sa.action
    ;
      SELECT * from users
    ;
  END
    $$

DELIMITER ;