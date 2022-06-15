
CREATE TABLE country(id INT PRIMARY KEY,name VARCHAR(20));
INTO country(id,name) VALUES
    (101,'EnglAND'),
    (102,'Argentina'),
    (109,'Portugal'),
    (124,'Germany'),
    (135,'Spain'),
    (136,'Italy'),
    (149,'Egypt'),
    (158,'Brazil'),
    (202,'France');

 id  |   name    
-----+-----------
 101 | EnglAND
 102 | Argentina
 109 | Portugal
 124 | Germany
 135 | Spain
 136 | Italy
 149 | Egypt
 158 | Brazil
 202 | France


CREATE TABLE coach(
    id INT PRIMARY KEY,
    name VARCHAR(20),
    age INT,
    country_id INT,
    FOREIGN KEY(country_id) REFERENCES country(id)
);

INSERT INTO coach (id,name,age,country_id) VALUES
    (2349,'Pochettino',50,102),
    (2648,'Allegri',54,136),
    (3414,'Conte',52,136),
    (4821,'Rangnick',63,124),
    (5975,'Xavi',42,135),
    (7456,'Klopp',54,124);

  id  |    name    | age | country_id 
------+------------+-----+------------
 2349 | Pochettino |  50 |        102
 2648 | Allegri    |  54 |        136
 3414 | Conte      |  52 |        136
 4821 | Rangnick   |  63 |        124
 5975 | Xavi       |  42 |        135
 7456 | Klopp      |  54 |        124


CREATE TABLE club(
    id INT PRIMARY KEY,
    name VARCHAR(20),coach_id INT,
    country_id INT,
    FOREIGN KEY(coach_id) REFERENCES coach(id),
    FOREIGN KEY(country_id) REFERENCES country(id));

INSERT INTO club(id,name,coach_id,country_id) VALUES
    (635,'Liverpool',7456,101),
    (723,'Juventus',2648,136),
    (893,'Barcelona',5975,135),
    (8997,'Manchester U',4821,101),
    (901,'PSG',2349,202),
    (975,'Tottenham',3414,101);

  id  |     name     | coach_id | country_id 
------+--------------+----------+------------
  635 | Liverpool    |     7456 |        101
  723 | Juventus     |     2648 |        136
  893 | Barcelona    |     5975 |        135
  897 | Manchester U |     4821 |        101
  901 | PSG          |     2349 |        202
  975 | Tottenham    |     3414 |        101



CREATE TABLE players(
    id INT PRIMARY KEY, 
    name VARCHAR(20), 
    age INT,goals INT, 
    club_id INT, 
    country_id INT, 
    FOREIGN KEY(club_id) REFERENCES club(id), 
    FOREIGN KEY(country_id) REFERENCES country(id));

INSERT INTO players(id,name,age,goals,club_id,country_id) VALUES
    (1,'Messi',34,761,901,102),
    (2,'Ronaldo',37,801,897,109),
    (3,'Neymar',30,344,901,158),
    (4,'Salah',29,223,635,149),
    (5,'Kane',28,241,975,101);

 id |  name   | age | goals | club_id | country_id 
----+---------+-----+-------+---------+------------
  1 | Messi   |  34 |   761 |     901 |        102
  2 | Ronaldo |  37 |   801 |     897 |        109
  3 | Neymar  |  30 |   344 |     901 |        158
  4 | Salah   |  29 |   223 |     635 |        149
  5 | Kane    |  28 |   241 |     975 |        101


SELECT name FROM club WHERE country_id = 101;

     name     
--------------
 Liverpool
 Tottenham
 Manchester U

SELECT a.name FROM players a, coach b  WHERE a.country_id = b.country_id;

 name  
-------
 Messi

 SELECT DISTINCT(players.name) FROM players,club  WHERE players.country_id = club.country_id;

 name 
------
 Kane

SELECT a.name FROM coach a, club b 
    WHERE b.coach_id = a.id AND a.country_id <> b.country_id 
    AND a.age <59 ORDER BY age ;

    name    
------------
 Pochettino
 Conte
 Klopp


SELECT a.name as Player,a.age,a.goals,
    b.name as Country, c.name as Club,d.name as Coach
    FROM players a,country b,club c,coach d  
    WHERE a.country_id = b.id AND a.club_id = c.id 
    AND c.coach_id = d.id ORDER BY goals DESC LIMIT 5;

 player  | age | goals |  country  |     club     |   coach    
---------+-----+-------+-----------+--------------+------------
 Ronaldo |  37 |   801 | Portugal  | Manchester U | Rangnick
 Messi   |  34 |   761 | Argentina | PSG          | Pochettino
 Neymar  |  30 |   344 | Brazil    | PSG          | Pochettino
 Kane    |  28 |   241 | EnglAND   | Tottenham    | Conte
 Salah   |  29 |   223 | Egypt     | Liverpool    | Klopp





