DROP PROCEDURE IF EXISTS getUserStateDetails;;
  CREATE PROCEDURE getUserStateDetails (IN UserID INT)

    BEGIN
		SELECT * FROM users
			WHERE
				UserID = ID
    END ;;