
CREATE TABLE actor
    (act_id INT PRIMARY KEY, act_fname VARCHAR(20),
    act_lname VARCHAR(20), act_gender VARCHAR(1));
    
INSERT INTO actor(act_id,act_fname,act_lname,act_gender) VALUES
    (101,'James','Stewart','M'),
    (102,'Deborah','Kerr','F'),
    (107,'Nicole','Kidman','F'),
    (110,'Mark','Wahlberg','M'),
    (111,'Woody','Allen','M'),
    (113,'Tim','Robbins','M'),
    (114,'Kevin','Spacey','M'),
    (115,'Kate','Winslet','F'),
    (120,'Maggie','Gyllenhaal','F'),
    (121,'Dev','Patel','M'),
    (123,'David','AstON','M'),
    (124,'Ali','Astin','F');



CREATE TABLE movie
    (movie_id INT  PRIMARY KEY,mov_title VARCHAR(30),
    mov_year INT,mov_lang VARCHAR(20), mov_dt_rel DATE,
    mov_rel_country VARCHAR(5));

 act_id | act_fname | act_lname  | act_gender 
--------+-----------+------------+------------
    101 | James     | Stewart    | M
    102 | Deborah   | Kerr       | F
    107 | Nicole    | Kidman     | F
    110 | Mark      | Wahlberg   | M
    111 | Woody     | Allen      | M
    113 | Tim       | Robbins    | M
    114 | Kevin     | Spacey     | M
    115 | Kate      | Winslet    | F
    120 | Maggie    | Gyllenhaal | F
    121 | Dev       | Patel      | M
    123 | David     | AstON      | M
    124 | Ali       | Astin      | F

INSERT INTO movie(mov_id,mov_title,mov_year,mov_time,mov_lang,mov_dt_rel,mov_rel_country) VALUES                                              
    (901,'Vertigo',958 ,128,'English','1958-08-24','UK'),
    (902,'The Innocents',961 ,100,'English','1962-02-19','SW'),
    (907,'Eyes Wide Shut',99,159,'English',null,'UK'),
    (910,'Boogie Nights',1997,155,'English','1998-02-16','UK'),
    (911,'Annie Hall',1977, 93 ,'English','1977-04-20','USA'),
    (913,'The Shawshank RedemptiON',1994,142,'English','1995-02-17','UK'),
    (914,'American Beauty',1999,122,'English',null,'UK'),
    (915,'Titanic',1997,194,'English','1998-01-23','UK'),
    (920,'DONnie Darko',2001,113,'English',null,'UK'),
    (921,'Slumdog MilliONaire',2008,120,'English','2009-01-09','UK'),
    (926,'Seven Samurai',954,207,'Japanese','1954-04-26','JP'),
    (927,'Spirited Away',2001,125,'Japanese','2003-09-12','UK'),
    (928,'Back to the Future',1985,116,'English','1985-12-04','UK'),
    (925,'Braveheart',1995,178,'English','1995-09-08','UK');

 mov_id |        mov_title         | mov_year | mov_lang | mov_dt_rel | mov_rel_country | mov_time 
--------+--------------------------+----------+----------+------------+-----------------+----------
    901 | Vertigo                  |      958 | English  | 1958-08-24 | UK              |      128
    902 | The Innocents            |      961 | English  | 1962-02-19 | SW              |      100
    907 | Eyes Wide Shut           |       99 | English  |            | UK              |      159
    910 | Boogie Nights            |     1997 | English  | 1998-02-16 | UK              |      155
    911 | Annie Hall               |     1977 | English  | 1977-04-20 | USA             |       93
    913 | The Shawshank RedemptiON |     1994 | English  | 1995-02-17 | UK              |      142
    914 | American Beauty          |     1999 | English  |            | UK              |      122
    915 | Titanic                  |     1997 | English  | 1998-01-23 | UK              |      194
    920 | DONnie Darko             |     2001 | English  |            | UK              |      113
    921 | Slumdog MilliONaire      |     2008 | English  | 2009-01-09 | UK              |      120
    926 | Seven Samurai            |      954 | Japanese | 1954-04-26 | JP              |      207
    927 | Spirited Away            |     2001 | Japanese | 2003-09-12 | UK              |      125
    928 | Back to the Future       |     1985 | English  | 1985-12-04 | UK              |      116
    925 | Braveheart               |     1995 | English  | 1995-09-08 | UK              |      178




INSERT INTO movie_cast VALUES
    (102,902,'Miss Giddens'),
    (107,907,'Alice Harford'),
    (110,910,'Eddie Adams'),
    (111,911,'Alvy Singer'),
    (113,913,'Andy Dufresne'),
    (114,914,'Lester Burnham'),
    (115,915,'Rose DeWitt Bukater'),
    (120,920,'Elizabeth Darko'),
    (121,921,'Older Jamal'),
    (114,921,'Bobby Darin');

 act_id | mov_id |        role         
--------+--------+---------------------
    102 |    902 | Miss Giddens
    107 |    907 | Alice Harford
    110 |    910 | Eddie Adams
    111 |    911 | Alvy Singer
    113 |    913 | Andy Dufresne
    114 |    914 | Lester Burnham
    115 |    915 | Rose DeWitt Bukater
    120 |    920 | Elizabeth Darko
    121 |    921 | Older Jamal
    114 |    921 | Bobby Darin



CREATE TABLE rating
    (mov_id INT, rev_id INT, rev_stars FLOAT, 
    num_o_ratings INT, FOREIGN KEY(mov_id) REFERENCES movie(mov_id));

INSERT INTO rating VALUES
    (901 ,   9001 ,      8.40 ,        263575),
    (910 ,   9009 ,      3.00 ,        195961),
    (911 ,   9010 ,      8.10 ,        203875),
    (914 ,   9013 ,      7.00 ,        862618),
    (915 ,   9001 ,      7.70 ,        830095),
    (925 ,   9015,      7.70,         81328),
    (920,   9017 ,      8.10 ,        609451),
    (921 ,   9018 ,      8.00 ,        667758);

 mov_id | rev_id | rev_stars | num_o_ratings 
--------+--------+-----------+---------------
    901 |   9001 |       8.4 |        263575
    910 |   9009 |         3 |        195961
    911 |   9010 |       8.1 |        203875
    914 |   9013 |         7 |        862618
    915 |   9001 |       7.7 |        830095
    925 |   9015 |       7.7 |         81328
    920 |   9017 |       8.1 |        609451
    921 |   9018 |         8 |        667758

SELECT actor.act_id,actor.act_fname FROM actor 
    INNER JOIN movie_cast USING(act_id)
    INNER JOIN movie USING(mov_id)
    WHERE movie.mov_title = 'Slumdog Millionaire';

 act_id | act_fname 
--------+-----------
    121 | Dev
    114 | Kevin


SELECT movie.mov_title FROM movie 
INNER JOIN movie_cast USING(mov_id) 
INNER JOIN actor USING(act_id)
WHERE actor.act_fname = 'Tim' AND actor.act_lname = 'Robbins';

        mov_title         
--------------------------
 The Shawshank Redemption


