import { Router, Request, Response } from 'express';
import Producto from '../models/Producto';
import ProductoCargado from '../models/ProductoCargado';

const router = Router();

console.log('Router de productos cargado');

router.get('/', async (req: Request, res: Response) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (err) {
    console.error('Error en /productos:', err);
    res.status(500).json({ error: 'Error al obtener productos', detalle: String(err) });
  }
});

router.get('/cargados', async (req: Request, res: Response) => {
  console.log('Entrando a /cargados');
  try {
    const lotes = await ProductoCargado.findAll();
    console.log('Lotes encontrados:', lotes.length);
    res.json(lotes);
  } catch (err) {
    console.error('Error en /cargados:', err);
    res.status(500).json({ error: 'Error al obtener lotes', detalle: String(err) });
  }
});

router.get('/cargados/barcode/:codigo', async (req: Request, res: Response) => {
  try {
    const lote = await ProductoCargado.findOne({
      where: { codigoBarras: req.params.codigo }
    });
    if (!lote) return res.status(404).json({ error: 'No encontrado' });
    res.json(lote);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar', detalle: String(err) });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const producto = await Producto.create(req.body);
    res.status(201).json(producto);
  } catch (err) {
    console.error('Error creando producto:', err);
    res.status(500).json({ error: 'Error al crear producto', detalle: String(err) });
  }
});

router.post('/cargados', async (req: Request, res: Response) => {
  console.log('Entrando a POST /cargados');
  try {
    console.log('Body recibido:', req.body);
    const lote = await ProductoCargado.create(req.body);
    res.status(201).json(lote);
  } catch (err) {
    console.error('Error creando lote:', err);
    res.status(500).json({ error: 'Error al cargar producto', detalle: String(err) });
  }
});

router.patch('/cargados/:id', async (req: Request, res: Response) => {
  try {
    await ProductoCargado.update(req.body, { where: { id: req.params.id } });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar lote' });
  }
});
router.delete('/cargados/:id', async (req: Request, res: Response) => {
  try {
    await ProductoCargado.destroy({ where: { id: req.params.id } });
    res.json({ ok: true });
  } catch (err) {
    console.error('Error eliminando lote:', err);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

export default router;