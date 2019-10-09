const router = require('express').Router()
const bodyParser = require('body-parser')
const Course = require('../models/courses/course').model
const Subject = require('../models/courses/subject').model
const Chapter = require('../models/courses/chapter').model
const mongoose= require('mongoose')



//-----------------add course post route ----------//
router.post('/addcourse' , (req,res)=> {

    console.log(req.body)
          const newCourse = {
              CourseTitle:req.body.CourseTitle,
              created_by:req.body.created_by,
              Description:req.body.Description,
              video_link:req.body.video_link,

          }
          new Course(newCourse).save()
          .then((newcourse)=> {
                res.status(200).json(newcourse)
          })
          .catch((err)=> {
                res.status(400).json(err)  
          })
          
})

//---------------add subjects post router -----------------//
router.post('/addsubject' , (req,res)=> {
           Course.findOne({CourseTitle:req.body.CourseTitle})
           .then((course)=> {
            if (!course) {
                res.status(404).json({ err: "No course found!!!" });
              }
              
              const newSubject = {
                courseId:course._id,
                SubjectTitle:req.body.SubjectTitle,
                Description:req.body.Description,
                CourseTitle:req.body.CourseTitle,
                
              }
              new Subject(newSubject).save()
              .then((subject)=> {
                   Subject.findOne({CourseTitle:req.body.CourseTitle})
                   .then((subject)=> {
                         Course.findOneAndUpdate({ CourseTitle: req.body.CourseTitle }, { $push: { Subjects: subject._id } }, { new: true })
                         .then(data => res.json(data))
                         .catch(err => console.log(err));
                   })
                   .catch(err => console.log(err));
              })
              .catch(err => console.log(err));
           })
})

//----------add chapter post route--------------------//
router.get('/addchapter' , (req,res)=> {
   Subject.findOne({SubjectTitle:req.body.SubjectTitle})
   .then((subject)=> {
              if(!subject) {
                  res.status(400).json('No subject found!!')
              }
              const newChapter = {
                subjectTitle: req.body.subjectTitle,
                chapterTitle: req.body.chapterTitle,
                description: req.body.chapterDescription,
                subjectId: subject._id
              }
              new Chapter(newChapter).save()
              .then((chapter)=> {
                       Chapter.findOne({subjectTitle:req.body.subjectTitle})
                       .then((chapter)=> {
                        Subject.findOneAndUpdate({ subjectTitle: req.body.subjectTitle }, { $push: { Chapters: chapter._id } }, { new: true })
                        .then(data => res.json(data))
                        .catch(err => console.log(err));
                       })
                       .catch(err => console.log(err));
              })
              .catch(err => console.log(err));
   })
})

//-----------------add topic post route --------------//
 router.post('/addtopic' , (req,res)=> {
     Chapter.findOne({chapterTitle:req.body.chapterTitle})
     .then((chapter)=> {
                 if(!chapter){
                     res.status(400).json('no chapter found')
                 }
                 const newTopic = {
                    topicTitle:req.body.topicTitle,
                    chapterId:chapter._id,
                    Description:req.body.Description,
                }
              new Topic(newTopic).save()
              .then((topic)=> {
                Topic.findOne({ topictitle: req.body.chapterTitle })
                .then((topic)=> {
                    Chapter.findOneAndUpdate({ chapterTitle: req.body.chapterTitle }, { $push: { Topics: topic._id } }, { new: true })
                    .then(data => res.json(data))
              .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
              })
              .catch(err => console.log(err));
     })
 })

module.exports = router