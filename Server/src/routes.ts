import express from 'express'
import ClassesController from './controlers/ClassesControler';
import ConnectionsControllers from './controlers/ConnectionsController';


const routes = express.Router(); /*Istancia o roteamento do express*/
const classesControler = new ClassesController();
const connectionsController = new ConnectionsControllers();

routes.get('/classes', classesControler.index);
routes.post('/classes', classesControler.create);


routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);
/*pedindo usuários do 3333*/

//localhost:3333/users

export default routes; /*exportando as rotas*/