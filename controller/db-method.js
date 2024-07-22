const mongoose = require("mongoose");
const userSchema = require("../modules/schema");
const bcrypt = require("bcrypt");

async function Register(req, res) {
  const { email, name, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
     await userSchema.create({ email: email,
         username: name,
          password: hashed });
  } catch (error) {
    console.log(error);
  }
  res.redirect('/login');
}


module.exports = Register;
