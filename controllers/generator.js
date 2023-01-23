const HummusRecipe = require("hummus-recipe");
const fetch = require("fetch-base64");

function generateConfig(firstName, lastName) {
    const fullName = `${firstName} ${lastName}`.toLowerCase()
                    .replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
                    
    return [
      {
        page: 1,
        values: [
          {
            value: fullName,
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
  
  async function generate(fileObject, config, fetchFromUrl = true) {
    try {

      let b64_template;
      let template;

      if(fetchFromUrl) {
        b64_template = await fetchUrl(fileObject);
        template = new Buffer.from(b64_template[0], "base64");
      } else {
        template = fileObject;
      }

      
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
  
  module.exports = {
    generate, generateConfig
  };