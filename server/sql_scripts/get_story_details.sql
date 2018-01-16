DELIMITER $$


DROP PROCEDURE IF EXISTS `getStoryPageDetails`
    $$
CREATE PROCEDURE `getStoryPageDetails` (
    IN `userId` SMALLINT(5), 
    IN `storyId` TINYINT(3))  
    
    BEGIN
        SELECT sd.*, us.state_id, s.name, s.story_img FROM story_details AS sd
        JOIN user_stories AS us
        ON us.story_id = sd.story_id
        JOIN stories AS s
        ON s.id = sd.story_id
        WHERE sd.story_id = storyId AND us.id = userId
        ;
        SELECT state_details AS chapter_name, state_id FROM states
        WHERE story_id = storyId
        ;  
    END
    $$

DELIMITER ;
