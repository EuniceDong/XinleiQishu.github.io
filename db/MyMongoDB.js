import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

function MyMongoDB() {
  const myDB = {};
  const url = process.env.MOGO_URL || "mongodb://localhost:27017";
  const DB_NAME = "H&D_user";
  const COLLECTION_NAME = "user";
  const COLLECTION_NAME_CART = "shopping-cart";
  const COLLECTION_NAME_FOOD = "food-items";
  async function getCollection(colName) {
    const client = new MongoClient(url);

    await client.connect();

    const db = client.db(DB_NAME);
    return [client, db.collection(colName)];
  }

  myDB.authenticate = async (user) => {
    let client, col;
    try {
      [client, col] = await getCollection(COLLECTION_NAME);
      console.log("seraching for", user);
      // post request sends a form object that holds a input tag with name of user and a input tag with the name of password
      const res = await col.findOne({ user: user.user });
      console.log("res", res);

      return res !== null && bcrypt.compareSync(user.password, res.password);
    } finally {
      await client.close();
    }
  };
  myDB.signup = async (newUser) => {
    let client, col;
    try {
      [client, col] = await getCollection(COLLECTION_NAME);
      newUser.password = bcrypt.hashSync(
        newUser.password,
        bcrypt.genSaltSync()
      );
      [client, col] = await getCollection(COLLECTION_NAME_CART);
      delete newUser.password;
      newUser.cart = [];
      return await col.insertOne(newUser);
    } finally {
      await client.close();
    }
  };

  myDB.resetPass = async (resetUser) => {
    let client, col;
    try {
      [client, col] = await getCollection(COLLECTION_NAME);

      const res = await col.updateOne(
        { user: resetUser.user },
        {
          $set: {
            password: bcrypt.hashSync(resetUser.password, bcrypt.genSaltSync()),
          },
        }
      );
      console.log("reset res: ", res);
    } finally {
      await client.close();
    }
  };

  myDB.shoppingCartAdd = async (cart) => {
    let client, col;
    try {
      [client, col] = await getCollection(COLLECTION_NAME_CART);
      return await col.insertOne(cart);
    } finally {
      await client.close();
    }
  };

  return myDB;
}

export default MyMongoDB();
