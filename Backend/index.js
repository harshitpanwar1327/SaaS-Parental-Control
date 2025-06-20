import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import createAllTables from './utils/CreateTables.js';
import { checkConnection } from './config/Database.js';

dotenv.config();

let app = express();
let PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.listen(PORT, async ()=>{
    console.log(`Port ${PORT} is listening`);
    try {
        await checkConnection();
        await createAllTables();
    } catch (error) {
        console.log("something went wrong",error);
    }
});