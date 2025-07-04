import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import createAllTables from './utils/CreateTables.js'
import { checkConnection } from './config/Database.js'
import UsersRoutes from './routes/UsersRoutes.js'
import PlansRoutes from './routes/PlansRoutes.js'
import LicensesRoutes from './routes/LicensesRoutes.js'

dotenv.config();

let app = express();
let PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/api/users', UsersRoutes);

app.use('/api/plans', PlansRoutes);

app.use('/api/licenses', LicensesRoutes);

app.listen(PORT, async ()=>{
    console.log(`Listening on port: ${PORT}`);
    try {
        await checkConnection();
        await createAllTables();
    } catch (error) {
        console.log("Something went wrong!", error);
    }
});