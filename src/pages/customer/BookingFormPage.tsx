import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { serviceService } from '../../services/service.service';
import { bookingService } from '../../services/booking.service';
import { useAuth } from '../../features/auth/AuthContext';
import { formatCurrency } from '../../lib/utils';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Navigation, 
  FileText, 
  ArrowRight, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';

export const BookingFormPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const service = serviceService.getServiceById(serviceId || '');

  // Form states
  const [date, setDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [timeSlot, setTimeSlot] = useState<string>('10:00 AM - 12:00 PM');
  const [address, setAddress] = useState<string>('Flat 204, Green Valley Apartments, MG Road');
  const [landmark, setLandmark] = useState<string>('Near City Metro Station');
  const [city, setCity] = useState<string>('Bengaluru');
  const [pincode, setPincode] = useState<string>('560001');
  const [customerNotes, setCustomerNotes] = useState<string>('');
  
  // Geolocation simulation (as per Section 9 of the spec)
  const [isCapturingLocation, setIsCapturingLocation] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  if (!service) {
    return <div className="p-8 text-center">Service not found</div>;
  }

  const timeSlots = [
    '09:00 AM - 11:00 AM',
    '11:00 AM - 01:00 PM',
    '02:00 PM - 04:00 PM',
    '04:00 PM - 06:00 PM',
    '06:00 PM - 08:00 PM'
  ];

  const handleUseCurrentLocation = () => {
    setIsCapturingLocation(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
          setIsCapturingLocation(false);
          toast.success('Device GPS location captured successfully');
        },
        (err) => {
          console.warn('Geolocation denied/failed, falling back to mock coordinates', err);
          // Fallback coordinate for demo
          setCoords({ lat: 12.9716, lng: 77.5946 });
          setIsCapturingLocation(false);
          toast.info('Location captured (Demo GPS: Bengaluru Central)');
        },
        { timeout: 8000 }
      );
    } else {
      setCoords({ lat: 12.9716, lng: 77.5946 });
      setIsCapturingLocation(false);
      toast.info('Location captured (Demo GPS: Bengaluru Central)');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!address.trim() || !pincode.trim()) {
      toast.error('Please provide a complete service address');
      return;
    }

    const scheduledDateTime = `${date}T${timeSlot.split(' - ')[0]}`;

    const newBooking = bookingService.createBooking({
      customerId: user.id,
      customerName: user.full_name,
      customerPhone: user.phone,
      serviceId: service.id,
      serviceName: service.name,
      price: service.price,
      scheduledAt: scheduledDateTime,
      address,
      landmark,
      city,
      pincode,
      latitude: coords?.lat,
      longitude: coords?.lng,
      customerNotes
    });

    toast.success('Booking scheduled! Now proceed to static UPI QR payment.');
    navigate(`/payment/${newBooking.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Schedule Service Appointment</h1>
        <p className="text-sm text-slate-500">Provide slot timing and service delivery address</p>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={service.image_url}
            alt={service.name}
            className="w-12 h-12 rounded-xl object-cover"
          />
          <div>
            <div className="text-xs font-semibold text-emerald-800">Booking Service:</div>
            <div className="text-sm font-bold text-slate-900">{service.name}</div>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-500">Total Due</span>
          <div className="text-lg font-black text-emerald-700">{formatCurrency(service.price)}</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date & Time Selection */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <span>Select Date & Preferred Time Slot</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Appointment Date</label>
              <input
                type="date"
                required
                value={date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Time Slot Window</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Address & Optional Location Section */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <span>Service Location</span>
            </div>

            {/* Optional Geolocation Capture */}
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={isCapturingLocation}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Navigation className={`w-3.5 h-3.5 ${isCapturingLocation ? 'animate-spin' : ''}`} />
              {coords ? 'GPS Location Captured' : 'Use Current Device Location'}
            </button>
          </div>

          {coords && (
            <div className="text-xs bg-emerald-50/70 text-emerald-800 p-2.5 rounded-xl border border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Coordinates saved: <strong>{coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}</strong>
              </span>
            </div>
          )}

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">House / Flat No., Apartment Name, Street *</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Flat 301, Tower B, Palm Meadows"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Landmark (Optional)</label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Near Water Tank"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">City *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Pincode *</label>
                <input
                  type="text"
                  required
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="e.g. 560001"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Instructions for Service Partner (Optional)</label>
              <textarea
                rows={2}
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                placeholder="e.g. Please bring a ladder, doorbell is not working..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/20 text-base flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          Confirm Details & Proceed to UPI QR Payment
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
