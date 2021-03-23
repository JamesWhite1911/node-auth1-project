const db = require("../../data/db-config");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

/**
  resolves to an ARRAY with all users, each user having { user_id, username }
 */
function find() {
  return db("users").select("id", "username").orderBy("id") //return users' id and username, ordered by id
}

/**
  resolves to an ARRAY with all users that match the filter condition
 */
function findBy(filter) {
  return db("users").where(filter).orderBy("id") //pass in a filter, return a filtered list of users, ordered by id
}

/**
  resolves to the user { user_id, username } with the given user_id
 */
function findById(user_id) {
  return db("users").where({ user_id }).first(); //pass in a user's id, return the first user with that id
}

/**
  resolves to the newly inserted user { user_id, username }
 */
async function add(user) { //user is { username, password } from req.body
const [id] = await db("users").insert(user, "id")
  return findById(id)
}

// Don't forget to add these to the `exports` object so they can be required in other modules
