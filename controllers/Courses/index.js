const Course = require("../../models/courses/course").model;
const Subject = require("../../models/courses/subject").model;
const Chapter = require("../../models/courses/chapter").model;

exports.addCourse = (req, res) => {
  //here need to write joi validation check for req.body
  const { CourseTitle, Created_by, Description, Video_link } = req.body;
  const newCourse = {
    CourseTitle,
    Created_by,
    Description,
    Video_link
  };
  new Course(newCourse)
    .save()
    .then(newcourse => {
      res.status(200).json({ ...newcourse._doc, message: "Course Added Successfully", status: 200 });
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

exports.addSubject = (req, res) => {
  Course.findOne({ CourseTitle: req.body.CourseTitle }).then(course => {
    if (!course) {
      res.status(404).json({ message: "No such course found!!!", status: 404 });
    }
    const { SubjectTitle, Description, CourseTitle } = req.body;

    const newSubject = {
      courseId: course._id,
      SubjectTitle,
      Description,
      CourseTitle
    };
    new Subject(newSubject)
      .save()
      .then(subject => {
        Subject.findOne({ CourseTitle })
          .then(subject => {
            Course.findOneAndUpdate({ CourseTitle: req.body.CourseTitle }, { $push: { Subjects: subject._id } }, { new: true })
              .then(data => res.json(data))
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });
};

exports.addChapter = (req, res) => {
  Subject.findOne({ SubjectTitle: req.body.SubjectTitle }).then(subject => {
    if (!subject) {
      res.status(400).json("No subject found!!");
    }
    const newChapter = {
      subjectTitle: req.body.subjectTitle,
      chapterTitle: req.body.chapterTitle,
      description: req.body.chapterDescription,
      subjectId: subject._id
    };
    new Chapter(newChapter)
      .save()
      .then(chapter => {
        Chapter.findOne({ subjectTitle: req.body.subjectTitle })
          .then(chapter => {
            Subject.findOneAndUpdate({ subjectTitle: req.body.subjectTitle }, { $push: { Chapters: chapter._id } }, { new: true })
              .then(data => res.json(data))
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });
};

exports.addTopic = (req, res) => {
  Chapter.findOne({ chapterTitle: req.body.chapterTitle }).then(chapter => {
    if (!chapter) {
      res.status(400).json("no chapter found");
    }
    const newTopic = {
      topicTitle: req.body.topicTitle,
      chapterId: chapter._id,
      Description: req.body.Description
    };
    new Topic(newTopic)
      .save()
      .then(topic => {
        Topic.findOne({ topictitle: req.body.chapterTitle })
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
