const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000;

require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ts3db.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const database = client.db("eLearningApp")
        const courses = database.collection("courses");
        const instructors = database.collection("instructors");

        // Courses
        app.get("/courses", async (req, res) =>{
            const query = {};
            const options = await courses.find(query).toArray();
            res.send(options);
        })
        // Courses Home 
        app.get("/courses/home", async (req, res) =>{
            const query = {};
            const options = await courses.find(query).limit(6).toArray();
            res.send(options);
        })

        // Instructors
        app.get("/instructors", async (req, res) =>{
            const query = {};
            const options = await instructors.find(query).toArray();
            res.send(options);
        })
        // Home Instructors
        app.get("/instructors/home", async (req, res) =>{
            const query = {};
            const options = await instructors.find(query).limit(4).toArray();
            res.send(options);
        })
        // Instructor Details
        app.get("/instructor/:id", async (req, res) =>{
            const id = req.params.id;
            const query = {_id: new ObjectId(id)}
            const options = await instructors.findOne(query)
            res.send(options)

        })
    } finally{
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("Server runnning Successful");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})