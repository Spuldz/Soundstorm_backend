import express, {Request, Response} from 'express'
import 'express-async-errors'
import { errorHandlerMiddleware } from './middleware/error-handler';
import { NotFoundMiddleware } from './middleware/not-found';
import dotenv from 'dotenv'
import { connectDB } from './database/connect';
import { authMiddleware } from './middleware/auth';
import { authRouter } from './routes/auth';
import { userRouter } from './routes/user';
import { songRouter } from './routes/songs';

const app = express()
dotenv.config()
const port = 8080 || process.env.PORT;
const cors = require('cors')


app.use(express.json())
app.use(cors())
app.use(express.static("./public/thumbnails"))


app.use("/api/v1/auth", authRouter)
app.use("/api/v1/user", authMiddleware, userRouter)
app.use("/api/v1/song", authMiddleware ,songRouter)

app.get("/hello", authMiddleware, (req, res) => {
  res.send("hello world")
})

//middleware
app.use(errorHandlerMiddleware)
app.use(NotFoundMiddleware)



const start = async () => {
  try {
      await connectDB(process.env.MONGO_URI)
      app.listen(port, () => {
        console.log("listening on port: "+port);
      });
  } catch (error) {
      console.log("failed to start server")
  }
}

start()




