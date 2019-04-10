/* 
	SOA
	Smart Swithches
    Teacher: Raul Arias
	Students: Rodolfo Solano and Adrian Sanchez
*/

/*Creation of Tables*/
CREATE TABLE Users(
	username varchar(20) not null,
    password varchar(20) not null,
    
    primary key(username)
);

CREATE TABLE Stats(
	idStat int auto_increment,
    currentStat int not null,
    dateStat datetime not null,
    userStat varchar(20) not null,
    
    primary key(idStat)
);

/*foreign keys*/
ALTER TABLE Stats
ADD CONSTRAINT FK_Stats_Users
FOREIGN KEY (userStat) REFERENCES Users(username);