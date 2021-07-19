const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();

function createTokens(user) {
  const accessToken = sign(
    { id: user.id, username: user.username },
    process.env.SECRET_PHRASE,
    {
      expiresIn: "9999 years",
    }
  );
  return accessToken;
}

const validateToken = async (req, res, next) => {
  const receivedToken = await req.body.token;

  if (receivedToken !== "") {
    const parsedToken = await JSON.parse(receivedToken);

    if (!parsedToken) {
      return res.send("Precisamos de um token.");
    }

    try {
      const tokenIsValid = verify(parsedToken, process.env.SECRET_PHRASE);

      if (tokenIsValid) {
        return next();
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
};

module.exports = { createTokens, validateToken };
