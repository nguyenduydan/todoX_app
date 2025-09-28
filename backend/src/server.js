import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectDB } from './configs/db.js';
import taskRouter from './routes/tasksRouter.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json())
app.use(cors({origin:"http://localhost:5173"}))


app.use("/api/tasks", taskRouter)

connectDB().then(() =>{
    app.listen(PORT, () => {
        console.log(`>> Server is running on port: ${PORT} <<`);
    });
})


