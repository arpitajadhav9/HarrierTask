import fs from "fs";
import pkg from "pg";
const { Client } = pkg;

const client = new Client({
    host: "rds",          // Change to your actual RDS endpoint
    user: "",             // Your PostgreSQL username
    password: "",         // Your PostgreSQL password
    database: "DBNAME",   // Your database name

});

async function insertData() {
    try {
        await client.connect();
        console.log(" Connected to PostgreSQL.");

        let json;
        try {
            const rawData = fs.readFileSync("./export.json", "utf8");
            json = JSON.parse(rawData);
            console.log(` Loaded ${json.length} records from export.json.`);
        } catch (fileError) {
            console.error(" Error reading or parsing export.json:", fileError);
            return;
        }

        for (const [index, row] of json.entries()) {
            const keys = Object.keys(row);
            const values = Object.values(row);
            const placeholders = keys.map((_, i) => `$${i + 1}`).join(",");

            try {
                await client.query(
                    `INSERT INTO your_table (${keys.join(",")}) VALUES (${placeholders})`,
                    values
                );
                console.log(` Inserted row ${index + 1}/${json.length}`);
            } catch (queryError) {
                console.error(` Error inserting row ${index + 1}:`, queryError);
            }
        }

    } catch (connectionError) {
        console.error(" PostgreSQL connection error:", connectionError);
    } finally {
        try {
            await client.end();
            console.log(" PostgreSQL connection closed.");
        } catch (endError) {
            console.error(" Error closing connection:", endError);
        }
    }
}

insertData();