/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/games';
const router = express.Router();

// router.get('/posts', controller.getPosts);
// router.get('/posts/:id', controller.getPost);
// router.put('/posts/:id', controller.updatePost);
// router.delete('/posts/:id', controller.deletePost);
router.post('/data', controller.saveData);
router.get('/data/:date', controller.getData);
router.get('/symbol', controller.getSymbols);

export = router;