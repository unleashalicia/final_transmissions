DELIMITER $$

DROP PROCEDURE IF EXISTS `getUserStateDetails`
    $$
CREATE PROCEDURE `getUserStateDetails` (IN `userId` INT)  NO SQL
SELECT s.state_details FROM users AS u
	JOIN states AS s
    ON u.state_id = s.state_id
    WHERE userId = u.ID
    $$