require('dotenv').config();  // To load the .env file for MongoDB URI
const { MongoClient } = require('mongodb');  // MongoDB Client
const fs = require('fs');  // File system module to read the file

// Ensure the URI is properly loaded from .env file
const uri = process.env.URI;

if (!uri) {
    console.error("❌ MongoDB URI is missing. Please check your .env file.");
    process.exit(1);
}

// Instantiate the MongoDB client using the URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function uploadData() {
    try {
        // Connect to MongoDB Atlas
        await client.connect();
        console.log("✅ Connected to MongoDB Atlas!");

        // Access the 'Restaurant' database and 'restaurants' collection
        const database = client.db('Restaurant');
        const collection = database.collection('restaurants');

        // Read data from your file
        const data = JSON.parse(fs.readFileSync('./file1.json/file4.json', 'utf8')); // Ensure correct path

        if (data.length === 0) {
            console.log("❌ No data found in the file.");
            return;
        }

        // Insert data into MongoDB
        const result = await collection.insertMany(data);
        console.log(`✅ ${result.insertedCount} documents were inserted.`);
    } catch (err) {
        console.error('❌ Error:', err);
    } finally {
        await client.close();  // Close the connection once the operation is complete
    }
}

uploadData();  // Call the function to upload data
