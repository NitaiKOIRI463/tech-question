import express from 'express';
const Router = express.Router();
import CalculationRouter from './CalculationRouter';
Router.use('/calculation',CalculationRouter);
export default Router;