const express = require('express');
const router = express.Router();
const { getEvents, getEventById, createEvent, deleteEvent, rsvpEvent } = require('../controllers/eventController');
const { protect, organizer } = require('../middleware/authMiddleware');

router.route('/')
  .get(getEvents)
  .post(protect, organizer, createEvent);

router.route('/:id')
  .get(getEventById)
  .delete(protect, organizer, deleteEvent);

router.route('/:id/rsvp')
  .post(protect, rsvpEvent);

module.exports = router;
