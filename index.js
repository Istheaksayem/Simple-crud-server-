const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

        app.get('/users', async (req, res) => {
            const cursor = userCollection.find();
            const result = await cursor.toArray();
            res.send(result)
        })

        app.get('/users/:id', async(req, res) => {
            const id =req.params.id;
            console.log('need user id',id)
            const query ={_id:new ObjectId(id)}
            const result =await userCollection.findOne(query)
            res.send(result)


        })


        // add database related apis here
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            console.log('user info', newUser)

            const result = await userCollection.insertOne(newUser);
            res.send(result)
        })

        app.patch('/users/:id' ,async(req,res) =>{
            const id =req.params.id;
            const updatedUser =req.body;
            console.log('to update',id,updatedUser)
            const query ={_id:new ObjectId(id)}
            const update ={
                $set:{
                    name:updatedUser.name,
                    email:updatedUser.email
                }
            }
            const options ={}
            const result =await userCollection.updateOne(query,update,options)
            res.send(result)

        })

        app.delete('/users/:id', async (req, res) => {
            console.log(req.params.id);
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await userCollection.deleteOne(query)
            console.log("dghj", result,)
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