const users = require("../utils/users");

const login = (req, res) => {
  const { email, password } = req.query;

  const userFound = users.find(
    (user) => user.email === email && user.password === password
  );

  return userFound
    ? res.status(200).json({ access: true })
    : res.status(404).json({ access: false });
};

module.exports = login;

// const usersArray = require("../utils/users");

// const login = (req, res) => {
//   const { email, password } = req.query;
//   let access = true;

//   usersArray.forEach((user) => {
//     if (user.email === email && user.password === password) {
//       access = true;
//     }
//   });

//   return res.status(200).json({ access });

//   //   const match = usersArray.filter((user) => {
//   //     return user.email === email && user.password === password;
//   //   });
//   //   if (match.length > 0) {
//   //     access = true;
//   //     return res.status(200).json({ access });
//   //   }
//   //   //   else {
//   //   //     return res.status(400).json({ access });
//   //   //   }
// };

// module.exports = login;
