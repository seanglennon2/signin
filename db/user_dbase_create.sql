PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
drop table if exists users;
COMMIT;
PRAGMA foreigh_keys=ON;
BEGIN TRANSACTION;
CREATE TABLE users(
	id integer primary key autoincrement,
	email varchar(10),
	password varchar(20));
