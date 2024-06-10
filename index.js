import express from 'express'  
import connectDB from './database.js';
import UsersRouter from './Routers/UserRouter.js';
import LinkRouter from './Routers/LinkRouter.js';
import bodyParser from 'body-parser';
import cors from "cors"

const app = express()
const port = 3001
app.use(bodyParser.json());
app.use(cors());
connectDB();

app.use('/user', UsersRouter);
app.use('/link', LinkRouter);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
