// exportData.js
import { MongoClient } from "mongodb";
import fs from "fs";

const mongoUri =
    "mongodb+srv://Arpita:Arpita@cluster0.9nyra92.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0YOUR_MONGO_URI";
const client = new MongoClient(mongoUri);

async function exportData() {
    try {
        await client.connect();
        const db = client.db("your_database");
        const collection = db.collection("your_collection");
        const data = await collection.find({}).toArray();

        fs.writeFileSync("/tmp/export.json", JSON.stringify(data, null, 2));
        console.log("Data exported to export.json");
    } finally {
        await client.close();
    }
}

exportData();