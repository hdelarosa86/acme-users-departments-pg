const pg = require('pg');
const uuid = require('uuid');
const { Client } = pg;
const client = new Client('postgres://localhost/the_acme_db');
client.connect();

const generateIds = (...names) => {
  return names.reduce((acc, name) => {
    acc[name] = uuid.v4();
    return acc;
  }, {});
};

const ids = generateIds('moe','larry','curly','lily','john','bill','hr','sales','marketing','it');
const SQL = `
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments(id UUID PRIMARY KEY, name VARCHAR(255) UNIQUE NOT NULL);

CREATE TABLE users(id UUID PRIMARY KEY,name VARCHAR(255) UNIQUE NOT NULL, department_id UUID REFERENCES departments(id));

INSERT INTO departments(id, name) VALUES('${ids.hr}', 'HR');
INSERT INTO departments(id, name) VALUES('${ids.sales}', 'Sales');
INSERT INTO departments(id, name) VALUES('${ids.marketing}', 'Marketing');
INSERT INTO departments(id, name) VALUES('${ids.it}', 'IT');

INSERT INTO users (id, name, department_id) VALUES ('${ids.moe}', 'moe', '${ids.hr}' );
INSERT INTO users (id, name) VALUES ('${ids.larry}', 'larry');
INSERT INTO users (id, name, department_id) VALUES ('${ids.curly}', 'curly', '${ids.hr}');
INSERT INTO users (id, name, department_id) VALUES ('${ids.lily}', 'lily', '${ids.marketing}');
INSERT INTO users (id, name, department_id) VALUES ('${ids.john}', 'john', '${ids.it}');
INSERT INTO users (id, name, department_id) VALUES ('${ids.bill}', 'bill', '${ids.sales}');
`;

const sync = async () => {
  try {
    await client.query(SQL);
    console.log('Success');
  } catch (ex) {
    console.log(ex);
  }
};

const getAllDepartments = async () => {
  try {
    const response = await client.query('SELECT * FROM departments');
    return response.rows;
  } catch (ex) {
    console.log(ex);
  }
};
const getAllUsers = async () => {
  try {
    const response = await client.query('SELECT * FROM users');
    return response.rows;
  } catch (ex) {
    console.log(ex);
  }
};
module.exports = {
  sync,
  getAllDepartments,
  getAllUsers
};
