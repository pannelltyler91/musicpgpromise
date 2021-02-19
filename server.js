let express = require('express');
let app = express();
const promise = require('bluebird');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const initOptions ={
    promiseLib:promise,
};

const config ={
    host:'localhost',
    port:5432,
    database:'music_db',
    user:'postgres',
    password:'postgres'
}
//Load and initialize pg promise
const pgp = require('pg-promise')(initOptions);

//create 
const db = pgp(config);

app.post('/artist', (req,res) => {
    var query = "INSERT INTO artist (name) VALUES ($1) RETURNING id"
    db.one(query,req.body.name). then((result) =>{
        console.log('Created artist with ID' + result.id)
        res.send('Created artist with ID' + result.id);
    });
})

app.post('/album', (req,res) => {
    var query = "INSERT INTO album (title,release_year,artist_id) VALUES ($1,$2,$3) RETURNING id"
    db.one(query,req.body.title,req.body.release_year,req.body.artist_id). then((result) => {
        console.log('Created album with ID' + result.id);
        res.send('Created album with ID' + result.id);

    })
    
})

app.post('/track', (req,res) => {
    var query = "INSERT INTO track (name,duration,album_id) VALUES ($1,$2,$3) RETURNING id"
    db.one(query,req.body.name,req.body.duration,req.body.album_id). then((result) => {
        console.log('Created track with ID' + result.id);
        res.send('Created track with ID' + result.id);

    })
    
    
})



app.listen(3000, ()=> {
    console.log('API is listening on port 3000!');
})