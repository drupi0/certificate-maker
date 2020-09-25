const HummusRecipe = require("hummus-recipe");
const fetch = require("fetch-base64");

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

module.exports = { generate };
