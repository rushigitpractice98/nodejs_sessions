import * as http from 'http'; //ES 6
import  express from "express";

const app = express();

app.get("/", (req, res) => {
    console.log("");
    res.send("HomePage")
})

app.get('/about', (req, res) => {
    console.log("");
    res.send(`About Page ${req.query.name}`)
})

app.listen(8000, () => console.log("Server started!!!!"))
