const bcrypt = require('bcryptjs');

const hashPass = (password) => {
  return bcrypt.hashSync(password, 10);
}

const comparePass = (inputPass, sourcePass) => {
  return bcrypt.compareSync(inputPass, sourcePass);
}

module.exports = {
  hashPass,
  comparePass
}