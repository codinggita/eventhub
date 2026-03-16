const express = require('express');
const router = express.Router();
const { getEvents, getEventById, createEvent, updateEvent, deleteEvent, rsvpEvent } = require('../controllers/eventController');
const { protect, organizer } = require('../middleware/authMiddleware');
const { eventRules } = require('../middleware/validate');

router.route('/')
  .get(getEvents)
  .post(protect, organizer, eventRules, createEvent);

router.route('/:id')
  .get(getEventById)
  .put(protect, organizer, eventRules, updateEvent)
  .delete(protect, organizer, deleteEvent);

router.route('/:id/rsvp')
  .post(protect, rsvpEvent);

module.exports = router;
