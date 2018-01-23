

DELIMITER $$

DROP PROCEDURE IF EXISTS `handleUserAction`
$$
CREATE PROCEDURE `handleUserAction` (IN `userId` INT, IN `storyId` INT, IN `userAction` VARCHAR(15))  MODIFIES SQL DATA
BEGIN
    SET @next_state = (
      SELECT sa.next_state_id FROM user_stories AS us
        JOIN state_actions AS sa
        ON sa.story_id = us.story_id
        WHERE us.id = userId AND sa.action = userAction AND us.state_id = sa.state_id)
      ;
      UPDATE user_stories AS us SET us.state_id = @next_state
      	WHERE us.id = userId AND us.story_id = storyId
      ;
   	  CALL getUserStateDetails(userId, storyId)
      ;
END$$

DELIMITER ;