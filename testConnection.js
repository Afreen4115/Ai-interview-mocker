const { Client } = require('pg');

const dbUrl = "postgresql://ai-interview-mocker_owner:VcU4fF5doDLm@ep-black-snowflake-a8voc66r.eastus2.azure.neon.tech/ai-interview-mocker?sslmode=require";

const client = new Client({
    connectionString: dbUrl,
});

client.connect()
    .then(() => {
        console.log("Connected to the PostgreSQL database");
        return client.end();
    })
    .catch(err => {
        console.error("Connection error:", err);
    });
