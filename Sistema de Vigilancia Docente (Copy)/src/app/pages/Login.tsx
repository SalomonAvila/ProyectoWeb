import { useState } from 'react';
import { useNavigate } from 'react-router';
import { setCurrentUser, type User } from '../lib/mockData';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { glass, glassInput } from '../components/GlassEffects';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Determinar rol basado en el email (para simplificar el demo)
    let role: 'teacher' | 'coordinator' | 'admin' = 'teacher';
    if (email.includes('admin') || email.includes('administrador')) {
      role = 'admin';
    } else if (email.includes('coord') || email.includes('coordinador')) {
      role = 'coordinator';
    }
    
    const user: User = {
      id: 'user1',
      name: email.split('@')[0],
      email,
      role
    };
    
    setCurrentUser(user);
    
    if (role === 'teacher') {
      navigate('/teacher');
    } else if (role === 'coordinator') {
      navigate('/coordinator');
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="h-screen flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-md">
          {/* Glass login card */}
          <div className={`${glass} rounded-3xl sm:rounded-[2rem] p-6 sm:p-10 relative overflow-hidden`}>
            {/* Mirror shine */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-purple-500/8 rounded-full blur-3xl" />

            <div className="relative z-10">
              {/* Logo/Icon */}
              <div className="text-center mb-8 sm:mb-10">
                <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-4 sm:mb-6 shadow-xl shadow-blue-500/25">
                  <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-2 sm:mb-3 tracking-tight">
                  Bienvenido
                </h1>
                <p className="text-base sm:text-lg text-gray-500">
                  Sistema de Vigilancia Docente
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                    Correo Electrónico
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="correo@colegio.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`w-full px-4 py-3 sm:py-3.5 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ${glassInput} ${
                      email ? 'ring-2 ring-blue-300 shadow-lg shadow-blue-200/50 scale-[1.01]' : ''
                    }`}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className={`w-full px-4 py-3 sm:py-3.5 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-blue-400 pr-12 transition-all duration-300 ${glassInput} ${
                        password ? 'ring-2 ring-blue-300 shadow-lg shadow-blue-200/50 scale-[1.01]' : ''
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2.5 pt-2">
                  <div className="relative">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="sr-only peer"
                    />
                    <label 
                      htmlFor="remember" 
                      className="flex items-center justify-center w-6 h-6 rounded-lg border-2 border-gray-300 bg-white/50 cursor-pointer transition-all duration-300 ease-out
                        peer-checked:bg-gradient-to-br peer-checked:from-blue-500 peer-checked:to-cyan-400 peer-checked:border-blue-500 peer-checked:scale-110
                        hover:border-blue-300 hover:shadow-lg hover:shadow-blue-200/50
                        peer-focus:ring-2 peer-focus:ring-blue-400 peer-focus:ring-offset-2"
                    >
                      <svg 
                        className={`w-4 h-4 text-white transition-all duration-300 ${rememberMe ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                        fill="none" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="3" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    </label>
                  </div>
                  <label htmlFor="remember" className="text-sm font-medium text-gray-700 cursor-pointer select-none">
                    Recordar contraseña
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="w-full mt-6 sm:mt-8 py-3 sm:py-3.5 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-medium rounded-xl transition-all duration-200 shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/35 active:scale-95 active:shadow-lg hover:scale-[1.02]"
                >
                  Iniciar Sesión
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}