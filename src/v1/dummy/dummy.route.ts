import { Router } from 'express';
import controller from './dummy.controller';

const router = Router();
const { createDummy } = controller;

router.post('/', createDummy);
export default router;
