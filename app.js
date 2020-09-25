const express = require("express");
const bodyParser = require("body-parser");
const { generate } = require("./controller");

const app = express();
const port = 3000;
const hash = "sampleTest";

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/generate", async (req, res) => {
  const { body } = req;
  const { config, url } = body;

  generated = await generate(url, config);
  if (generated === null) {
    res.status(500);
    res.send({ success: false, message: "Error creating certificate" });
  } else {
    res.status(200);
    res.type("pdf");
    res.end(generated, "binary");
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log("Open");
});
