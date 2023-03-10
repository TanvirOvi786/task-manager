const express = require('express');
const UsersController = require('../controllers/UserController');
const TasksController = require('../controllers/TaskController');
const VerifySection = require('../middleware/AuthVerify');


const router = express.Router();
//user
router.post("/registration", UsersController.registration);
router.post("/login", UsersController.login);
router.post("/profileUpdate", VerifySection, UsersController.profileUpdate);
router.get("/profileDetails", VerifySection, UsersController.profileDetails);

router.get("/RecoverVerifyEmail/:email", UsersController.RecoverVerifyEmail);
router.get("/RecoverVerifyOTP/:email/:otp", UsersController.RecoverVerifyOTP);
router.post("/RecoverResetPass", UsersController.RecoverResetPass);

//tasks
router.post("/createTask", VerifySection, TasksController.createTask);
router.get("/updateTaskStatus/:id/:status", VerifySection, TasksController.updateTaskStatus);
router.get("/listTaskByStatus/:status", VerifySection, TasksController.listTaskByStatus);
router.get("/taskStatusCount", VerifySection, TasksController.taskStatusCount);
router.get("/deleteTask/:id", VerifySection, TasksController.deleteTask);
module.exports = router;