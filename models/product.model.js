const products = require("../data/products");
const { v4: uuidv4 } = require("uuid");
const { updateFile } = require("../utils");
function findAll() {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
}

function find(id) {
  return new Promise((resolve, reject) => {
    const product = products.find((data) => data.id === id);
    if (!product) {
      reject(new Error("Product not found"));
    } else {
      resolve(products.find((data) => data.id === id));
    }
  });
}

function createProduct(product) {
  return new Promise((resolve, reject) => {
    try {
      product.id = uuidv4();
      products.push(product);
      updateFile("./data/products.json", products);
      resolve(product);
    } catch (error) {
      reject(new Error(`Error creating product: ${error.message}`));
    }
  });
}

function updateProduct(id, product) {
  return new Promise((resolve, reject) => {
    try {
      const productIndex = products.findIndex((p) => p.id === id);
      products[productIndex] = product;
      updateFile("./data/products.json", products);
      resolve(products[productIndex]);
    } catch (error) {
      reject(new Error(`Error creating product: ${error.message}`));
    }
  });
}

function deleteProduct(id) {
  return new Promise((resolve, reject) => {
    try {
      const newProducts = products.filter((p) => p.id !== id);
      console.log("**********newProducts", newProducts)
      updateFile("./data/products.json", newProducts);
      resolve({
        message: "Product deleted successfully"
      });
    } catch (error) {
      reject(new Error(`Error updating product: ${error.message}`));
    }
  });
}
module.exports = {
  findAll,
  find,
  createProduct,
  updateProduct,
  deleteProduct,
};
