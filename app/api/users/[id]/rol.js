export default async function handler(req, res) {
  const { id } = req.query
  const { nuevoRol } = req.body
  
  // Actualizar rol en base de datos
  await actualizarRolUsuario(id, nuevoRol)
  
  res.json({ success: true })
}