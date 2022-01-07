const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:id/edit', courseController.edit);
router.put('/:id/', courseController.update);
router.patch('/:id/restore', courseController.restoreCourse);
router.delete('/:id/', courseController.delete);
router.delete('/:id/force', courseController.deleteForce);
router.get('/:slug', courseController.showDetail);

module.exports = router;