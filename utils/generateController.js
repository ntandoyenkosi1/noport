const fs = require("fs");
/**
 * This function generates a controller for a given file name and it's model data.
 * @param {String} fileName
 * @param {{file: string; key: string; value: any;}[]} data
 */
function generateController(fileName, data) {
  var newData = data
    .map((item) => {
      return `
			${item.key}:req.body.${item.key}`;
    })
    .join(",");
  console.log(newData, "New data");
  // assign model name
  var model = fileName.split(".js")[0];
  var modelName = model.replace(model.charAt(0), model.charAt(0).toUpperCase());
  // assign parameters
  // create file name
  var fName = `${modelName}Controller.js`;
  // assign data to it

  const fileData = `
const ${modelName}=require("../models/${modelName.toLowerCase()}")
const findAll${modelName}s = (req, res) => {
	${modelName}.find()
		.then((${modelName.toLowerCase()}s) => {
			res.send({ ok: true, data: ${modelName.toLowerCase()}s });
		})
		.catch((err) => {
			res.status(500).send({ok:false,error:err});
		});
};

const find${modelName}ById = (req, res) => {
	${modelName}.findById(req.params.${modelName.toLowerCase()}Id)
		.then((${modelName.toLowerCase()}) => {
			if (!${modelName.toLowerCase()}) {
				return res.status(404).send({ ok:false,
					message: "${modelName} not found with id " + req.params.${modelName.toLowerCase()}Id,
				});
			}
			res.send({ ok: true, data: ${modelName.toLowerCase()} });
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({ ok:false,
					message: "${modelName} not found with id " + req.params.${modelName.toLowerCase()}Id,
				});
			}
			return res.status(500).send({ ok:false,
				message: "Error retrieving ${modelName.toLowerCase()} with id " + req.params.${modelName.toLowerCase()}Id,
			});
		});
};

const create${modelName} = (req, res) => {
	const ${modelName.toLowerCase()} = new ${modelName}(
		{${newData}
		}
	);
	${modelName.toLowerCase()}.save()
		.then((data) => {
			res.send({ ok: true, data: data });
		})
		.catch((err) => {
			res.status(500).send({ok:false,
				error:err,
			});
		});
};

const update${modelName} = (req, res) => {
	if (!req.body) {
		return res.status(400).send({ok:false,
			message: "${modelName} content can not be empty",
		});
	}
	const body=req.body;
	${modelName}.findByIdAndUpdate(
		req.params.${modelName.toLowerCase()}Id,
		{
			{ body }
		},
		{ new: true }
	)
		.then((${modelName.toLowerCase()}) => {
			if (!${modelName.toLowerCase()}) {
				return res.status(404).send({ ok:false,
					message: "${modelName} not found with id " + req.params.${modelName.toLowerCase()}Id,
				});
			}
			res.send({ ok: true, data: ${modelName.toLowerCase()} });
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({ ok:false,
					message: "${modelName} not found with id " + req.params.${modelName.toLowerCase()}Id,
				});
			}
			return res.status(500).send({ ok:false,
				message: "Error updating ${modelName.toLowerCase()} with id " + req.params.${modelName.toLowerCase()}Id,
			});
		});
};

const delete${modelName} = (req, res) => {
	${modelName}.findByIdAndRemove(req.params.${modelName.toLowerCase()}Id)
		.then((${modelName.toLowerCase()}) => {
			if (!${modelName.toLowerCase()}) {
				return res.status(404).send({ ok:false,
					message: "${modelName} not found with id " + req.params.${modelName.toLowerCase()}Id,
				});
			}
			res.send({ok:true, message: "${modelName} deleted successfully!" });
		})
		.catch((err) => {
			if (err.kind === "ObjectId" || err.name === "NotFound") {
				return res.status(404).send({ ok:false,
					message: "${modelName} not found with id " + req.params.${modelName.toLowerCase()}Id,
				});
			}
			return res.status(500).send({ ok:false,
				message: "Could not delete ${modelName.toLowerCase()} with id " + req.params.${modelName.toLowerCase()}Id,
			});
		});
};
module.exports = {
	findAll${modelName}s,
	find${modelName}ById,
	create${modelName},
	update${modelName},
	delete${modelName}
};
    `;
  fs.writeFileSync(`dist/${model}-controller.js`, fileData);
  return fileData;
}
module.exports = generateController;
