const handleSignIn = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if (password.length < 9 || !email || !password) {
    return res.status(400).json('incorrect form submission');
  }
  db.select('email', 'hash')
    .from('login')
    .where('email', '=', req.body.email)
    .then((data) => {
      bcrypt.compare(password, data[0].hash, (err, result) =>
        result
          ? db
              .select('*')
              .from('users')
              .where('email', '=', email)
              .then((user) => {
                res.json(user[0]);
              })
              .catch((error) => {
                res.status(400).json('unable to get user');
              })
          : res.status(400).json('wrong credentials')
      );
    })
    .catch((error) => {
      res.status(400).json('wrong credentials');
    });
};

export default { handleSignIn: handleSignIn };
