DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS departments;

CREATE TABLE users
(
    id UUID PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    department_id UUID REFERENCES departments(id)
);

CREATE TABLE departments
(
    id UUID PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO users (id, name, department_id) VALUES ('${ids.moe}', 'moe', '${ids.hr}' );
INSERT INTO users (id, name) VALUES ('${ids.larry}', 'larry');
INSERT INTO users (id, name, department_id) VALUES ('${ids.curly}', 'curly', '${ids.hr}');
INSERT INTO users (id, name, department_id) VALUES ('${ids.lily}', 'lily', '${ids.marketing}');
INSERT INTO users (id, name, department_id) VALUES ('${ids.john}', 'john', '${ids.it}');
INSERT INTO users (id, name, department_id) VALUES ('${ids.bill}', 'bill', '${ids.sales}');




INSERT INTO departments(id, name)
VALUES('${ids.hr}', 'HR');
VALUES('${ids.sales}', 'Sales');
VALUES('${ids.marketing}', 'Marketing');
VALUES('${ids.it}', 'IT');
