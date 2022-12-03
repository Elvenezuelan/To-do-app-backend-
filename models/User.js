import bcrypt from "bcrypt";

class User {
  constructor(email) {
    this.email = email;
    this.passwordHash = this.setHash(password);
  }

  async hash(password) {
    return await bcrypt
      .hash(password, 5)
      .then((hash) => {
        console.log(hash);
        return hash;
      })
      .catch((err) => console.log(err));
  }
}

export default User;
