import { MongoClient } from 'mongodb';

//API Route Page in NEXT JS
// Should not contain the React Component code

//Runs in Server side, just like other backend program

//Only POST request will trigger the code below
async function handler(req, res) {
    if(req.method == 'POST') {
        const data = req.body;

        //const {title, image, address, description} = data;

        const client = await MongoClient.connect('mongodb+srv://admin:admin@myatlascluster0.p0uai.mongodb.net/meetups?retryWrites=true&w=majority');

        const db = client.db();

        const meetupsCollection = db.collection('meetup');
        
        const result = await meetupsCollection.insertOne(data);
        console.log(result);

        client.close();

        res.status(201).json({
            message: 'Meetup Inserted !'
        });
    }
};

export default handler;