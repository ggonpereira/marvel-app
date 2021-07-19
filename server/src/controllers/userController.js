const User = require("../models/User");
const bcrypt = require("bcrypt");

const { createTokens } = require("../utils/JWT");

exports.registerUser = async (req, res) => {
  const datas = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  // Verify if the user exists, if exist, then will return a error, if not will register in db
  const user = await User.findOne({
    where: {
      email: datas.email,
    },
  });
  if (!user) {
    if (datas.username && datas.email && datas.password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(datas.password, salt);

      User.create({
        username: datas.username,
        email: datas.email,
        password: hash,
      })
        .then(() => res.send({ userCreated: true }))
        .catch((err) => res.json({ message: err }));
    } else {
      res.send({ message: "Preencha todos os campos!" });
    }
  } else {
    res.send({ message: "Um usuário com esse e-mail já foi cadastrado" });
  }
};

exports.loginUser = async (req, res) => {
  const datas = {
    email: req.body.email,
    password: req.body.password,
  };

  const user = await User.findOne({
    where: {
      email: datas.email,
    },
  });

  if (datas.email && datas.password && user) {
    const correctPw = bcrypt.compareSync(datas.password, user.password);
    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    if (correctPw) {
      const accessToken = createTokens(user);

      res.json({ auth: true, token: accessToken, userData });
    } else {
      res.json({
        auth: false,
        message: "O e-mail ou senha inseridos estão incorretos.",
      });
    }
  } else {
    res.json({ auth: false, message: "Nenhum usuário encontrado." });
  }
};

exports.editUser = async (req, res) => {
  const datas = {
    userId: req.body.userId,
    newUsername: req.body.newUsername,
    newEmail: req.body.newEmail,
    newPassword: req.body.newPassword,
  };

  const user = await User.findByPk(datas.userId);

  if (user) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(datas.newPassword, salt);

    // This makes optional the change of more than one user data
    user
      .update({
        username: datas.newUsername ? datas.newUsername : user.username,
        email: datas.newEmail ? datas.newEmail : user.email,
        password: datas.newPassword ? hash : user.password,
      })
      .then(() => {
        const userData = {
          id: datas.userId,
          username: datas.newUsername ? datas.newUsername : user.username,
          email: datas.newEmail ? datas.newEmail : user.email,
        };

        res.send(userData);
      })
      .catch((err) => {
        res.json({ message: err });
      });
  } else {
    res.json({ message: "Não encontramos o usuário" });
  }
};
