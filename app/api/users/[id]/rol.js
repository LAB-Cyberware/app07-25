import { connectDB } from "../../../mongoose"; 
import User from "../../../User";

/**
 * @param {object} req - El objeto de solicitud (NextApiRequest).
 * @param {object} res - El objeto de respuesta (NextApiResponse).
 */
export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (dbError) {
    console.error("Error al conectar a la base de datos:", dbError);
    return res.status(500).json({ error: 'Error interno del servidor al conectar a la base de datos.' });
  }

  const { id } = req.query;

  try {
    let users;

    if (id) {
      users = await User.findById(id);

      if (!users) {
        return res.status(404).json({ message: "Usuario no encontrado." });
      }
      return res.status(200).json(users);
    } else {
      users = await User.find({}).sort({ _id: -1 }).limit(100);
      return res.status(200).json(users);
    }
  } catch (e) {
    console.error("Error al obtener usuarios:", e);
    return res.status(500).json({ error: 'Error al obtener usuarios.' });
  }
}