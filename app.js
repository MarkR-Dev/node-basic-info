// Express
const express = require("express");
const app = express();
const path = require("path");

// load static files - E.g. css files
app.use(express.static(path.join(__dirname, "public")));

// routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Sent index file");
    }
  });
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "about.html"), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Sent about file");
    }
  });
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Sent contact file");
    }
  });
});

// catches any path that doesn't match the above and sends the 404 page
app.use((req, res) => {
  res.status(404);
  res.sendFile(path.join(__dirname, "404.html"), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Sent 404 file");
    }
  });
});

// server setup
const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  // This is important!
  // Without this, any startup errors will silently fail
  // instead of giving you a helpful error message.
  if (error) throw error;

  console.log(`Express app listening on port: ${PORT}`);
});
