const HTTP = require("http");
const {
  getAllProduct,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./controllers/products.controller");
const server = HTTP.createServer((req, res) => {
  try {
    if (req.method === "GET" && req.url === "/api/products") {
      getAllProduct(req, res).catch((error) => {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end(`<h1> Internal server ${error.message} </h1>`);
      });
    } else if (
      req.method === "GET" &&
      req.url.match(/\/api\/products\/([0-9]+)/)
    ) {
      const id = req.url.split("/")[3];
      getProduct(req, res, id).catch((error) => {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end(`<h1> Internal server ${error.message}</h1>`);
      });
    } else if (req.url === "/api/product" && req.method === "POST") {
      createProduct(req, res).catch((error) => {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end(`<h1>Internal server Error ${error.message}</h1>`);
      });
    } else if (
      req.url.match(/\/api\/product\/([0-9]+)/) &&
      req.method === "PUT"
    ) {
      const id = req.url.split("/")[3];
      updateProduct(req, res, id).catch((error) => {
        res.writeHead(500, { "COntent-Type": "text/html" });
        res.end(`<h1>Internal Server Error ${error.message} </h1>`);
      });
    } else if (
      req.url.match(/\/api\/product\/([0-9]+)/) &&
      req.method === "DELETE"
    ) {
      const id = req.url.split("/")[3];
      deleteProduct(req, res, id).catch((error) => {
        res.writeHead(500, { "COntent-Type": "text/html" });
        res.end(`<h1>Internal Server Error ${error.message} </h1>`);
      });
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>Page Not Found</h1>");
    }
  } catch (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.write(`<h1>Internal server Error ${error.message}</h1>`);
    res.end();
  }
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, "localhost", () => {
  console.log(`Server is running in port: ${PORT}`);
});

server.on("error", (err) => {
  console.error(`Error running server ${err.message}`);
});
