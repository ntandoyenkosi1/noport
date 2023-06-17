
const Role=require("../models/role")
const findAllRoles = (req, res) => {
	Role.find()
		.then((roles) => {
			res.send({ ok: true, data: roles });
		})
		.catch((err) => {
			res.status(500).send({ok:false,error:err});
		});
};

const findRoleById = (req, res) => {
	Role.findById(req.params.roleId)
		.then((role) => {
			if (!role) {
				return res.status(404).send({ ok:false,
					message: "Role not found with id " + req.params.roleId,
				});
			}
			res.send({ ok: true, data: role });
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({ ok:false,
					message: "Role not found with id " + req.params.roleId,
				});
			}
			return res.status(500).send({ ok:false,
				message: "Error retrieving role with id " + req.params.roleId,
			});
		});
};

const createRole = (req, res) => {
	const role = new Role(
		{
			Name:req.body.Name
		}
	);
	role.save()
		.then((data) => {
			res.send({ ok: true, data: data });
		})
		.catch((err) => {
			res.status(500).send({ok:false,
				error:err,
			});
		});
};

const updateRole = (req, res) => {
	if (!req.body) {
		return res.status(400).send({ok:false,
			message: "Role content can not be empty",
		});
	}
	const body=req.body;
	Role.findByIdAndUpdate(
		req.params.roleId,
		{
			
			Name:req.body.Name
		},
		{ new: true }
	)
		.then((role) => {
			if (!role) {
				return res.status(404).send({ ok:false,
					message: "Role not found with id " + req.params.roleId,
				});
			}
			res.send({ ok: true, data: role });
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({ ok:false,
					message: "Role not found with id " + req.params.roleId,
				});
			}
			return res.status(500).send({ ok:false,
				message: "Error updating role with id " + req.params.roleId,
			});
		});
};

const deleteRole = (req, res) => {
	Role.findByIdAndRemove(req.params.roleId)
		.then((role) => {
			if (!role) {
				return res.status(404).send({ ok:false,
					message: "Role not found with id " + req.params.roleId,
				});
			}
			res.send({ok:true, message: "Role deleted successfully!" });
		})
		.catch((err) => {
			if (err.kind === "ObjectId" || err.name === "NotFound") {
				return res.status(404).send({ ok:false,
					message: "Role not found with id " + req.params.roleId,
				});
			}
			return res.status(500).send({ ok:false,
				message: "Could not delete role with id " + req.params.roleId,
			});
		});
};
module.exports = {
	findAllRoles,
	findRoleById,
	createRole,
	updateRole,
	deleteRole
};
    