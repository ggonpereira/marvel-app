<h1 align="center" style="padding-top: 20px">Marvel App 🤗</h1>

<p align="center">
  <img alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/ggonpereira/marvel-app" />
  <img alt="GitHub Top Language" src="https://img.shields.io/github/languages/top/ggonpereira/marvel-app" />
  <img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/ggonpereira/marvel-app" />
  <img alt="Github Star" src="https://img.shields.io/github/stars/ggonpereira/marvel-app?style=social" />
</p>

---

<h2>About 📝</h2>

<p align="center">A project created using ReactJS, NodeJS, Sequelize ORM, JWT and SCSS. Basically it's a application where you can register and login, edit your informations, search for Marvel comics and characters and favorite/disfavor them. Also you can search all favorited content in the "Favorites" page! 👊🏼</p>

---

<h2>Technologies 🚀</h2>

- [JavaScript](https://www.javascript.com/)
- [MySQL](https://www.mysql.com/)
- [NodeJS](https://nodejs.org/en//)
- [Express](https://expressjs.com/pt-br/)
- [React](https://pt-br.reactjs.org/)
- [Sequelize](https://sequelize.org/)
- [JWT](https://jwt.io/)

---

<h2>Learning 📚</h2>

<p align="center">This was the most challenging project I've made until now. I learned A LOT doing this and could explore much contents and technologies. I could put in practice what I'm studying in React, Node, ORMs, DBs, JWT for authorization and much more! 🙌🏼</p>

---

<h2>Installation 👨‍💻</h2>

### Before you can start, you have to install this tools in your machine:

- <b>[Git](https://git-scm.com)</b>
- <b>[MySQL](https://www.mysql.com)</b>
- <b>[NodeJS](https://nodejs.org/)</b>

### Then:

```
- Clone the repository:
$ git clone https://github.com/ggonpereira/marvel-app.git

- Then access the directory:
$ cd marvel-app

- Now you'll have to create a new database (I recommend this name: "marvel-app")

- Now you can rename the file called ".env.example" to ".env" and change the informations (except the infos before "=") to your DB infos

- And go to "server/src/models/" and remove the comment where says "_____.sync({ force: true });" from "Favorite.js" and "User.js"

- Then, type:
$ npm i

- And:
$ npm start

- When the server is started you can comment again the lines you've removed the comment before and restart the server

-

- Now to start the front-end app, firstly you have to go into "marvel-app/client/src/api.js" and change the line of code saying:

- baseURL: "https://fullstack-marvel-app.herokuapp.com/",
to
- baseURL: "http://localhost:3001",

- Finally you can go back into marvel-app/client and type

$ yarn start

(if you don't have Yarn installed, please install here "https://yarnpkg.com/")

- And finally, access: http://localhost:3000 (if the yarn hasn't accessed to you)
```

---

> This project was developed with the ❤️ by **[@Gabriel G. Pereira](https://www.linkedin.com/in/gabriel-gonçalves-pereira/)**.<br>
> If it was helpful for you or I could inspire you to create your own project, give me a ⭐! 😉
