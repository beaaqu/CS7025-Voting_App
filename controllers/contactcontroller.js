const { addLog, getLogs } = require('./logController');

const contacts = [];

exports.submitContact = (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({
        message: 'Name and message are required'
      });
    }

    const newContact = {
      id: contacts.length + 1,
      name,
      email: email || null,
      subject: subject || null,
      message,
      createdAt: new Date()
    };

    contacts.push(newContact);

    addLog('contact_submitted', {
      contactId: newContact.id,
      name: newContact.name,
      email: newContact.email
    });

    return res.status(201).json({
      message: 'Contact submitted successfully',
      data: newContact
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Server error'
    });
  }
};

exports.getContacts = (req, res) => {
  try {
    return res.status(200).json(contacts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Server error'
    });
  }
};

exports.getActivityLogs = (req, res) => {
  try {
    return res.status(200).json(getLogs());
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Server error'
    });
  }
};
