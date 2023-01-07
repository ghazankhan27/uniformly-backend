// Import all dependencies

const validator = require("validator");
const db = require("../dbConn");

// ---- Functions ----

const addNewDepartment = async (req, res) => {
  try {
    const valid = !validator.isEmpty(req.body["name"]);

    if (!valid) throw new Error("Invalid Data Received");

    await db.none(
      `
      INSERT INTO 
      department (name)
      values ($<name>)
      `,
      { ...req.body }
    );

    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
};

const updateDepartment = async (req, res) => {
  console.log(req.body.id, req.body.name);
  try {
    const valid =
      !validator.isEmpty(req.body["id"]) &&
      !validator.isEmpty(req.body["name"]);

    if (!valid) throw new Error("Invalid Data Received");

    await db.none(
      `
      UPDATE department
      SET name = $<name>
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

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const valid = !validator.isEmpty(req.params["id"]);

    if (!valid) throw new Error("Invalid Data Received");

    await db.none(
      `
      DELETE FROM department
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

const getAllDepartments = async (req, res) => {
  try {
    const data = await db.many(
      `
      SELECT * FROM department
      ORDER BY id ASC
      `
    );

    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
};

module.exports = {
  addNewDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
};
