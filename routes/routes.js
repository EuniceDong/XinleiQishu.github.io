import express from "express";

import myDB from "../db/MyMongoDB.js";

const router = express.Router();

router.post("/signin", async (req, res) => {
  console.log("POST signin");
  const user = req.body;
  console.log("signin user: ", user);

  if (await myDB.authenticate(user)) {
    // store user information in session, typically a user id
    req.session.user = user.user;

    // save the session before redirection to ensure page
    // load does not happen before session is saved
    req.session.save((err) => {
      if (err) return next(err);
      res.redirect("/?auth=true");
    });
  } else {
    res.redirect("/?auth=false");
  }
});

router.post("/signup", async (req, res) => {
  const user = req.body;
  console.log("create user", user);

  const newUser = {
    password: user.password,
    user: user.user,
  };

  const mongoRes = await myDB.signup(newUser);
  console.log("User created", mongoRes);

  res.redirect("/?msg=signedup");
});

router.post("/resetPass", async (req, res) => {
  const user = req.body;
  console.log("reseet user:%s password", user);

  if (req.session.user === null) {
    res.redirect("/?reset=false");
    return;
  }

  const resetUser = {
    user: req.session.user,
    password: user.password,
  };

  await myDB.resetPass(resetUser);
  res.redirect("/?reset=true");
});

/*Shopping cart update*/
// router.get("/shoppingCart", async (req, res) => {
//   const shoppingCart = req.body;
//   if (req.session.user === null) {
//     res.redirect("/?update=false");
//     return;
//   }
//   const updateCart = {
//   //   user: req.session.user,
//   //   password: user.password,
//   // };
//   // await myDB.resetPass(resetUser);
//   // res.redirect("/?reset=true");
// });

router.get("/getUser", (req, res) => {
  res.json({ user: req.session.user });
});

router.get("/signout", (req, res, next) => {
  // logout logic

  // clear the user from the session object and save.
  // this will ensure that re-using the old session id
  // does not have a logged in user
  req.session.user = null;
  req.session.save((err) => {
    if (err) next(err);

    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate((err) => {
      if (err) next(err);
      res.redirect("/?signout=true");
    });
  });
});

// router.get("/shoppingCartAdd", async (req, res) => {
//   const cart = {
//     user: req.session.user,
//   };

//   await myDB.shoppingCartAdd();
// });

export default router;
