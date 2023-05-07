const express = require('express');
const multer = require('multer');
const cors = require('cors');

const myRemoveBgFunction = require('./api.js');

const app = express();

const upload = multer({ dest: '/tmp' });
app.use(cors());

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