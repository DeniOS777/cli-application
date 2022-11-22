const fs = require('fs');
const path = require('path');
// const { nanoid } = require('nanoid');

const contactsPath = path.resolve('./db/contacts.json');

function listContacts() {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      return console.log('Not found contacts', error);
    }
    return console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      return console.log('Not found contacts', error);
    }
    const contacts = JSON.parse(data);
    return console.log(contacts.find(({ id }) => Number(id) === contactId));
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      return console.log('Not found contacts', error);
    }
    const contacts = JSON.parse(data);
    const restContacts = contacts.filter(({ id }) => Number(id) !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(restContacts), err => {
      if (err) throw err;
      console.table(restContacts);
      return console.log('The file has been saved!');
    });
  });
}

function addContact(name, email, phone) {
  const newContact = {
    id: '15',
    name,
    email,
    phone,
  };

  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      return console.log('Not found contacts', error);
    }
    const contacts = JSON.parse(data);

    fs.writeFile(
      contactsPath,
      JSON.stringify([...contacts, newContact]),
      err => {
        if (err) throw err;
        return console.log('The file has been saved!');
      }
    );
  });
}

const contactsActions = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

module.exports = contactsActions;
