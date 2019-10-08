const router = require("express").Router();
const bodyParser = require("body-parser");

//controllers for post requests
const { signUpAdmin, loginAdmin, addSubject, addChapter, addTopic, addPage, addSection } = require("../controllers/Admin");
//controllers for get requests
const { getSubjects, getChapters, getTopics } = require("../controllers/Admin");

//verifyToken utility
const verifyToken = require("../utils/verifyToken");
const localStorage = require("../utils/localStorage");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//----------------starting with all the post routes with here-----------------------//

router.post("/signup", signUpAdmin);

//---login route for admin-----------//
router.post("/login", loginAdmin);

router.get("/logout", (req, res) => {
  localStorage.removeItem("loginToken");
  res.status(200).json({
    message: "logout Success"
  });
});

//----add a subject---------------//
router.post("/addsubject", verifyToken, addSubject);

//-------------add chapters-------------------//
router.post("/addchapters", addChapter);

//add tpics to chapters-----------------------//
router.post("/addtopics", addTopic);
//---------------add pages to topics----------------------//
router.post("/addpages", addPage);

//----------------add sections to pages-----------------------//
router.post("/addsection", addSection);

//-----------starting with all the get routes from here--------------------------//

//to get the list of all the KDsubjects stored in the database
router.get("/subjects", getSubjects);

//---------to get all the chapters related to a single kdsubject---------------------//
router.get("/chapters/:subjecttitle", getChapters);

//--------------to get all the topics realted to the single chapter------------------//
router.get("/topics/:chaptertitle", getTopics);

module.exports = router;
