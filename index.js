const contacts = require("./contacts");
const { program } = require("commander");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await contacts.listContacts();
      console.table(list);
      return list;

    case "get":
      const contact = await contacts.getContactById(id);
      console.log(contact);
      return contact;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.log(newContact);
      return newContact;

    case "remove":
      const deletedContact = await contacts.removeContact(id);
      console.log(deletedContact);
      return deletedContact;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");
program.parse(process.argv);

const argv = program.opts();
invokeAction(argv);
