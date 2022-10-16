"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
/* ============PRODUCTS FILES============ */
const postProducts_1 = __importDefault(require("./Products/postProducts"));
const getAllProducts_1 = __importDefault(require("./Products/getAllProducts"));
const getSearchedProducts_1 = __importDefault(require("./Products/getSearchedProducts"));
const deleteProducts_1 = __importDefault(require("./Products/deleteProducts"));
const getProduct_1 = __importDefault(require("./Products/getProduct"));
const filterProducts_1 = __importDefault(require("./Products/filterProducts"));
/* ============USERS FILES============ */
const signup_1 = __importDefault(require("./Auth/signup"));
const signin_1 = __importDefault(require("./Auth/signin"));
const router = (0, express_1.Router)();
/* ============PRODUCTS============ */
router.use("/products", postProducts_1.default);
router.use("/products", getAllProducts_1.default);
router.use("/products", getSearchedProducts_1.default);
router.use("/products", getProduct_1.default);
router.use("/products", deleteProducts_1.default);
router.use("/products", filterProducts_1.default);
/* ============USERS============ */
router.use("/users", signup_1.default);
router.use("/users", signin_1.default);
exports.default = router;