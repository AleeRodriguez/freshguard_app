import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database';
import Usuario from './models/Usuario';
import Producto from './models/Producto';
import ProductoCargado from './models/ProductoCargado';
import productosRouter from './routes/productos';
import usuariosRouter from './routes/usuarios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Log de todas las requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.get('/', (req, res) => {
  res.json({ message: 'FreshGuard API corriendo OK' });
});
app.get('/api/test', (req, res) => {
  console.log('API test alcanzada');
  res.json({ ok: true });
});

app.use('/api/productos', productosRouter);
app.use('/api/usuarios', usuariosRouter);

sequelize.sync({ force: true })
  .then(() => {
    console.log('Base de datos conectada y tablas sincronizadas.');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error conectando a la base de datos:', err);
  });

export default app;