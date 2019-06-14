CREATE TABLE ActivitiesAttendance(
	idAttendant int auto_increment not null,
    eventRelated varchar(300),
    primary key(idAttendant)
);

CREATE TABLE Comentarios(
	idComentario int auto_increment not null,
    Usuario varchar(300),
    Comentario varchar(300),
    Imagen varchar(300),
    calificaion int,
    primary key(idComentario)
);

CREATE TABLE TiposHabitaciones(
	idTipo int auto_increment not null,
    Tipo varchar(300),
    primary key (idTipo)
);

INSERT INTO Tiposhabitaciones (Tipo) VALUES ('simple');
INSERT INTO Tiposhabitaciones (Tipo) VALUES ('media');
INSERT INTO Tiposhabitaciones (Tipo) VALUES ('deluxe');

CREATE TABLE habitaciones(
	idHabitacion int auto_increment not null,
    tipo int references TiposHabitaciones(idTipo),
    disponible bool default 1,
    primary key (idHabitacion)
);

INSERT INTO habitaciones (tipo) VALUES (1);
INSERT INTO habitaciones (tipo) VALUES (2);
INSERT INTO habitaciones (tipo) VALUES (3);

CREATE TABLE reservas(
	idReserva int auto_increment not null,
    fechaIn date,
    fechaOut date,
    email varchar(100),
    idHabitacion int references habitaciones(idHabitacion),
    primary key(idReserva)
);

DELIMITER //
DROP PROCEDURE IF EXISTS Reservar_SP //
CREATE PROCEDURE Reservar_SP(
    IN in_fechaIn date,
    IN in_fechaOut date,
    IN in_email varchar(100),
    IN in_tipo int
)
BEGIN
	SELECT COUNT(h.idHabitacion) INTO @available FROM habitaciones h 
    INNER JOIN reservas r ON r.idHabitacion = h.idHabitacion 
    WHERE h.tipo = in_tipo AND h.disponible = 1 AND 
    (in_fechaIn between r.fechaIn AND r.fechaOut);
	IF(@available < 1)
    THEN
        SELECT COUNT(h.idHabitacion) INTO @overlay FROM habitaciones h 
		INNER JOIN reservas r ON r.idHabitacion = h.idHabitacion 
		WHERE h.tipo = in_tipo AND h.disponible = 1 AND 
		(in_fechaOut > r.fechaIn);
        IF(@overlay < 1)
		THEN
			SELECT COUNT(h.idHabitacion) INTO @exception FROM habitaciones h 
			INNER JOIN reservas r ON r.idHabitacion = h.idHabitacion 
			WHERE h.tipo = in_tipo AND h.disponible = 1 AND 
			(in_fechaOut > r.fechaOut);
            IF(@exception < 1)
			THEN
				INSERT INTO reservas (fechaIn,fechaOut,email,idHabitacion) VALUES (in_fechaIn,in_fechaOut,in_email,in_tipo);
				SELECT 1 AS Completado, last_insert_id() AS idReserva;
            ELSE
				SELECT 0 AS Completado,'La fecha final se sobrepone a otra reserva, por favor modifique la fecha final' AS Mensaje;
            END IF;
		else
			SELECT 0 AS Completado,'La fecha final se sobrepone a otra reserva, por favor modifique la fecha final' AS Mensaje;
        END IF;
	ELSE
		SELECT 0 AS Completado,'No hay habitaciones disponible en esta fecha' AS Mensaje;
    END IF;
END; //
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS Delete_Reserva_SP //
CREATE PROCEDURE Delete_Reserva_SP(
    IN in_idReserva int
)
BEGIN
	DELETE FROM reservas WHERE idReserva = in_idReserva;
END; //
DELIMITER ;
