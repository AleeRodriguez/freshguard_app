import { Router, Request, Response } from 'express';
import Usuario from '../models/Usuario';

const router = Router();

// GET todos los usuarios
router.get('/', async (req: Request, res: Response) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios', detalle: String(err) });
  }
});

// GET usuario por uid de Firebase
router.get('/:uid', async (req: Request, res: Response) => {
  try {
    const usuario = await Usuario.findOne({ where: { uid: req.params.uid } });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuario', detalle: String(err) });
  }
});

// POST crear usuario
router.post('/', async (req: Request, res: Response) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    console.error('Error creando usuario:', err);
    res.status(500).json({ error: 'Error al crear usuario', detalle: String(err) });
  }
});

// PATCH actualizar usuario (rol, activo)
router.patch('/:uid', async (req: Request, res: Response) => {
  try {
    await Usuario.update(req.body, { where: { uid: req.params.uid } });
    const updated = await Usuario.findOne({ where: { uid: req.params.uid } });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});

export default router;