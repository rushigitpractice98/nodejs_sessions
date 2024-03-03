import { deleteUser, getUserById, getUsers, updateUser } from "../models/userModel";

const getAllUsers = async (req, res) => {
    try {
      const users = await getUsers();
      res.json(users);
    } catch (err) {
      console.error('Error getting users', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  const getUser = async (req, res) => {
    const id = Number(req.params.id);
    try {
      const user = await getUserById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      console.error('Error getting user', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const updateUserById = async (req, res) => {
    const id = Number(req.params.id);
    const userData = req.body;
    try {
      const updatedUser = await updateUser(id, userData);
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(updatedUser);
    } catch (err) {
      console.error('Error updating user', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  const deleteUserById = async (req, res) => {
    const id = Number(req.params.id);
    try {
      const deletedUser = await deleteUser(id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ status: `Deleted user:${id}` });
    } catch (err) {
      console.error('Error deleting user', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export { getAllUsers, getUser, updateUserById, deleteUserById };