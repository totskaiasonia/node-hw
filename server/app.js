import express from "express";
import router from "./router.js";
import mongoose from "mongoose";
import cors from 'cors';

const PORT = 3000;
const DB_USERNAME = 'user';
const DB_PASSWORD = 'oCX3TgMtajKPLbF1';


mongoose
    .connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.ibraqqd.mongodb.net/`)
    .then(() => console.log("Connected DB"))
    .catch((error) => console.log("Error", error));


const app = express();

app.use(cors());
app.use(express.json());
app.use(router);


app.get('/', (req, res) => {
    res.status(200).json({msg: "hello"});
});

app.listen(PORT, () => {
    console.log("Server is listening on port", PORT);
})