CREATE TABLE room (
    roomID VARCHAR(300),
    roomName VARCHAR(100)
);

CREATE TABLE roomUser (
    roomID VARCHAR(300),
    username VARCHAR(50)
);

CREATE TABLE `message` (
    messageID VARCHAR(300),
    `message` VARCHAR(1000),
    sender VARCHAR(50)
);
