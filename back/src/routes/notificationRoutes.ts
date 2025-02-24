import { Router } from 'express';
import Notification from '../models/notification';

const router = Router();

// Créer une nouvelle notification
router.post('/', async (req, res) => {
  try {
    const notification = await Notification.create(req.body);
    res.status(201).json(notification);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Une erreur inconnue est survenue' });
    }
  }
});

// Récupérer toutes les notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.findAll();
    res.status(200).json(notifications);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Une erreur inconnue est survenue' });
    }
  }
});

// Récupérer une notification par son ID
router.get('/:id', async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (notification) {
      res.status(200).json(notification);
    } else {
      res.status(404).json({ message: 'Notification non trouvée' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Une erreur inconnue est survenue' });
    }
  }
});

// Mettre à jour une notification
router.put('/:id', async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (notification) {
      await notification.update(req.body);
      res.status(200).json(notification);
    } else {
      res.status(404).json({ message: 'Notification non trouvée' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Une erreur inconnue est survenue' });
    }
  }
});

// Supprimer une notification
router.delete('/:id', async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (notification) {
      await notification.destroy();
      res.status(200).json({ message: 'Notification supprimée' });
    } else {
      res.status(404).json({ message: 'Notification non trouvée' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Une erreur inconnue est survenue' });
    }
  }
});

export default router;