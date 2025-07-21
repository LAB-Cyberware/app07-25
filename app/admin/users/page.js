'use client'

import { useState, useEffect } from 'react';

export default function UsersList() {
  const [users, setUsers] = useState([]); /* Los corchetes representan el estado inicial del "users",
  mientras que el "setUsers" representa el cambio de estado, en este caso, el estado inicial no contiene
  nada, ya que al momento de que se active "setUsers", este poseería la información de los usuarios. Por
  lo mismo no puede ser "null", ya que generaría errores. */
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { /* El controlador de eventos de React. */
    fetchUsers(); /* Llamado a la función fetchUsers. */
  }, []);

 const cambiarRolUser = (userId) => {
    setUsers(users.map(user => 
        user._id === userId 
            ? { ...user, rol: "user" }
            : user
    ));
};

const cambiarRolAdmin = (userId) => {
    setUsers(users.map(user => 
        user._id === userId 
            ? { ...user, rol: "admin" }
            : user
    ));
};

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users');
      
      if (!response.ok) {
        throw new Error('Error al cargar usuarios');
      }
      
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <p className="text-gray-600">Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 text-lg font-semibold mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={fetchUsers}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            Lista de Usuarios
          </h1>
          <p className="text-gray-600 mt-2">
            Total de usuarios: <span className="font-semibold">{users.length}</span>
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <div 
              key={user._id} 
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {user.name || user.rol || 'Sin nombre'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    ID: {user._id}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {user.email && (
                  <div className="flex items-center text-gray-600">
                    <span className="text-sm"> Email: {user.email}</span>
                  </div>
                )}

                {user.rol && (
                  <div className="inline-block">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.rol === 'admin' 
                        ? 'bg-red-100 text-red-800' 
                        : user.rol === 'moderador'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                     Rol: {user.rol} 
                    </span>
                  </div>
                )}
                
                {user.rol && (
                  <button onClick={() => cambiarRolUser(user._id)}>
                    Cambiar Rol a User
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {users.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No se encontraron usuarios
            </h3>
            <p className="text-gray-500">
              La base de datos no contiene usuarios en este momento.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
