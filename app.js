const express = require('express')
const app = express()

function getClient() {
  const MongoClient = require("mongodb").MongoClient;
  const uri ="mongodb://localhost:27017";
  return new MongoClient(uri, { useNewUrlParser: true });
}

app.get('/', function (req, res) {
  const client = getClient();
  client.connect(async (err) => {
    const collection = client.db("appdb").collection("users");
    const users = await collection.find().toArray();
    res.send(users);
    client.close();
  });
})

app.post('/addUser', function (req,res) {
  const client = getClient();
  client.connect(async (err) => {
    const collection = client.db("appdb").collection("users");
    const newUser = await collection.insertOne( { "name" : "Kinga", "age" : 26 } );
    res.send(newUser);
    client.close();
  });
})


app.listen(3000)

