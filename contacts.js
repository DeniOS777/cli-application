const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    return console.table(JSON.parse(contacts));
  } catch (err) {
    return console.log('Not found contacts', err);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contactById = contacts.find(contact => contact.id === contactId);
    return console.log(contactById);
  } catch (err) {
    return console.log('Not found contacts', err);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const restContacts = contacts.filter(({ id }) => id !== contactId);
    const payload = JSON.stringify(restContacts);
    await fs.writeFile(contactsPath, payload);
    return console.table(restContacts);
  } catch (err) {
    return console.log('Not found contacts', err);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContacts = JSON.stringify([...contacts, newContact]);
    await fs.writeFile(contactsPath, newContacts);
    return console.table(JSON.parse(newContacts));
  } catch (err) {
    return console.log('Not found contacts', err);
  }
}

const contactsActions = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

module.exports = contactsActions;
