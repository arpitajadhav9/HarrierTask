## 🚀 Setup Instructions

Run the following commands in your terminal to set up the environment:

npm init -y                    # Initialize a new Node.js project
npm install mongodb pg         # Install MongoDB and PostgreSQL client libraries
npm install fs                 # (Optional) For file system operations

## Documentation:

# 📦 MongoDB to PostgreSQL & S3 Pipeline

This project enables seamless data migration from MongoDB Atlas to PostgreSQL and Amazon S3 using Node.js. It includes utilities to:

- ✅ Export data from MongoDB Atlas to a JSON file
- ✅ Generate a PostgreSQL schema from MongoDB data
- ✅ Insert JSON data into PostgreSQL
- ✅ Store MongoDB records into an AWS S3 bucket via Lambda

## 📁 Project Structure

project/
│
├── export.js        # Exports data from MongoDB to JSON
├── insert.js        # Inserts data into PostgreSQL
├── schema.js        # Infers PostgreSQL schema from JSON
├── lambda.js        # AWS Lambda to store records into S3
├── export.json      # JSON file generated from MongoDB
└── README.md        # Documentation

## 1️⃣ Export Data from MongoDB

**File:** `export.js`  
**Description:** Connects to MongoDB and writes all documents from a collection into `export.json`.

### 🔧 Configuration

Replace the MongoDB URI and collection details:

const mongoUri = "your_mongodb_connection_string";
const db = client.db("your_database");
const collection = db.collection("your_collection");

### ▶️ Run the script

node export.js

-Output: /tmp/export.json
-Console Log: Data exported to export.json


## 2️⃣ Generate PostgreSQL Schema

**File:** schema.js 
**Description:** Reads the JSON file and infers a PostgreSQL schema using basic data type detection.

### 🧠 Type Inference

- TEXT
- INTEGER
- FLOAT
- BOOLEAN
- TIMESTAMP

### ▶️ Run the script

node schema.js


### 💡 Sample Output

sql
CREATE TABLE your_table (
  name TEXT,
  email TEXT,
  role TEXT,
  isVerified BOOLEAN,
  createdAt TEXT
);


## 3️⃣ Insert Data into PostgreSQL

File: insert.js  
Description: Reads export.json and inserts each document into a PostgreSQL table.

### 🔧 Configuration

Update PostgreSQL credentials and database name:

const client = new Client({
    host: "rds_endpoint",
    user: "your_username",
    password: "your_password",
    database: "DBNAME",
});


Replace table name in the insert query:

await client.query(INSERT INTO your_table (...) VALUES (...));


### ▶️ Run the script

node insert.js

Console Log: Data inserted into PostgreSQL.

## 4️⃣ Upload Record to AWS S3 via Lambda

File: lambda.js
Description: AWS Lambda function that accepts a JSON record via HTTP and stores it in an S3 bucket with a timestamped filename.

### 🔧 Setup

- Add your S3 bucket name in the code:
Bucket: "your_bucket_name",

- Ensure Lambda has IAM permissions to write to S3.

### 📦 Sample Response

{
  "statusCode": 200,
  "body": "Record stored."
}

## 🧪 Sample MongoDB Data Format


[
  {
    "name": "Aarav Sharma",
    "email": "aarav.sharma@example.com",
    "role": "student",
    "isVerified": true,
    "createdAt": "2024-08-01T12:30:00Z"
  },
  
]



## 📬 Author

Name: Raheel , Arpita , Ashlin , Prabodh
