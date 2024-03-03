import express from "express";
import cors from "cors";


const app = express();
const PORT = process.env.POST || 8080;

const corsOptions = {
    origin: "http://localhost:8001"
}

app.use(cors(corsOptions));

//parse requests of content-type: application/json
app.use(express.json());

//parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome from server!!"})
})

app.listen(PORT, () => {
    console.log(`Server started @${PORT}`)
})