import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';
import { BubbleBackground } from './components/GlassEffects';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 relative">
      <BubbleBackground />
      <div className="relative z-10">
        <RouterProvider router={router} />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
