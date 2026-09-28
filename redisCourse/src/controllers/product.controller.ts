import { Request, Response, NextFunction } from "express";
import * as productService from "../services/product.service";

export async function getProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const category =
      typeof req.query.category === "string" ? req.query.category : undefined;
    const search =
      typeof req.query.search === "string" ? req.query.search : undefined;

    const products = await productService.getAllProducts({ category, search });

    res.json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    next(error);
  }
}

export async function getProductById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product id",
      });
    }

    const product = await productService.getProductById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
}

export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, description, price, category, stock } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).json({
        success: false,
        message: "Name is required and must be a string",
      });
    }

    if (!description || typeof description !== "string") {
      return res.status(400).json({
        success: false,
        message: "Description is required and must be a string",
      });
    }

    if (price === undefined || typeof price !== "number" || price < 0) {
      return res.status(400).json({
        success: false,
        message: "Price is required and must be a positive number",
      });
    }

    if (!category || typeof category !== "string") {
      return res.status(400).json({
        success: false,
        message: "Category is required and must be a string",
      });
    }

    if (stock === undefined || typeof stock !== "number" || stock < 0) {
      return res.status(400).json({
        success: false,
        message: "Stock is required and must be a zero or positive number",
      });
    }

    const product = await productService.createProduct({
      name,
      description,
      price,
      category,
      stock,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product id",
      });
    }

    const { name, description, price, category, stock } = req.body;

    if (
      name === undefined &&
      description === undefined &&
      price === undefined &&
      category === undefined &&
      stock === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required to update",
      });
    }

    if (name !== undefined && typeof name !== "string") {
      return res.status(400).json({
        success: false,
        message: "Name must be a string",
      });
    }

    if (description !== undefined && typeof description !== "string") {
      return res.status(400).json({
        success: false,
        message: "Description must be a string",
      });
    }

    if (price !== undefined && (typeof price !== "number" || price < 0)) {
      return res.status(400).json({
        success: false,
        message: "Price must be a positive number",
      });
    }

    if (category !== undefined && typeof category !== "string") {
      return res.status(400).json({
        success: false,
        message: "Category must be a string",
      });
    }

    if (stock !== undefined && (typeof stock !== "number" || stock < 0)) {
      return res.status(400).json({
        success: false,
        message: "Stock must be a zero or positive number",
      });
    }

    const product = await productService.updateProduct(id, {
      name,
      description,
      price,
      category,
      stock,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
}
