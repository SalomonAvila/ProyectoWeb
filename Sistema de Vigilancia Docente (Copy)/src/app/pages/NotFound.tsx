import { useNavigate } from 'react-router';
import { Home } from 'lucide-react';
import { glass, glassHover } from '../components/GlassEffects';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className={`text-center max-w-md ${glass} rounded-3xl p-10 relative overflow-hidden`}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="text-8xl font-semibold text-gray-300/60 mb-6">404</div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-3">Página no encontrada</h1>
          <p className="text-gray-600 mb-10">
            La página que buscas no existe o ha sido movida.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-medium rounded-2xl transition-all inline-flex items-center gap-3 shadow-xl shadow-blue-500/25"
          >
            <Home className="w-5 h-5" />
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}
