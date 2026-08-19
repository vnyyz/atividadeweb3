const Router = require('express');
const usuarioRouter = requise('../usuarioRouter');

const router = express.Router();

router.use('/usuarios', usuarioRoutes);

export default router;