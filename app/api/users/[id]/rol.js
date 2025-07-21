import { connectDB } from "../../../mongoose";

export default async function handler(req, res) {
  try {
    const client = await connectDB();
    const db = client.db("test");
    const users = await db
      .collection("users")
      .find({})
      .sort({ _id: -1 })
      .limit(100)
      .toArray();

    res.json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
}