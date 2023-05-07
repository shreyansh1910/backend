const express = require('express');
const multer = require('multer');
const cors = require('cors');

const myRemoveBgFunction = require('./api.js');

const app = express();

const upload = multer({ dest: 'tmp' });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://frontend-orcin-beta.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

const corsOptions = {
    origin: 'https://frontend-orcin-beta.vercel.app', // Replace with your frontend's origin
    methods: ['GET', 'POST'], // Specify the allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed request headers
};

//Enable CORS with the specified options
app.use(cors(corsOptions));

// Enable CORS for all HTTP methods
// app.use(cors());

// Enable CORS for only specific HTTP methods
// app.use(cors({
//     origin: 'https://frontend-orcin-beta.vercel.app',
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
// };


app.post('/api/upload', upload.single('image'), async (req, res) => {
    console.log("hello i am api/upload");
    console.log(req.file);
    const imageFile = req.file;
    console.log(__dirname + '/' + imageFile.path, __dirname + '/' + imageFile.path + 'removed');
    await myRemoveBgFunction(__dirname + '/' + imageFile.path, __dirname + '/' + imageFile.path + 'removed');
    console.log("done");
    res.sendFile(__dirname + '/' + imageFile.path + 'removed');

});

app.get("/", (req, res) => { res.send("BACKEND WORKING") });




app.listen(process.env.PORT || 3001, () => {
    console.log('Server is running on port 3001');
});