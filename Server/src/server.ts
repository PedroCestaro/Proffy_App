import express from 'express';
import cors from 'cors';
import routes from './routes';




const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);/*instânciando o arquivo de rotas*/

app.listen(3333);

console.log('running');