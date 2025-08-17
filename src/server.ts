import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";
import routes from "./routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errorHandler);

app.get('/', (req, res) => {
    res.send({ success: true, message: "Welcome to my library" });
})

app.listen(config.port, () => {
    console.log(`✅ Server is running on port : ${config.port}`);
})

async function server() {
    try {
        await mongoose.connect(config.database_url!)

        console.log(`✅ Connected to DATABASE ✅`);
    } catch (error) {
        console.error(`Server error ${server}`)
    }
}

server();