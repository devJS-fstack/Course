const Course = require('../models/Course')
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // GET/ me/stored/courses

    storedCourses(req, res, next) {

        // Add promise to arr

        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([course, count]) => res.render('me/stored-courses',
                {
                    count,
                    course: mutipleMongooseToObject(course)
                }
            )
            )
            .catch(next);

    }

    // GET/me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({},)
            .then((course) => {
                res.render('me/trash-courses',
                    { course: mutipleMongooseToObject(course) });
            })
            .catch(next)
    }
}

module.exports = new MeController();