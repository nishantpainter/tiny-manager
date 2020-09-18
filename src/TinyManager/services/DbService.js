import Dexie from "dexie";

const db = new Dexie("TinyManager");

function initateDB() {
  db.version(1).stores({
    projects: "++id,name",
  });

  db.version(1).stores({
    todos: "++id,title,completed",
  });

  db.projects.defineClass({ name: String, description: String });
  db.todos.defineClass({ title: String, completed: Boolean });
}

function getTable(tableName) {
  const table = db.table(tableName);
  return {
    name: table.name,
  };
}

function find(tableName, query) {
  return db[tableName].toArray();
}

function findOne() {}

function insert(tableName, record) {
  return db[tableName].add(record);
}

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
