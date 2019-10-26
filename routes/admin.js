const router = require("express").Router();
const bodyParser = require("body-parser");

//controllers for post requests
const { signUpAdmin, loginAdmin, addSubject, addChapter, addTopic, addPage, addSection } = require("../controllers/Admin");

//controllers for get requests
const { getSubjects, getChapters, getTopics } = require("../controllers/Admin");

//controllers for all delete requests
const {deleteSubject, deleteChapter, deleteTopic, deletePage, deleteSection} = require('../controllers/Admin')

//controllers for all the update routes
const {editSubject, editChapter, editPage, editTopic, editSection} = require('../controllers/Admin')

//verifyToken utility
const verifyToken = require("../utils/verifyToken");
const localStorage = require("../utils/localStorage");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//----------------starting with all the post routes with here-----------------------//

router.post("/signup", signUpAdmin);

//---login route for admin-----------//
router.post("/login", loginAdmin);
//--logout route for admin-----------//
router.get("/logout", (req, res) => {
  localStorage.removeItem("loginToken");
  res.status(200).json({
    message: "logout Success"
  });
});

//----add a subject---------------//
router.post("/addsubject", addSubject);

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

//===============update routes starts from here===========================//
//----------------update route for kdsubject---------------------//
router.put('/subject/:subjectid', editSubject)

//=================update route for kd chapter=========================//
router.put('/chapter/:chapterid' , editChapter)
//========================update route for kd page =====================//
router.put('/page/:pageid', editPage)
//====================update route for topic===========================//
router.put('/topic/:topicid', editTopic)
//--------------------update route for kd section================//
router.put('/section/:sectionid' , editSection)

//---------------delete routes start from here-------------------------------------//
//------------delete route for subject---------------------//
router.delete('/subject/:subjectid' , deleteSubject)

//---------------delete route for chapter--------------------//
router.delete('/chapter/:chapterid' , deleteChapter) 

//---------delete route for topic---------------------------//
router.delete('/topic/:topicid' , deleteTopic)

//---------delete route for page----------------------//
router.delete('/page/:pageid' ,deletePage)

//----------delete route for section------------------//
router.delete('/section/:sectionid' , deleteSection)



module.exports = router;
