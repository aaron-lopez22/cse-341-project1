const mongodb = require("../data/database");

const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
     //#swagger.tags = ['Users']
  const result = await mongodb.getDatabase().collection("users").find();
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  });
};

const getSingle = async (req, res) => {
    //#swagger.tags = ['Users']
  const userId = ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .collection("users")
    .find({ _id: userId });
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users[0]);
  });
};

const createUser = async (req, res) => {
     //#swagger.tags = ['Users']
  const user = {
    email: req.body.email,
    username: req.body.username,
    name: req.body.name,
    ipaddress: req.body.ipaddress,
  };
  const response = await mongodb
    .getDatabase()
    .collection("users")
    .insertOne(user);
  if (response.acknowledged) {
    res.status(201).json({ message: "User created successfully!" });
  } else {
    res.status(500).json({ message: "Error creating user!" });
  }
};

const updateUser = async (req, res) => {
     //#swagger.tags = ['Users']
  const userId = ObjectId(req.params.id);
  const user = {
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    ipaddress: req.body.ipaddress,
  };
  const response = await mongodb
    .getDatabase()
    .collection("users")
    .replaceOne({ _id: userId }, user);
  if (response.modifiedCount > 0) {
    res.status(200).json({ message: "User updated successfully!" });
  } else {
    res.status(500).json({ message: "Error updating user!" });
  }
};

const deleteUser = async (req, res) => {
     //#swagger.tags = ['Users']
  const userId = ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .collection("users")
    .deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(200).json({ message: "User deleted successfully!" });
  } else {
    res.status(500).json({ message: "Error deleting user!" });
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
