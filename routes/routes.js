const router = require("express").Router();
const course = require("../controllers/course-controller");
const role = require("../controllers/role-controller");
const user = require("../controllers/user-controller");


router.get("/courses", course.findAllCourses);
router.get("/courses/:courseId", course.findCourseById);
router.post("/courses", course.createCourse);
router.put("/courses/:courseId", course.updateCourse);
router.delete("/courses/:courseId", course.deleteCourse);
router.get("/roles", role.findAllRoles);
router.get("/roles/:roleId", role.findRoleById);
router.post("/roles", role.createRole);
router.put("/roles/:roleId", role.updateRole);
router.delete("/roles/:roleId", role.deleteRole);
router.get("/users", user.findAllUsers);
router.get("/users/:userId", user.findUserById);
router.post("/users", user.createUser);
router.put("/users/:userId", user.updateUser);
router.delete("/users/:userId", user.deleteUser);
module.exports = router;