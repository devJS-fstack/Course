const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CoursesController {

    // GET /courses/:slug
    showDetail(req, res, next) {

        Course.findOne({ slug: req.params.slug })
            .then(function (course) {
                res.render('courses/showDetail', {
                    course: mongooseToObject(course),
                })
            })
            .catch(next);
    }

    // GET /courses/create

    create(req, res, next) {
        res.render('courses/createCourse')
    }

    // GET /courses/store

    store(req, res) {
        // res.send(req.body)
        const formData = req.body;
        formData.thumbnail = `https://img.youtube.com/vi/${req.body.videoId}/maxresdefault.jpg`;
        const formName = formData.name;
        // slug generator
        formData.slug = formName
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .toLowerCase()
            .split(" ")
            .join("-");
        Course.find({ slug: formData.slug })
            .then(() => {
                formData.slug = formData.slug + Math.floor(Math.random() * 9999)
                const course = new Course(formData)
                course.save().then(() => res.redirect(`/me/stored/courses`))
                    .catch((err) => { })
            }).catch((err) => { })
    }


    //// GET /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course),
            }))
            .catch(next);
    }

    // PUT /courses/:id
    update(req, res, next) {
        Course.updateOne({
            _id: req.params.id,
        }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // DELETE/ courses / :id

    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // PATCH/ courses / :id / restore
    restoreCourse(req, res, next) {
        Course.restore({
            _id: req.params.id,
        })
            .then(() => res.redirect('back'))
            .catch(next);

    }
    // DELETE/ courses / :id/force
    deleteForce(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

}


module.exports = new CoursesController();