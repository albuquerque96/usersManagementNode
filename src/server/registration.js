/*



const updateUser = async (req, res) => {
 const { id,email, password } = req.body;
 const user = await User.findById(id);

 if (!user) {
   return res.status(404).json({ error: 'User not found' });
 }

 if (req.user.role !== 'admin' && req.user.id !== id) {
   return res.status(403).json({ error: 'Unauthorized' });
 }

User.findByIdAndUpdate(id,req.body)
}


*/