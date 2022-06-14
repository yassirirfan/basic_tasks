create table country(id int primary key,name varchar(20));
into country(id,name) values
    (101,'England'),
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
 101 | England
 102 | Argentina
 109 | Portugal
 124 | Germany
 135 | Spain
 136 | Italy
 149 | Egypt
 158 | Brazil
 202 | France


create table coach(
    id int primary key,
    name varchar(20),
    age int,
    country_id int,
    foreign key(country_id) references country(id)
);

insert into coach (id,name,age,country_id) values
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


create table club(
    id int primary key,
    name varchar(20),coach_id int,
    country_id int,
    foreign key(coach_id) references coach(id),
    foreign key(country_id) references country(id));

insert into club(id,name,coach_id,country_id) values
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



create table players(
    id int primary key, 
    name varchar(20), 
    age int,goals int, 
    club_id int, 
    country_id int, 
    foreign key(club_id) references club(id), 
    foreign key(country_id) references country(id));

insert into players(id,name,age,goals,club_id,country_id) values
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


select name from club where country_id = 101;

     name     
--------------
 Liverpool
 Tottenham
 Manchester U

select a.name from players a, coach b  where a.country_id = b.country_id;

 name  
-------
 Messi

 select distinct(players.name) from players,club  where players.country_id = club.country_id;

 name 
------
 Kane

select a.name from coach a, club b 
    where b.coach_id = a.id and a.country_id <> b.country_id 
    and a.age <59 order by age ;

    name    
------------
 Pochettino
 Conte
 Klopp


select a.name as Player,a.age,a.goals,
    b.name as Country, c.name as Club,d.name as Coach
    from players a,country b,club c,coach d  
    where a.country_id = b.id and a.club_id = c.id 
    and c.coach_id = d.id order by goals desc limit 5;

 player  | age | goals |  country  |     club     |   coach    
---------+-----+-------+-----------+--------------+------------
 Ronaldo |  37 |   801 | Portugal  | Manchester U | Rangnick
 Messi   |  34 |   761 | Argentina | PSG          | Pochettino
 Neymar  |  30 |   344 | Brazil    | PSG          | Pochettino
 Kane    |  28 |   241 | England   | Tottenham    | Conte
 Salah   |  29 |   223 | Egypt     | Liverpool    | Klopp





