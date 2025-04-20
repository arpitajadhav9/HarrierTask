import fs from "fs";

const json = JSON.parse(fs.readFileSync("./export.json", "utf8"));

function inferPostgresType(value) {
    if (typeof value === "string") return "TEXT";
    if (typeof value === "number")
        return Number.isInteger(value) ? "INTEGER" : "FLOAT";
    if (typeof value === "boolean") return "BOOLEAN";
    if (value instanceof Date) return "TIMESTAMP";
    return "TEXT";
}

function generateSchema(jsonArray) {
    const sample = jsonArray[0];
    let schema = "CREATE TABLE your_table (\n";

    for (const [key, value] of Object.entries(sample)) {
        schema += `  ${key} ${inferPostgresType(value)},\n`;
    }
    schema = schema.slice(0, -2) + "\n);";
    return schema;
}

console.log(generateSchema(json));