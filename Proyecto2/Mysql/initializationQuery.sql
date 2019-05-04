/*Create Schema SOA*/
CREATE SCHEMA `SOA`;

/*Set as default schema*/
USE SOA;

/*Table Creation*/
CREATE TABLE Users(
	idUser int not null auto_increment,
    username varchar(45) not null unique,
    pwd varchar(45) not null,
    primary key(idUser)
);

/*initial population*/
INSERT INTO Users (username,pwd) VALUES ('Fofo','123');
