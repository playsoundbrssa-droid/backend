require('dotenv').config({ path: '/Users/danilomedeiros/Documents/GitHub/IPTVExpert/backend/.env' });
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function main() {
    try {
        const res = await pool.query("SELECT id, name, email FROM users");
        console.log("Users in Postgres:");
        console.log(res.rows);
    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
    }
}

main();
