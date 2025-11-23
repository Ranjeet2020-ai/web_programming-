import express from 'express';
import { getCats, getCat, postCat, putCat, deleteCat } from '../controllers/cat-controller.js';
import upload from '../src/utils/multer-config.js';
import { createThumbnail } from '../src/middlewares.js';

const catRouter = express.Router();

catRouter.route('/')
  .get(getCats)
  .post(upload.single('file'), createThumbnail, postCat);

catRouter.route('/:id')
  .get(getCat)
  .put(putCat)
  .delete(deleteCat);

export default catRouter;
