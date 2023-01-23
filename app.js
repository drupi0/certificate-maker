const express = require("express");
const { config } = require("./environment");
const { generate, generateConfig, searchRecord, fetchEvent, fetchUser, fetchDocument} = require("./controllers")

const app = express();
const port = config.PORT;

app.use(express.json());
app.use("/assets", express.static("assets"));


app.post("/v1/generate", async (req, res) => {
  const { email } = req.body;

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

  let generated = await generate(config.CERTIFICATE_URL, pdfConfig);

  if (generated === null) {
    res.status(500);
    res.send({ success: false, message: "Error creating certificate" });
  } else {
    res.status(200);
    res.type("pdf");
    res.end(generated, "binary");
  }
});

app.post("/v2/generate", async (req, res) => {
  const { userId, eventId } = req.body;
  
  if (!userId || !eventId) {
    res.status(500);
    res.send({ success: false, message: "Server error" });
  }

  const eventObj = await fetchEvent(eventId);

  if(eventObj === null) {
    res.status(500);
    res.send({ success: false, message: "Server error" });
  }

  const isUserInMember = Array.from(eventObj["members"]).some(memberId => memberId === userId);

  if(!isUserInMember) {
    res.status(500);
    res.send({ success: false, message: `${userId} is not a member of ${eventId}` });
  }

  const userObj = await fetchUser(userId);

  if(userObj === null) {
    res.status(500);
    res.send({ success: false, message: "Server error" });
  }


  const pdfConfig = generateConfig(userObj.firstName, userObj.lastName);

  if(!eventObj["certificatePath"]) {
    res.status(500);
    res.send({ success: false, message: "Certificate file unknown." });
  }

  let generated = null;

  if(!`${eventObj["certificatePath"]}`.startsWith("http")) {
    const documentObject = await fetchDocument(eventObj["certificatePath"]);

    if(documentObject === null) {
      res.status(500);
      res.send({ success: false, message: "Error getting template file" });
    }

    generated = await generate(documentObject, pdfConfig, false);
  } else {
    generated = await generate(eventObj["certificatePath"], pdfConfig);
  }

  if (generated === null || generated instanceof Error) {
    console.log(generated);

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
