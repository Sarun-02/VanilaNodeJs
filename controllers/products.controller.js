const ProductModule = require("../models/product.model");
const { fetchReqBody } = require("../utils");
const getAllProduct = async (req, res) => {
  try {
    const productList = await ProductModule.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(productList));
  } catch (error) {
    console.error(`Error fetching product list ${error.message}`);
    throw new Error(error.message);
  }
};

const getProduct = async (req, res, id) => {
  try {
    const productList = await ProductModule.find(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(productList));
  } catch (error) {
    console.error(`Error fetching product list ${error.message}`);
    throw new Error(error.message);
  }
};

const createProduct = async (req, res) => {
  try {
    const body = await fetchReqBody(req);
    const { name, description, price } = JSON.parse(body);
    const product = {
      name,
      description,
      price,
    };
    const newProduct = await ProductModule.createProduct(product);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.error(`Error creating product: ${error.message}`);
    throw new Error(error.message);
  }
};

const updateProduct = async (req, res, id) => {
  try {
    //Check if the product exists or not
    const currentProduct = await ProductModule.find(id);
    if (currentProduct) {
      //Fetch Data
      const body = await fetchReqBody(req);
      const { name, description, price } = JSON.parse(body);
      const productData = {
        id,
        name: name || currentProduct.name,
        description: description || currentProduct.description,
        price: price || currentProduct.price,
      };
      //update the product
      const updateProduct = await ProductModule.updateProduct(id, productData);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updateProduct));
    } else {
      throw new Error(`Product doesn't exists`);
    }
  } catch (error) {
    console.error(`Error updating product: ${error.message}`);
    throw new Error(error.message);
  }
};

const deleteProduct = async (req, res, id) => {
  try {
    const product = await ProductModule.find(id);
    if (product) {
      const result = await ProductModule.deleteProduct(id);
      console.log("*********product", result);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    } else {
      throw new Error(`Product doesn't exists`);
    }
  } catch (error) {
    console.error(`Error deleting product ${error.message}`);
    throw new Error(error.message);
  }
};
module.exports = {
  getAllProduct,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
