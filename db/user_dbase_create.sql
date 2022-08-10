PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
drop table if exists user;
COMMIT;
PRAGMA foreigh_keys=ON;
BEGIN TRANSACTION;
CREATE TABLE user(
	id integer primary key autoincrement,
	email varchar(10),
	password varchar(20));
COMMIT;
