import { Request, Response } from "express";
import RoomEquipment from '../models/roomEquipment';

// ✅ Créer une relation entre une salle et un équipement
export const createRoomEquipment = async (req: Request, res: Response) => {
  try {
    const { roomId, equipmentId } = req.body;
    const roomEquipment = await RoomEquipment.create({ roomId, equipmentId });
    res.status(201).json(roomEquipment);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de la relation salle-équipement", error });
  }
};

// ✅ Récupérer toutes les relations salle-équipement
export const getRoomEquipments = async (_req: Request, res: Response) => {
  try {
    const roomEquipments = await RoomEquipment.findAll();
    res.json(roomEquipments);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des relations salle-équipement", error });
  }
};

// ✅ Récupérer une relation salle-équipement par ID
export const getRoomEquipmentById = async (req: Request, res: Response) => {
  try {
    const roomEquipment = await RoomEquipment.findOne({ where: { roomId: req.params.roomId, equipmentId: req.params.equipmentId } });
    if (!roomEquipment) {
      return res.status(404).json({ message: "Relation salle-équipement non trouvée" });
    }
    res.json(roomEquipment);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la relation salle-équipement", error });
  }
};

// ✅ Mettre à jour une relation salle-équipement
export const updateRoomEquipment = async (req: Request, res: Response) => {
  try {
    const { roomId, equipmentId } = req.body;
    const [updated] = await RoomEquipment.update({ roomId, equipmentId }, { where: { roomId: req.params.roomId, equipmentId: req.params.equipmentId } });
    if (!updated) {
      return res.status(404).json({ message: "Relation salle-équipement non trouvée" });
    }
    const updatedRoomEquipment = await RoomEquipment.findOne({ where: { roomId, equipmentId } });
    res.json(updatedRoomEquipment);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de la relation salle-équipement", error });
  }
};

// ✅ Supprimer une relation salle-équipement
export const deleteRoomEquipment = async (req: Request, res: Response) => {
  try {
    const deleted = await RoomEquipment.destroy({ where: { roomId: req.params.roomId, equipmentId: req.params.equipmentId } });
    if (!deleted) {
      return res.status(404).json({ message: "Relation salle-équipement non trouvée" });
    }
    res.json({ message: "Relation salle-équipement supprimée" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de la relation salle-équipement", error });
  }
};