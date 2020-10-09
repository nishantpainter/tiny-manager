import Dexie from "dexie";

const db = new Dexie("TinyManager");

function initateDB() {
  db.version(1).stores({
    projects: "++id,name",
  });

  db.version(1).stores({
    todos: "++id,title,completed",
  });

  db.version(1).stores({
    tasks: "++id,title,projectId",
  });

  db.version(1).stores({
    updates: "++id,description,projectId,taskId,createdAt",
  });

  db.projects.defineClass({ name: String, description: String });
  db.todos.defineClass({ title: String, completed: Boolean });
  db.tasks.defineClass({
    title: String,
    note: String,
    priority: Number,
    progress: Number,
    projectId: Number,
  });
  db.updates.defineClass({
    description: String,
    projectId: Number,
    taskId: Number,
    createdAt: String,
  });
}

function getTable(tableName) {
  const table = db.table(tableName);
  return {
    name: table.name,
  };
}

async function find(tableName, query = {}) {
  const { where } = query;

  let table = db[tableName];

  if (where) {
    table = table.where(where);
  }

  return table.reverse().toArray();
}

function findOne(tableName, query) {
  return db[tableName].get(query);
}

function insert(tableName, record) {
  return db[tableName]
    .add(record)
    .then((recordId) => findOne(tableName, recordId));
}

function update(tableName, record) {
  return db[tableName].update(record.id, record).then((updateCount) => {
    if (updateCount) {
      return findOne(tableName, record.id);
    } else {
      return new Error("Error updating record");
    }
  });
}

function remove(tableName, record) {
  return db[tableName].delete(record.id);
}

initateDB();

export default {
  find,
  findOne,
  insert,
  update,
  remove,
  getTable,
};
