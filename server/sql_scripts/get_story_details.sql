DELIMITER $$


DROP PROCEDURE IF EXISTS `getStoryPageDetails`
    $$
CREATE PROCEDURE `getStoryPageDetails` (
    IN `storyId` TINYINT(3))  
    
    BEGIN
        SELECT sd.*, us.state_id, s.name, s.story_img FROM story_details AS sd
        JOIN stories AS s
        ON s.id = sd.story_id
        WHERE sd.story_id = storyId
        ;
        SELECT state_details AS chapter_name, state_id FROM states
        WHERE story_id = storyId
        ;  
    END
    $$

DELIMITER ;
