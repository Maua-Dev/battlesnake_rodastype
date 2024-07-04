import { config } from 'dotenv';
config()
import express, { Request, Response } from 'express';
import ServerlessHttp from 'serverless-http';
import { STAGE } from './app/stage_enum';

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.json({
        apiversion: "1",
        author: "Maua-Dev",
        color: "#8B0000",
        head: "tiger-king",
        tail: "hook",
        version: "1.0.0"
    });
});

app.post('/start', (req: Request, res: Response) => {
    res.send("ok");
});

app.post('/move', (req: Request, res: Response) => {
    console.log(req.body);
    const directions = ["up", "down", "left", "right"];
    const i = Math.floor(Math.random() * directions.length);
    const response = {
        move: directions[i],
        shout: `I'm moving ${directions[i]}!`
    };
    res.json(response);
});

app.post('/end', (req: Request, res: Response) => {
    res.send("ok");
});

console.log('process.env.STAGE: ' + process.env.STAGE)

if (process.env.STAGE === STAGE.TEST) {
    app.listen(3000, () => {console.log('Server up and running on: http://localhost:3000 🚀')})
} else {
    module.exports.handler = ServerlessHttp(app)
}


