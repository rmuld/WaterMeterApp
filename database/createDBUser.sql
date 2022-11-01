CREATE USER 'exampleuser'@'localhost';
GRANT SELECT, INSERT, CREATE, DELETE, UPDATE PRIVILEGES ON watermeter.* To 'exampleuser'@'localhost' IDENTIFIED BY 'password';