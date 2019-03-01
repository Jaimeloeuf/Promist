'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	
*/

const mariadb = require('mariadb');

// Create the connection pool to the database
const pool = mariadb.createPool({
    host: 'mydb.com',
    user: 'myUser',
    password: 'myPassword',
    connectionLimit: 5
});


async function asyncFunction() {
    let conn;
    try {
        // Get a connection from the connection pool
        conn = await pool.getConnection();
        // Make a query with the connection and wait for the results
        const rows = await conn.query("SELECT 1 as val");
        console.log(rows); //[ {val: 1}, meta: ... ]
        const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
        console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
    } catch (err) {
        // Let any errors bubble up
        throw err;
    } finally {
        // If connection successfully taken from the pool, end the connection to free up the resource
        if (conn)
            return conn.end();
    }
}