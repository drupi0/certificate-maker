const express = require("express");
const { config } = require("./environment");
const { generate, generateConfig, searchRecord} = require("./controllers")

const app = express();
const port = config.PORT;

app.use(express.json());
app.use("/assets", express.static("assets"));


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

  const pdfConfig = generateConfig(record.first_name, record.last_name);

  generated = await generate(config.CERTIFICATE_URL, pdfConfig);

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
  console.log(`Server started at port ${port}`);
});
