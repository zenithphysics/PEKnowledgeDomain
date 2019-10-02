const router = require('express').Router()
const bodyParser = require('body-parser')
const Subject = require('../models/kdsubject')
const Chapter = require('../models/kdchapter')
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())



router.get('/' , (req,res)=> {
   res.send('this is the admin page!!!')
})

router.post('/addsubject' , (req,res)=> {
   console.log(req.body)
    // console.log(req.body.subjectDescription)

     const newSubject = {
        title:req.body.subjectTitle,
        description:req.body.subjectDescription
     }
     new Subject(newSubject).save().then((newSubject)=> {
            res.status(200).json(newSubject)
     }).catch((err)=> {
        res.status(400).json(err)
     })
})

router.post('/addchapters' , (req,res)=> {
        //console.log(req.body)
        Subject.findOne({title:req.body.subjectTitle})
        .then(subject=> {
         if (!subject) {
            res.status(404).json({ err: "No Subject found!!!" });
        }
        const newChapter = {
         title:req.body.subjectTitle,
         chapterTitle:req.body.chapterTitle,
         description:req.body.chapterDescription,
         subject_id:subject._id
        }
        new Chapter(newChapter).save()
        .then(chapter=> {
           Chapter.findOne({title:req.body.subjectTitle})
           .then(chapter=> {
              Subject.findOneAndUpdate({title:req.body.subjectTitle},{$push: { Chapters: chapter._id }},{ new: true} )
              .then(data => res.json(data))
                            .catch(err => console.log(err));
           })
           .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
        })
  })




module.exports = router