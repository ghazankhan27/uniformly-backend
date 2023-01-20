// Import all dependencies

const validator = require("validator");
const db = require("../dbConn");

// ---- Functions ----

const getUniversityById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await db.one(
      `
      SELECT * FROM university u
      WHERE id = $<id>
      `,
      { id }
    );

    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
};

const addNewUniversity = async (req, res) => {
  try {
    const valid =
      !validator.isEmpty(req.body["name"]) &&
      !validator.isEmpty(req.body["address"]) &&
      !validator.isEmpty(req.body["departments"]) &&
      !validator.isEmpty(req.body["contact"]) &&
      validator.isEmail(req.body["contact"]);

    if (!valid) throw new Error("Invalid Data Received");

    await db.none(
      `
      INSERT INTO 
      university (name,  address, contact, image, departments)
      values ($<name>, $<address>, $<contact>, $<image>, $<departments>)
      `,
      { ...req.body, image: req.file.path }
    );

    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
};

const updateUniversity = async (req, res) => {
  try {
    const valid =
      !validator.isEmpty(req.body["id"]) &&
      !validator.isEmpty(req.body["name"]) &&
      !validator.isEmpty(req.body["departments"]) &&
      !validator.isEmpty(req.body["address"]) &&
      !validator.isEmpty(req.body["contact"]) &&
      validator.isEmail(req.body["contact"]);

    if (!valid) throw new Error("Invalid Data Received");

    await db.none(
      `
      UPDATE university
      SET name = $<name>, departments = $<departments>, address = $<address>, contact = $<contact>
      WHERE id = $<id> 
      `,
      req.body
    );

    return res.sendStatus(204);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
};

const deleteUniversity = async (req, res) => {
  try {
    const { id } = req.params;

    const valid = !validator.isEmpty(req.params["id"]);

    if (!valid) throw new Error("Invalid Data Received");

    await db.none(
      `
      DELETE FROM university
      WHERE id = $<id> 
      `,
      { id: id }
    );

    return res.sendStatus(204);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
};

const getAllUniversities = async (req, res) => {
  try {
    const data = await db.many(
      `
      SELECT * FROM university u
      ORDER BY id
      `
    );

    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
};

module.exports = {
  addNewUniversity,
  getAllUniversities,
  updateUniversity,
  deleteUniversity,
  getUniversityById,
};
