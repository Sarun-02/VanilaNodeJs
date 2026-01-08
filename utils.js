const fs = require("fs");
function updateFile(path, newData) {
  try {
    //Check file is exists or not
    if (!fs.existsSync(path)) {
      throw new Error(`File not Found`);
    }
    fs.writeFile(path, JSON.stringify(newData), "utf-8", (error) => {
      if (error) {
        throw new Error(error, message);
      } else {
        console.log(`File updated successfully`);
      }
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
function fetchReqBody(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        console.log("*****8body", body);
        resolve(body);
      });
    } catch (error) {
      console.error(`Error fetching data from body: ${error.message}`);
      reject(new Error(error.message));
    }
  });
}

module.exports = {
  updateFile,
  fetchReqBody,
};