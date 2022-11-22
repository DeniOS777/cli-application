const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve('./db/contacts.json');

function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      return console.log('Not found contacts', err);
    }
    return console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      return console.log('Not found contacts', err);
    }
    const contacts = JSON.parse(data);
    return console.log(contacts.find(({ id }) => id === contactId));
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      return console.log('Not found contacts', err);
    }
    const contacts = JSON.parse(data);
    const restContacts = contacts.filter(({ id }) => id !== contactId);

    const payload = JSON.stringify(restContacts);

    fs.writeFile(contactsPath, payload, err => {
      if (err) throw err;
      console.table(restContacts);
      return console.log('The file has been saved!');
    });
  });
}

function addContact(name, email, phone) {
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      return console.log('Not found contacts', err);
    }
    const contacts = JSON.parse(data);

    const payload = JSON.stringify([...contacts, newContact]);

    fs.writeFile(contactsPath, payload, err => {
      if (err) throw err;
      console.table(JSON.parse(payload));
      return console.log('The file has been saved!');
    });
  });
}

const contactsActions = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

module.exports = contactsActions;
