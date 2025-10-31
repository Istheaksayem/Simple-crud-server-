const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 3000;

// middleware

app.use(cors())
app.use(express.json())


// simpleDBUser
// YpdRsTKaTiGAE5zP
const uri = "mongodb+srv://simpleDBUser:YpdRsTKaTiGAE5zP@cluster0.ba90y0b.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


app.get('/', (req, res) => {
    res.send('Simple crud server is running')
})



async function run() {
    try {
        await client.connect();

        const usersDB = client.db('users');
        const userCollection = usersDB.collection('users')

        app.get('/users', async(req, res) => {
            const cursor =userCollection.find();
            const result =await cursor.toArray();
            res.send(result)
        })

        // add database related apis here
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            console.log('user info', newUser)

            const result = await userCollection.insertOne(newUser);
            res.send(result)
        })

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally {

    }
}

run().catch(console.dir)


app.listen(port, () => {
    console.log(`Simple Crud server is running on port ${port}`)
})

// async function run(){

// }

// run().catch(console.dir)