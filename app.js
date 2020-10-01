require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { generate, searchRecord, generateConfig } = require("./controller");

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use("/assets", express.static("assets"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/generate", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    res.status(500);
    res.send({ success: false, message: "Server error" });
  }

  const record = await searchRecord(email);

  if (!record) {
    res.status(500);
    res.send({ success: false, message: "Email not found" });
  }

  const config = generateConfig(record.first_name, record.last_name);

  generated = await generate(process.env.CERTIFICATE_URL, config);

  if (generated === null) {
    res.status(500);
    res.send({ success: false, message: "Error creating certificate" });
  } else {
    res.status(200);
    res.type("pdf");
    res.end(generated, "binary");
  }
});

app.listen(port, () => {
  console.log("Express started");
});
