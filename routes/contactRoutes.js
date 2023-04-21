const express = require('express');
const router = express.Router();

const { getContacts, createContacts, getContact, updateContacts, deleteContacts } = require('../controllers/contactControllers');
const validateToken = require('../middleware/validateTokenHandler')

router.use(validateToken);


// http://localhost:5000/api/contacts
router.get(('/'), getContacts);

// http://localhost:5000/api/contacts
router.post('/', createContacts);

// http://localhost:5000/api/contacts/643f7f606d7cce14083d428c
router.get('/:id', getContact);

// http://localhost:5000/api/contacts/643f7f606d7cce14083d428c
router.patch('/:id', updateContacts);

// http://localhost:5000/api/contacts/643f7f606d7cce14083d428c
router.delete('/:id', deleteContacts);

module.exports = router;