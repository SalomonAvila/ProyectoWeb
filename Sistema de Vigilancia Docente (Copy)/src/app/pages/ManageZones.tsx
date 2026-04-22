import { toast } from 'sonner';
import { useState } from 'react';
import { glass, glassHover, glassNav } from '../components/GlassEffects';
import { useNavigate } from 'react-router';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { mockZones, type Zone } from '../lib/mockData';
import { ArrowLeft, Plus, Edit, Trash2, QrCode } from 'lucide-react';

export function ManageZones() {
  const navigate = useNavigate();
  const [zones, setZones] = useState<Zone[]>(mockZones);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingZone, setEditingZone] = useState<Zone | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    checkpoints: ''
  });

  const handleAdd = () => {
    if (!formData.name || !formData.description) {
      toast.error('Completa los campos requeridos');
      return;
    }

    const newZone: Zone = {
      id: `z${zones.length + 1}`,
      name: formData.name,
      description: formData.description,
      checkpoints: formData.checkpoints.split(',').map(c => c.trim()).filter(c => c),
      qrCode: `QR_${formData.name.toUpperCase().replace(/\s/g, '_')}`,
      isActive: true,
      capacity: 50,
      riskLevel: 'low'
    };

    setZones([...zones, newZone]);
    setIsAddDialogOpen(false);
    setFormData({ name: '', description: '', checkpoints: '' });
    toast.success('Zona agregada exitosamente');
  };

  const handleEdit = (zone: Zone) => {
    setEditingZone(zone);
    setFormData({
      name: zone.name,
      description: zone.description,
      checkpoints: zone.checkpoints.join(', ')
    });
  };

  const handleUpdate = () => {
    if (!editingZone) return;

    const updatedZones = zones.map(z => 
      z.id === editingZone.id 
        ? {
            ...z,
            name: formData.name,
            description: formData.description,
            checkpoints: formData.checkpoints.split(',').map(c => c.trim()).filter(c => c)
          }
        : z
    );

    setZones(updatedZones);
    setEditingZone(null);
    setFormData({ name: '', description: '', checkpoints: '' });
    toast.success('Zona actualizada');
  };

  const handleDelete = (zoneId: string) => {
    setZones(zones.filter(z => z.id !== zoneId));
    toast.success('Zona eliminada');
  };

  const handleGenerateQR = (zone: Zone) => {
    toast.success(`QR generado para ${zone.name}`);
  };

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className={`${glassNav} sticky top-0 z-10`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <button 
                onClick={() => navigate('/admin')}
                className={`w-10 h-10 flex items-center justify-center rounded-full ${glass} ${glassHover} flex-shrink-0`}
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">Gestión de Zonas</h1>
                <p className="text-xs sm:text-sm text-gray-500">Administrar áreas de vigilancia</p>
              </div>
            </div>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <button className="px-4 sm:px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-all flex items-center gap-2 text-sm self-start sm:self-auto">
                  <Plus className="w-4 h-4" />
                  <span>Nueva Zona</span>
                </button>
              </DialogTrigger>
              <DialogContent className="rounded-3xl border-0 max-w-lg">
                <DialogHeader className="space-y-3">
                  <DialogTitle className="text-2xl font-semibold">Agregar Zona</DialogTitle>
                  <DialogDescription className="text-base text-gray-600">
                    Define una nueva área de vigilancia
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-5 pt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                    <input
                      placeholder="ej. Patio Principal"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                    <textarea
                      placeholder="Describe el área..."
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Puntos de Control <span className="text-gray-500 font-normal">(separados por coma)</span>
                    </label>
                    <input
                      placeholder="Punto A, Punto B, Punto C"
                      value={formData.checkpoints}
                      onChange={(e) => setFormData({...formData, checkpoints: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button 
                    onClick={handleAdd}
                    className="w-full py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-all"
                  >
                    Agregar Zona
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12 space-y-3 sm:space-y-4">
        {zones.map((zone) => (
          <div key={zone.id} className={`${glass} ${glassHover} rounded-2xl sm:rounded-3xl p-5 sm:p-8 group`}>
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
              <div className="flex-1 min-w-0 w-full">
                <h3 className="text-lg sm:text-2xl font-semibold text-gray-900 mb-2 break-words">{zone.name}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 break-words">{zone.description}</p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm">
                  <div className="px-3 py-1.5 bg-gray-100 rounded-lg">
                    <span className="text-gray-600">{zone.checkpoints.length} puntos de control</span>
                  </div>
                  <button
                    onClick={() => handleGenerateQR(zone)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Generar QR</span>
                  </button>
                </div>
              </div>
              
              <div className="flex gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity self-end sm:self-auto">
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      onClick={() => handleEdit(zone)}
                      className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <Edit className="w-5 h-5 text-gray-700" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="rounded-3xl border-0 max-w-lg">
                    <DialogHeader className="space-y-3">
                      <DialogTitle className="text-2xl font-semibold">Editar Zona</DialogTitle>
                      <DialogDescription className="text-base text-gray-600">
                        Modifica los datos de la zona
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-5 pt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                        <input
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          rows={3}
                          className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Puntos de Control</label>
                        <input
                          value={formData.checkpoints}
                          onChange={(e) => setFormData({...formData, checkpoints: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <button 
                        onClick={handleUpdate}
                        className="w-full py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-all"
                      >
                        Actualizar Zona
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <button
                  onClick={() => {
                    if (confirm(`¿Eliminar "${zone.name}"?`)) {
                      handleDelete(zone.id);
                    }
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}