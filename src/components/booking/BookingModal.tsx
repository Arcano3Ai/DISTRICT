import React, { useState } from 'react';
import type { BookingForm } from '../../domain/types';
import { X, Calendar, User, Mail, Phone, CheckCircle, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<BookingForm>({
    name: '',
    email: '',
    phone: '',
    projectType: 'diseno_arquitectonico',
    preferredDate: '',
    preferredTime: '10:00 AM',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  const handleWhatsAppBooking = () => {
    const message = `Hola *Arq. Jaime Facundo (DISTRICT Arquitectura)*, me gustaría agendar una consulta de proyecto:

👤 *Nombre:* ${formData.name}
📞 *Teléfono:* ${formData.phone}
📧 *Email:* ${formData.email}
🏗️ *Tipo de Proyecto:* ${formData.projectType}
📅 *Fecha Deseada:* ${formData.preferredDate || 'A convenir'} (${formData.preferredTime})
📝 *Notas / Ubicación:* ${formData.notes || 'Sin notas adicionales'}`;

    const whatsappUrl = `https://wa.me/524197079143?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-district-darker/90 backdrop-blur-xl animate-in fade-in duration-300">
      
      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl glass-card rounded-3xl border border-district-lime/40 overflow-hidden shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-district-darker/80 text-slate-400 hover:text-white border border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        {!formSubmitted ? (
          <div>
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-district-lime/20 border border-district-lime/40 text-xs font-bold uppercase tracking-wider text-district-lime mb-2">
                <Calendar className="w-3.5 h-3.5" />
                Consulta de Proyecto
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                Reservar Cita Arquitectónica
              </h2>
              <p className="text-xs text-slate-300 mt-1 font-light">
                Reunión presencial u online con el Arq. Jaime Facundo y equipo.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Nombre Completo *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="Ej. Ing. Carlos Garza"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-district-darker border border-slate-800 focus:border-district-cyan rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="tel"
                      required
                      placeholder="419-707-9143"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-district-darker border border-slate-800 focus:border-district-cyan rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      placeholder="jfacundo@district.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-district-darker border border-slate-800 focus:border-district-cyan rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Fecha Deseada
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-district-darker border border-slate-800 focus:border-district-cyan rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Horario Preferido
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full bg-district-darker border border-slate-800 focus:border-district-cyan rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none"
                  >
                    <option value="10:00 AM">10:00 AM (Mañana)</option>
                    <option value="01:00 PM">01:00 PM (Mediodía)</option>
                    <option value="04:00 PM">04:00 PM (Tarde)</option>
                    <option value="06:00 PM">06:00 PM (Tarde-Noche)</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Detalles del Proyecto / Ubicación del Terreno
                </label>
                <textarea
                  rows={3}
                  placeholder="Ej. Terreno de 250m2, nos interesa anteproyecto, renders y dirección de obra..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-district-darker border border-slate-800 focus:border-district-cyan rounded-xl p-3 text-sm text-white focus:outline-none resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-district-darker bg-district-gradient shadow-glow-cyan hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Confirmar Reserva de Cita
              </button>

            </form>
          </div>
        ) : (
          /* Confirmation Success Screen */
          <div className="text-center py-6 space-y-5">
            <div className="w-16 h-16 rounded-full bg-district-lime/20 border border-district-lime text-district-lime flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-extrabold text-white font-display">
              ¡Solicitud Recibida con Éxito!
            </h3>

            <p className="text-sm text-slate-300 font-light">
              Gracias <strong className="text-district-lime">{formData.name}</strong>. Hemos registrado tu reservación para el Arq. Jaime Facundo. Envia la confirmación directa a WhatsApp:
            </p>

            <div className="pt-2 space-y-3">
              <button
                onClick={handleWhatsAppBooking}
                className="w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-district-darker bg-district-gradient shadow-glow-cyan hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Enviar Confirmación a WhatsApp (419-707-9143)
              </button>

              <button
                onClick={onClose}
                className="w-full py-2 text-xs font-medium text-slate-400 hover:text-white"
              >
                Cerrar Ventana
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
