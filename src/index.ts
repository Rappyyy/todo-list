import express, { Application, Request, Response, NextFunction} from 'express';

const app : Application = express()

app.use(express.json());

// Routes


app.get('/', (req, res) => {
    res.send('Well done!')
})

app.listen(3000, () => {
    console.log("Application is listening on port 3000!")
})