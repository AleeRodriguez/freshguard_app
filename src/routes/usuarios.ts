import { Router, Request, Response } from 'express';
import Usuario from '../models/Usuario';

const router = Router();

// GET todos los usuarios
router.get('/', async (req: Request, res: Response) => {
  try {
    const usuarios = await Usuario.findAll({ where: { activo: true } });
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// POST crear usuario
router.post('/', async (req: Request, res: Response) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

// PATCH habilitar/deshabilitar usuario
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    await Usuario.update(req.body, { where: { id: req.params.id } });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});

export default router;