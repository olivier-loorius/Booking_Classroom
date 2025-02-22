import { Router } from 'express';
import Equipment from '../models/equipment';

const router = Router();

// Créer un nouvel équipement
router.post('/equipment', async (req, res) => {
  try {
    const equipment = await Equipment.create(req.body);
    res.status(201).json(equipment);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Unknown error' });
    }
  }
});

// Récupérer tous les équipements
router.get('/equipment', async (req, res) => {
  try {
    const equipment = await Equipment.findAll();
    res.status(200).json(equipment);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Unknown error' });
    }
  }
});

// Récupérer un équipement par son ID
router.get('/equipment/:id', async (req, res) => {
  try {
    const equipment = await Equipment.findByPk(req.params.id);
    if (equipment) {
      res.status(200).json(equipment);
    } else {
      res.status(404).json({ message: 'Équipement non trouvé' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Unknown error' });
    }
  }
});

// Mettre à jour un équipement
router.put('/equipment/:id', async (req, res) => {
  try {
    const equipment = await Equipment.findByPk(req.params.id);
    if (equipment) {
      await equipment.update(req.body);
      res.status(200).json(equipment);
    } else {
      res.status(404).json({ message: 'Équipement non trouvé' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Unknown error' });
    }
  }
});

// Supprimer un équipement
router.delete('/equipment/:id', async (req, res) => {
  try {
    const equipment = await Equipment.findByPk(req.params.id);
    if (equipment) {
      await equipment.destroy();
      res.status(200).json({ message: 'Équipement supprimé' });
    } else {
      res.status(404).json({ message: 'Équipement non trouvé' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Unknown error' });
    }
  }
});

export default router;