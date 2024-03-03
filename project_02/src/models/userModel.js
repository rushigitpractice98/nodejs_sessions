import { db } from "../../config.js/dbConfig";


const getUsers = async () => {
  try {
    const client = await db.connect();
    const result = await client.query("SELECT * FROM users");
    const users = result.rows;
    client.release();
    return users;
  } catch (err) {
    console.error("Error getting users from database", err);
    throw err;
  }
};

const getUserById = async (id) => {
  try {
    const client = await db.connect();
    const result = await client.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = result.rows[0];
    client.release();
    return user;
  } catch (err) {
    console.error("Error getting user by ID from database", err);
    throw err;
  }
};

const updateUser = async (id, userData) => {
  const { first_name, last_name, email, gender, job_title } = userData;
  try {
    const client = await db.connect();
    const result = await client.query(
      "UPDATE users SET first_name = $1, last_name = $2, email = $3, gender = $4, job_title = $5 WHERE id = $6 RETURNING *",
      [first_name, last_name, email, gender, job_title, id]
    );
    const updatedUser = result.rows[0];
    client.release();
    return updatedUser;
  } catch (err) {
    console.error("Error updating user in database", err);
    throw err;
  }
};

const deleteUser = async (id) => {
  try {
    const client = await db.connect();
    const result = await client.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    const deletedUser = result.rows[0];
    client.release();
    return deletedUser;
  } catch (err) {
    console.error("Error deleting user from database", err);
    throw err;
  }
};

export { getUsers, getUserById, updateUser, deleteUser };
