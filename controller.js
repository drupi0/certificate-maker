const HummusRecipe = require("hummus-recipe");
const fetch = require("fetch-base64");
const { MongoClient } = require("mongodb");
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useUnifiedTopology: true });

// config = [{
//     "page": number,
//     "values":
//     [{
//         "value": string,
//         "xPosition": number,
//         "yPosition": number,
//         "options": ... See https://hummus-recipe.s3.amazonaws.com/docs/Recipe.html#.text for text config
//     }]
// }]
//

function generateConfig(firstName, lastName) {
  return [
    {
      page: 1,
      values: [
        {
          value: `${firstName} ${lastName}`.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()),
          xPosition: 425.6,
          yPosition: 300.0,
          options: {
            size: 50,
            font: "Arial",
            align: "center center",
            color: "#fe8be2",
          },
        },
      ],
    },
  ];
}

async function generate(url, config) {
  try {
    const b64_template = await fetchUrl(url);
    const template = new Buffer.from(b64_template[0], "base64");
    const pdfdoc = new HummusRecipe(template);
    const pdfCreate = new Promise((resolve, reject) => {
      config.forEach((vars) => {
        template_values = vars.values;
        pdfdoc.editPage(vars.page);
        template_values.forEach((element) => {
          const { xPosition, yPosition, value, options } = element;
          pdfdoc.text(value, xPosition, yPosition, options);
        });
      });

      pdfdoc.endPage().endPDF((buff) => {
        if (buff === null) {
          reject(null);
        }

        resolve(buff);
      });
    });

    return await pdfCreate;
  } catch (err) {
    return err;
  }
}

async function fetchUrl(url) {
  return await new Promise((resolve, reject) => {
    fetch.auto(url).then(
      (resp) => {
        resolve(resp);
      },
      (err) => {
        reject(new Error(err));
      }
    );
  });
}

async function searchRecord(email) {
  await client.connect();
  return await client
    .db()
    .collection(process.env.MONGO_COLLECTION)
    .findOne(
      { email },
      {
        projection: { first_name: 1, last_name: 1, _id: 0 },
      }
    );
}

module.exports = { generate, searchRecord, generateConfig };
