import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProduct,
  updateProduct,
} from "../controllers/products.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createProductSchema } from "../schemas/product.schema.js";

const router = Router();

router.get("/products", auth, getProducts);
router.post("/products", auth, validateSchema(createProductSchema), createProduct);
router.get("/products/:id", auth, getProduct);
router.put("/products/:id", auth, validateSchema(createProductSchema), updateProduct);

router.delete("/products/:id", auth, deleteProduct);

export default router;
