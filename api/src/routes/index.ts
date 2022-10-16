import { Router } from "express";
/* ============PRODUCTS FILES============ */
import postProducts from "./Products/postProducts";
import getAllProducts from "./Products/getAllProducts";
import getSearchedProducts from "./Products/getSearchedProducts";
import deleteProducts from "./Products/deleteProducts";
import getProduct from "./Products/getProduct";
import filterProducts from "./Products/filterProducts";
/* ============USERS FILES============ */
import signUp from "./Auth/signup";
import login from "./Auth/signin";
/* ============CATEGORIES============ */
import postCategories from "./Categories/postCategories";

const router = Router();

/* ============PRODUCTS============ */
router.use("/products", postProducts);
router.use("/products", getAllProducts);
router.use("/products", getSearchedProducts);
router.use("/products", getProduct);
router.use("/products", deleteProducts);
router.use("/products", filterProducts);

/* ============USERS============ */
router.use("/users", signUp);
router.use("/users", login);


export default router;