const express = require('express');
const router = express.Router();

// password validation function
function isValidPassword(password) {
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isLongEnough = password.length >= 8;

  return hasLetter && hasNumber && isLongEnough;
}

router.post('/secure/register', (req, res) => {
  const { username, password } = req.body;

  if (!isValidPassword(password)) {
    return res.status(400).json({
      message: 'Password must be at least 8 characters and include letters and numbers'
    });
  }

  res.json({
    message: 'Password is valid (demo success)'
  });
});

module.exports = router;
