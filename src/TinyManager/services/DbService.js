import Dexie from "dexie";

const db = new Dexie("TinyManager");

function initateDB() {
  db.version(1).stores({
    projects: "++id,name",
  });

  db.projects.defineClass({ name: String, description: String });
}

function getTable(tableName) {
  const table = db.table(tableName);
  return {
    name: table.name,
  };
}

function find() {}

function findOne() {}

function insert() {}

function update() {}

function remove() {}

initateDB();

export default {
  find,
  findOne,
  insert,
  update,
  remove,
  getTable,
};
