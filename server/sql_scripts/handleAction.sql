

DELIMITER $$

DROP PROCEDURE IF EXISTS `handleUserAction` $$
CREATE PROCEDURE `handleUserAction` (
    IN `userId` INT,
    IN `user_action` VARCHAR(15)
  )  MODIFIES SQL DATA

  BEGIN
    SET @next_state = (
      SELECT sa.next_state_id FROM users AS u
        JOIN state_actions AS sa
        ON sa.state_id = u.state_id
        WHERE userId = u.ID AND user_action = sa.action)
      ;
      UPDATE users SET users.state_id = @next_state
      	WHERE users.ID = userId
      ;
   	  CALL getUserStateDetails(userId)
      ;
  END
    $$

DELIMITER ;