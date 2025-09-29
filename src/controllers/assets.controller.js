import { AssetModel } from "../models/mongoose/asset.model";

export const createAsset = async (req, res) => {
    // TODO: crear asset (usuario autenticado)
  const { inventoryNumber, brand, model, status, responsible, categories} = req.body;
  try {
    const newArticle = await ArticleModel.create({
      inventoryNumber,
      brand,
      model,
      status,
      responsible: req.loginUser.id,
      categories,
    });
    return res.status(201).json({
      msg: "Asset creado correctamente",
      newArticle,
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllAssets = async (_req, res) => {
  try {
    // TODO: listar assets con el responsible y sus categories (populate) (solo admin)
    const data = await AssetModel.find().populate("categories");
    return res.status(200).json({
      msg: "Listando todos los artículos",
      data,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getMyAssets = async (req, res) => {
  try {
    // TODO: assets con sus categories (populate) del usuario logueado (solo si el usuario logueado es responsible de assets)
    return res.status(200).json({ data: myAssets });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteAsset = async (req, res) => {
  try {
    // TODO: eliminar un asset (solo si el usuario logueado es el responsible del asset)
    return res.status(204).json({ msg: "Asset eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
