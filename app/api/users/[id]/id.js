export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    const { id } = req.query;
    const { rol } = req.body;

    try {
      await User.findByIdAndUpdate(id, { rol });
      
      res.status(200).json({ message: 'Rol actualizado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar rol' });
    }
  }
}