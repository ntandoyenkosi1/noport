
const Course=require("../models/course")
const findAllCourses = (req, res) => {
	Course.find()
		.then((courses) => {
			res.send({ ok: true, data: courses });
		})
		.catch((err) => {
			res.status(500).send({ok:false,error:err});
		});
};

const findCourseById = (req, res) => {
	Course.findById(req.params.courseId)
		.then((course) => {
			if (!course) {
				return res.status(404).send({ ok:false,
					message: "Course not found with id " + req.params.courseId,
				});
			}
			res.send({ ok: true, data: course });
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({ ok:false,
					message: "Course not found with id " + req.params.courseId,
				});
			}
			return res.status(500).send({ ok:false,
				message: "Error retrieving course with id " + req.params.courseId,
			});
		});
};

const createCourse = (req, res) => {
	const course = new Course(
		{
			Name:req.body.Name,
			StartDate:req.body.StartDate,
			EndDate:req.body.EndDate,
			Status:req.body.Status
		}
	);
	course.save()
		.then((data) => {
			res.send({ ok: true, data: data });
		})
		.catch((err) => {
			res.status(500).send({ok:false,
				error:err,
			});
		});
};

const updateCourse = (req, res) => {
	if (!req.body) {
		return res.status(400).send({ok:false,
			message: "Course content can not be empty",
		});
	}
	const body=req.body;
	Course.findByIdAndUpdate(
		req.params.courseId,
		{
			
			Name:req.body.Name,
			StartDate:req.body.StartDate,
			EndDate:req.body.EndDate,
			Status:req.body.Status
		},
		{ new: true }
	)
		.then((course) => {
			if (!course) {
				return res.status(404).send({ ok:false,
					message: "Course not found with id " + req.params.courseId,
				});
			}
			res.send({ ok: true, data: course });
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({ ok:false,
					message: "Course not found with id " + req.params.courseId,
				});
			}
			return res.status(500).send({ ok:false,
				message: "Error updating course with id " + req.params.courseId,
			});
		});
};

const deleteCourse = (req, res) => {
	Course.findByIdAndRemove(req.params.courseId)
		.then((course) => {
			if (!course) {
				return res.status(404).send({ ok:false,
					message: "Course not found with id " + req.params.courseId,
				});
			}
			res.send({ok:true, message: "Course deleted successfully!" });
		})
		.catch((err) => {
			if (err.kind === "ObjectId" || err.name === "NotFound") {
				return res.status(404).send({ ok:false,
					message: "Course not found with id " + req.params.courseId,
				});
			}
			return res.status(500).send({ ok:false,
				message: "Could not delete course with id " + req.params.courseId,
			});
		});
};
module.exports = {
	findAllCourses,
	findCourseById,
	createCourse,
	updateCourse,
	deleteCourse
};
    