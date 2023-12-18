const bcrypt = require('bcryptjs');

const usersData = [
  {
    name: "John",
    surname: "Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("password123", 10),
    phone: 123456789
  },
  {
    name: "Jane",
    surname: "Smith",
    email: "jane@example.com",
    password: bcrypt.hashSync("secret456", 10),
    phone: 123456789
  }
];

module.exports = usersData;