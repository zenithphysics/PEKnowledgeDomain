const router = require("express").Router();

const { addCourse, addSubject, addChapter, addTopic } = require("../controllers/Courses");

/* important please use camelCase notation for variables and attributes should have First letter in uppercase  */

//-----------------add course post route ----------//
router.post("/addcourse", addCourse);

//---------------add subjects post router -----------------//
router.post("/addsubject", addSubject);

//----------add chapter post route--------------------//
router.get("/addchapter", addChapter);

//-----------------add topic post route --------------//
router.post("/addtopic", addTopic);

module.exports = router;
