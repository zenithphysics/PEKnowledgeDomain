const bcrypt = require("bcryptjs");
const Admin = require("../../models/admin").model;
const Subject = require("../../models/kdsubject").model;
const Chapter = require("../../models/kdchapter").model;
const Topic = require("../../models/kdtopic").model;
const Page = require("../../models/kdpage").model;
const jwt = require("jsonwebtoken");

/*--------------joi validation schema-----------*/
const loginSchema = require("../../joi_schema/login");
const { signUpAdminSchema } = require("../../joi_schema/signup");

const localStorage = require("../../utils/localStorage");

//configs
const jwtSecret = require("../../config/jwtSecret");

//-------------signup controller--------------------//

exports.signUpAdmin = async (req, res, next) => {
  const adminExists = await Admin.findOne({ email: req.body.email });

  if (adminExists) {
    return res.status(400).json({ message: "admin with this email already registered" });
  } else {
    const { error, value } = signUpAdminSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(value.password, salt);

      const registeredAdminUser = new Admin({ ...value, password: hashedPassword });

      try {
        const savedAdminUser = await registeredAdminUser.save();
        res.status(200).json({ ...savedAdminUser._doc, message: "Admin Signup Success", status: 200 });
      } catch (err) {
        if (err) throw err;
      }
    }
  }
};

//-----------login controller-------------//

exports.loginAdmin = async (req, res, next) => {
  const { error, value } = loginSchema.validate(req.body);

  if (error) {
    res.status(400).json({ message: error.details[0].message });
  } else {
    let adminObject = {};
    Admin.findOne({ email: value.email })
      .then(registeredAdmin => {
        if (registeredAdmin) {
          adminObject = registeredAdmin;
          return bcrypt.compare(value.password, registeredAdmin.password);
        }
      })
      .then(loginStatus => {
        if (loginStatus) {
          jwt.sign({ id: adminObject._id }, jwtSecret.jwtKey, (err, token) => {
            localStorage.setItem("loginToken", token);
            res.header("access-token", token);
            res.status(200).json({
              "access-token": token,
              registeredEmail: adminObject.email,
              message: "Login Success",
              status: 200
            });
          });
        } else {
          res.status(401).json({ msg: "Login Failed", status: 401 });
        }
      })
      .catch(err => console.log(err.message));
  }
};

//-----add subject function-----------//
exports.addSubject = (req, res) => {
  jwt.verify(req.token, jwtSecret.jwtKey, (err, authData) => {
    if (err) {
      res.status(403).json("forbidden");
    } else {
      console.log(req.body);
      console.log(req.body.subjectDescription);

      const newSubject = {
        subject_title: req.body.subjectTitle,
        description: req.body.subjectDescription
      };
      new Subject(newSubject)
        .save()
        .then(newSubject => {
          res.status(200).json(newSubject);
        })
        .catch(err => {
          res.status(400).json(err);
        });
    }
  });
};

//-----------add chapter function---------------//
exports.addChapter = (req, res) => {
  //console.log(req.body)
  Subject.findOne({ subject_title: req.body.subjectTitle }).then(subject => {
    if (!subject) {
      res.status(404).json({ err: "No Subject found!!!" });
    }
    const newChapter = {
      subject_title: req.body.subjectTitle,
      chapterTitle: req.body.chapterTitle,
      description: req.body.chapterDescription,
      subject_id: subject._id
    };
    new Chapter(newChapter)
      .save()
      .then(chapter => {
        Chapter.findOne({ subject_title: req.body.subjectTitle })
          .then(chapter => {
            Subject.findOneAndUpdate({ subject_title: req.body.subjectTitle }, { $push: { Chapters: chapter._id } }, { new: true })
              .then(data => res.json(data))
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });
};

//------------add topics function---------------//
exports.addTopic = (req, res) => {
  console.log(req.body.topicTitle);
  Chapter.findOne({ chapterTitle: req.body.chapterTitle }).then(chapter => {
    if (!chapter) {
      res.status(404).json({ err: "No Chapter found" });
    }
    const newTopic = {
      title: req.body.chapterTitle,
      topic_title: req.body.topicTitle,
      description: req.body.topicDescription,
      chapter_id: chapter._id
    };
    new Topic(newTopic)
      .save()
      .then(topic => {
        Topic.findOne({ title: req.body.chapterTitle })
          .then(topic => {
            Chapter.findOneAndUpdate({ chapterTitle: req.body.chapterTitle }, { $push: { Topics: topic._id } }, { new: true })
              .then(data => res.json(data))
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });
};

//-----------------add pages function--------------------//
exports.addPage = (req, res) => {
  console.log(req.body.topicTitle);
  Topic.findOne({ topic_title: req.body.topicTitle }).then(topics => {
    if (!topics) {
      res.status(404).json({ err: "No Chapter found" });
    }
    const newPage = {
      page_type: req.body.page_type,
      topic_title: req.body.topicTitle,
      topic_id: topics._id,
      page_title: req.body.page_title
    };
    new Page(newPage)
      .save()
      .then(page => {
        Page.findOne({ page_title: req.body.title })
          .then(page => {
            Topic.findOneAndUpdate({ topic_title: req.body.topicTitle }, { $push: { Pages: page._id } }, { new: true })
              .then(data => res.json(data))
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });
};

//--------------------add sections function---------------//
exports.addSection = (req, res) => {
  console.log(req.body);
  //login is still needed to be implemented//
};

//----------------get all subjects in database--------------//
exports.getSubjects = (req, res) => {
  Subject.find()
    .then(kdsubjects => {
      res.status(200).json(kdsubjects);
    })
    .catch(err => {
      res.status(400).json(err);
    });
};
//----------------get all chapters in dataabse--------------//
exports.getChapters = (req, res) => {
  Chapter.find({ subject_title: req.params.subjecttitle })
    .then(chapters => {
      res.status(200).json(chapters);
    })
    .catch(err => {
      res.status(400).json(err);
    });
};
//---------------get all topics in the database------------//
exports.getTopics = (req, res) => {
  Topic.find({ title: req.params.chaptertitle })
    .then(topics => {
      res.status(200).json(topics);
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

exports.deleteSubject = (req,res)=> {
  Subject.remove({_id:req.params.subjectid})
  .then(()=> {
     res.status(200).json('Subject deleted successfully!!')
  }).catch((err)=> {
     res.status(400).json(err)
  })
}

exports.deleteChapter = (req,res)=> {
   Chapter.remove({_id:req.params.chapterid})
   .then(()=> {
      res.status(200).json('chapter deleted sucessfully!!')
   }).catch((err)=> {
       res.status(400).json(err)
   })
}

exports.deleteTopic = (req,res)=> {
   Topic.remove({_id:req.params.topicid})
   .then(()=> {
     res.status(200).json('topic deleted sucessfully!!')
   })
   .catch((err) => {
     res.status(400).json(err)
   })
}

exports.deletePage = (req,res)=> {
   Page.remove({_id:req.params.pageid})
   .then(() => {
      res.status(200).json('page is deleted sucessfully')
   }).catch((err) => {
        res.status(400).json(err)
   })
}

exports.deleteSection = (req,res)=> {
    Section.remove({_id:req.params.sectionid})
    .then(() => {
      res.status(200).json('section deleted sucessfully!!')
    }).catch((err) => {
      res.status(400).json(err)
    })
}