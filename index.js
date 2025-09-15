// CommonJS module imports
const http = require("http");
const path = require("path");
const fs = require("fs");

// Create a server, callback takes in the request and response objects via createServer
const server = http.createServer((req, res) => {
  // Build the file path
  let filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);

  // Get the file extension
  let extName = path.extname(filePath);

  // Set initial content type
  let contentType = "text/html";

  // Check file extension and set content type
  switch (extName) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
  }

  // Check if contentType is text/html and add the extension onto the route url
  if (contentType == "text/html" && extName == "") {
    filePath += ".html";
  }

  // Read the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // Error
      if (err.code == "ENOENT") {
        // Page not found
        fs.readFile(path.join(__dirname, "404.html"), (err, content) => {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(content, "utf8");
        });
      } else {
        //  Some server error, ideally would send a page for this
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { "Content-type": contentType });
      res.end(content, "utf8");
    }
  });
});

// Port that will later be stored in an env varible or fallback to 5000
const PORT = process.env.PORT || 5000;

// Start listening to requests
server.listen(PORT, () => {
  console.log(`Server listening for requests on port: ${PORT}`);
});
