import { Router } from 'express';
import connector from '../lib/connector';

const routes = new Router();

routes.post('/messages', connector.listen());

export default routes;
