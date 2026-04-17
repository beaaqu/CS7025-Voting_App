const express = require('express');
const router = express.Router();

const {
  submitContact,
  getContacts,
  getActivityLogs
} = require('../controllers/contactController');

router.post('/contact', submitContact);
router.get('/contact', getContacts);
router.get('/contact/logs', getActivityLogs);

module.exports = router;
