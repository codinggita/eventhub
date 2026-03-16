const { body, validationResult } = require('express-validator');

// Shared: run validators then return errors or continue
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
  }
  next();
};

// ── Auth validators ──────────────────────────────────────────────
const registerRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['student', 'organizer']).withMessage('Role must be student or organizer'),
  handleValidation,
];

const loginRules = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidation,
];

// ── Event validators ─────────────────────────────────────────────
const eventRules = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('date').notEmpty().withMessage('Date is required'),
  body('time').trim().notEmpty().withMessage('Time is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('category').isIn(['hackathon', 'workshop', 'seminar', 'cultural', 'tech', 'design', 'coding', 'sports', 'E-sports', 'other'])
    .withMessage('Invalid category'),
  body('totalSeats').isInt({ min: 1 }).withMessage('Total seats must be at least 1'),
  handleValidation,
];

module.exports = { registerRules, loginRules, eventRules };
