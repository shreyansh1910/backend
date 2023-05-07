const removebg = require('remove.bg');
require("dotenv").config();

const apikey = process.env.API_KEY;
async function myRemoveBgFunction(path, outputFile) {
    console.log("api triggered ");
    const result = await removebg.removeBackgroundFromImageFile({
        path,
        apiKey:apikey,
        size: "regular",
        type: "person",
        crop: true,
        scale: "50%",
        outputFile
    });
    


}


module.exports = myRemoveBgFunction;