import React from 'react';
import { useProfile } from '../hooks/useProfile';
import { useAuth } from '../../auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar';

const Profile = () => {
  const { profile, loading, error } = useProfile();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleBackToBlog = () => {
    navigate('/blog/posts');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-lg">Cargando perfil...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Botón Volver al Blog - Diseño profesional */}
          <div className="mb-8">
            <button
              onClick={handleBackToBlog}
              className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:border-indigo-400 hover:text-indigo-600 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al Blog
            </button>
          </div>

          <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
            {/* Header con gradiente profesional */}
            <div className="px-8 py-6 bg-gradient-to-r from-indigo-600 to-purple-600">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">Perfil de Usuario</h1>
                  <p className="text-indigo-100">Información personal y detalles de tu cuenta</p>
                </div>
              </div>
            </div>
            
            {/* Contenido del perfil */}
            <div className="px-8 py-8">
              {profile && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Información Personal */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                      Información Personal
                    </h3>
                    <dl className="space-y-5">
                      <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                        <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Nombre completo</dt>
                        <dd className="text-lg text-gray-900 font-semibold">
                          {profile.name} {profile.paternal_lastname} {profile.maternal_lastname}
                        </dd>
                      </div>
                      <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                        <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Email</dt>
                        <dd className="text-lg text-gray-900 font-semibold">{profile.email}</dd>
                      </div>
                      <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                        <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Nombre de usuario</dt>
                        <dd className="text-lg text-gray-900 font-semibold">{profile.user_name}</dd>
                      </div>
                      <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                        <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Teléfono</dt>
                        <dd className="text-lg text-gray-900 font-semibold">{profile.phone}</dd>
                      </div>
                    </dl>
                  </div>
                  
                  {/* Información Adicional */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                      Información Adicional
                    </h3>
                    <dl className="space-y-5">
                      <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                        <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Rol</dt>
                        <dd className="text-lg text-gray-900 font-semibold">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                            {profile.role?.name}
                          </span>
                        </dd>
                      </div>
                      <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                        <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">País</dt>
                        <dd className="text-lg text-gray-900 font-semibold">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                            {profile.country?.name}
                          </span>
                        </dd>
                      </div>
                      <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                        <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">ID de usuario</dt>
                        <dd className="text-lg text-gray-900 font-semibold">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 border border-purple-200">
                            #{profile.id}
                          </span>
                        </dd>
                      </div>
                      <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                        <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Estado</dt>
                        <dd className="text-lg text-gray-900 font-semibold">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                            ✅ Cuenta Activa
                          </span>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;