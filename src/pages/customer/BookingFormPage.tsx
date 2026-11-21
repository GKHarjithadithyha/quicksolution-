import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { serviceService } from '../../services/service.service';
import { bookingService } from '../../services/booking.service';
import { useAuth } from '../../features/auth/AuthContext';
import { formatCurrency } from '../../lib/utils';
import { EmptyState } from '../../components/customer/StateViews';
import {
  Calendar,
  Clock,
  MapPin,
  Navigation,
  CheckCircle2,
  User,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner';

const TIME_SLOTS = [
  '9:00 AM – 11:00 AM',
  '11:00 AM – 1:00 PM',
  '2:00 PM – 4:00 PM',
  '4:00 PM – 6:00 PM'
];

export const BookingFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const service = serviceService.getServiceById(id || '');

  useEffect(() => {
    if (!user && id) {
      navigate(`/login?redirect=${encodeURIComponent(`/book/${id}`)}`, { replace: true });
    }
  }, [user, id, navigate]);

  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  // Step 2: Schedule
  const [date, setDate] = useState<string>(tomorrow);
  const [selectedSlot, setSelectedSlot] = useState<string>(TIME_SLOTS[0]);

  // Step 3: Address
  const [houseNo, setHouseNo] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [landmark, setLandmark] = useState<string>('');
  const [city, setCity] = useState<string>('Bengaluru');
  const [pincode, setPincode] = useState<string>('');
  const [isCapturingLocation, setIsCapturingLocation] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locationMessage, setLocationMessage] = useState<string>('');

  // Step 4: Contact
  const [customerName, setCustomerName] = useState<string>(user?.full_name || '');
  const [customerPhone, setCustomerPhone] = useState<string>(user?.phone || '');
  const [customerNotes, setCustomerNotes] = useState<string>('');

  // Validation & Submit guard
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!service) {
    return (
      <EmptyState
        title="Service not found"
        description="Please choose a valid service to schedule an appointment."
        actionLabel="Explore Services"
        actionTo="/services"
      />
    );
  }

  if (!user) return null;

  const handleUseCurrentLocation = () => {
    setIsCapturingLocation(true);
    setLocationMessage('');

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setLocationMessage('Location coordinates captured and will be attached to this booking.');
          setIsCapturingLocation(false);
          toast.success('Current location captured');
        },
        () => {
          setLocationMessage('Location permission was not granted. You can continue with manual address entry.');
          setIsCapturingLocation(false);
        },
        { timeout: 8000 }
      );
    } else {
      setLocationMessage('Location capture is unavailable on this browser. Please enter your address manually.');
      setIsCapturingLocation(false);
    }
  };

  const fullAddressPreview = [houseNo, street, city, pincode].filter(Boolean).join(', ');

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!date) nextErrors.date = 'Please select an appointment date.';
    if (!selectedSlot) nextErrors.slot = 'Please select a time slot.';
    if (!houseNo.trim()) nextErrors.houseNo = 'House / Flat number is required.';
    if (!street.trim()) nextErrors.street = 'Street / Area is required.';
    if (!city.trim()) nextErrors.city = 'City is required.';
    if (!/^\d{6}$/.test(pincode.trim())) nextErrors.pincode = 'Enter a valid 6-digit pincode.';
    if (!customerName.trim()) nextErrors.customerName = 'Customer name is required.';
    if (customerPhone.trim().length < 10) nextErrors.customerPhone = 'Enter a valid contact number.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    const formattedAddress = `${houseNo.trim()}, ${street.trim()}`;
    const newBooking = bookingService.createBooking({
      customerId: user.id,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      serviceId: service.id,
      serviceName: service.name,
      price: service.price,
      scheduledAt: `${date}T09:00:00`,
      scheduledDate: date,
      scheduledSlot: selectedSlot,
      address: formattedAddress,
      street: street.trim(),
      landmark: landmark.trim() || undefined,
      city: city.trim(),
      pincode: pincode.trim(),
      latitude: coords?.lat,
      longitude: coords?.lng,
      customerNotes: customerNotes.trim() || undefined
    });

    toast.success('Your booking has been received');
    navigate(`/booking/${newBooking.id}?confirmed=true`, { replace: true });
  };

  const renderSummaryCard = () => (
    <div className="bg-white border border-[#E8EAED] rounded-2xl p-5 sm:p-6 space-y-5">
      <h2 className="text-lg font-semibold text-[#142D4E]">Booking Summary</h2>

      <div className="space-y-3 text-sm border-y border-[#E8EAED] py-4">
        <div className="flex justify-between gap-3">
          <span className="text-[#737D89]">Service</span>
          <span className="font-medium text-[#202936] text-right">{service.name}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="text-[#737D89]">Date</span>
          <span className="font-medium text-[#202936]">
            {date ? new Date(date + 'T00:00:00').toLocaleDateString([], { dateStyle: 'medium' }) : 'Not selected'}
          </span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="text-[#737D89]">Time slot</span>
          <span className="font-medium text-[#202936] text-right">{selectedSlot}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="text-[#737D89]">Address</span>
          <span className="font-medium text-[#202936] text-right max-w-[200px] truncate">
            {fullAddressPreview || 'Not entered yet'}
          </span>
        </div>
        <div className="flex justify-between items-baseline pt-3 border-t border-[#E8EAED]">
          <span className="text-[#737D89]">Total Price</span>
          <span className="text-2xl font-bold text-[#202936]">
            {formatCurrency(service.price)}
          </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full qs-btn-primary text-base"
      >
        {isSubmitting ? 'Confirming Booking...' : 'Confirm Booking'}
      </button>
    </div>
  );

  return (
    <div className="space-y-6 pb-28 lg:pb-6">
      <div className="space-y-2">
        <Link
          to={`/services/${service.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#142D4E] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Service Details
        </Link>
        <h1 className="text-[28px] sm:text-[32px] font-semibold text-[#142D4E] tracking-tight">
          Book Service
        </h1>
        <p className="text-sm text-[#737D89]">
          Complete the steps below to schedule your appointment
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Steps 1 to 4 */}
        <div className="lg:col-span-8 space-y-6">
          {/* Step 1: Confirm Service */}
          <section className="bg-white border border-[#E8EAED] rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-[#142D4E] text-white text-xs font-semibold flex items-center justify-center">
                  1
                </span>
                <h2 className="text-lg font-semibold text-[#142D4E]">Confirm Service</h2>
              </div>
              <Link
                to="/services"
                className="text-sm font-semibold text-[#142D4E] hover:underline"
              >
                Change service
              </Link>
            </div>

            <div className="flex items-center justify-between gap-4 bg-[#F5F5F0] border border-[#E8EAED] rounded-xl p-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <img
                  src={service.image_url}
                  alt={service.name}
                  className="w-14 h-14 rounded-lg object-cover shrink-0"
                />
                <div className="min-w-0">
                  <div className="font-medium text-[#202936] text-base truncate">{service.name}</div>
                  <div className="text-xs sm:text-sm text-[#737D89] inline-flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                    Approx. {service.duration} mins
                  </div>
                </div>
              </div>
              <div className="text-xl font-bold text-[#202936] shrink-0">
                {formatCurrency(service.price)}
              </div>
            </div>
          </section>

          {/* Step 2: Select Date and Time */}
          <section className="bg-white border border-[#E8EAED] rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-[#142D4E] text-white text-xs font-semibold flex items-center justify-center">
                2
              </span>
              <h2 className="text-lg font-semibold text-[#142D4E]">Select Date and Time</h2>
            </div>

            <div className="space-y-4">
              <div className="max-w-xs">
                <label htmlFor="booking-date" className="block text-sm font-medium text-[#202936] mb-1.5">
                  Appointment Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#737D89] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="booking-date"
                    type="date"
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full h-12 pl-10 pr-4 bg-white border border-[#E8EAED] rounded-xl text-sm text-[#202936] outline-none focus:border-[#142D4E] focus:ring-2 focus:ring-[#142D4E]/15"
                  />
                </div>
                {errors.date && <p className="text-xs text-[#D94B4B] mt-1">{errors.date}</p>}
              </div>

              <div>
                <span className="block text-sm font-medium text-[#202936] mb-2">
                  Preferred Time Slot
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`h-12 px-4 rounded-xl border text-sm font-medium transition-colors cursor-pointer text-left flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#142D4E] border-[#142D4E] text-white'
                            : 'bg-white border-[#E8EAED] text-[#202936] hover:border-[#142D4E]'
                        }`}
                      >
                        <span>{slot}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-white shrink-0" />}
                      </button>
                    );
                  })}
                </div>
                {errors.slot && <p className="text-xs text-[#D94B4B] mt-1">{errors.slot}</p>}
              </div>
            </div>
          </section>

          {/* Step 3: Service Address */}
          <section className="bg-white border border-[#E8EAED] rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-[#142D4E] text-white text-xs font-semibold flex items-center justify-center">
                  3
                </span>
                <h2 className="text-lg font-semibold text-[#142D4E]">Service Address</h2>
              </div>

              <button
                type="button"
                onClick={handleUseCurrentLocation}
                disabled={isCapturingLocation}
                className="inline-flex items-center gap-1.5 h-10 px-3.5 rounded-xl border border-[#142D4E] text-[#142D4E] hover:bg-[#142D4E]/5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                <Navigation className={`w-4 h-4 ${isCapturingLocation ? 'animate-spin' : ''}`} />
                {isCapturingLocation ? 'Locating...' : 'Use Current Location'}
              </button>
            </div>

            {locationMessage && (
              <div
                className={`text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border flex items-center gap-2 ${
                  coords
                    ? 'bg-[#20A779]/10 border-[#20A779]/30 text-[#147352]'
                    : 'bg-[#F5F5F0] border-[#E8EAED] text-[#737D89]'
                }`}
              >
                <MapPin className="w-4 h-4 shrink-0" />
                <span>{locationMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="house-no" className="block text-sm font-medium text-[#202936] mb-1.5">
                  House / Flat number *
                </label>
                <input
                  id="house-no"
                  type="text"
                  value={houseNo}
                  onChange={(e) => setHouseNo(e.target.value)}
                  placeholder="e.g. Flat 302, Block B"
                  className={`w-full h-12 px-4 bg-white border rounded-xl text-sm text-[#202936] outline-none focus:ring-2 ${
                    errors.houseNo
                      ? 'border-[#D94B4B] focus:ring-[#D94B4B]/20'
                      : 'border-[#E8EAED] focus:border-[#142D4E] focus:ring-[#142D4E]/15'
                  }`}
                />
                {errors.houseNo && <p className="text-xs text-[#D94B4B] mt-1">{errors.houseNo}</p>}
              </div>

              <div>
                <label htmlFor="street-area" className="block text-sm font-medium text-[#202936] mb-1.5">
                  Street / Area *
                </label>
                <input
                  id="street-area"
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="e.g. 12th Main, Indiranagar"
                  className={`w-full h-12 px-4 bg-white border rounded-xl text-sm text-[#202936] outline-none focus:ring-2 ${
                    errors.street
                      ? 'border-[#D94B4B] focus:ring-[#D94B4B]/20'
                      : 'border-[#E8EAED] focus:border-[#142D4E] focus:ring-[#142D4E]/15'
                  }`}
                />
                {errors.street && <p className="text-xs text-[#D94B4B] mt-1">{errors.street}</p>}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="landmark" className="block text-sm font-medium text-[#202936] mb-1.5">
                  Landmark (optional)
                </label>
                <input
                  id="landmark"
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Near Metro Station Gate 2"
                  className="w-full h-12 px-4 bg-white border border-[#E8EAED] rounded-xl text-sm text-[#202936] outline-none focus:border-[#142D4E] focus:ring-2 focus:ring-[#142D4E]/15"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-[#202936] mb-1.5">
                  City *
                </label>
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={`w-full h-12 px-4 bg-white border rounded-xl text-sm text-[#202936] outline-none focus:ring-2 ${
                    errors.city
                      ? 'border-[#D94B4B] focus:ring-[#D94B4B]/20'
                      : 'border-[#E8EAED] focus:border-[#142D4E] focus:ring-[#142D4E]/15'
                  }`}
                />
                {errors.city && <p className="text-xs text-[#D94B4B] mt-1">{errors.city}</p>}
              </div>

              <div>
                <label htmlFor="pincode" className="block text-sm font-medium text-[#202936] mb-1.5">
                  Pincode *
                </label>
                <input
                  id="pincode"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="e.g. 560038"
                  className={`w-full h-12 px-4 bg-white border rounded-xl text-sm text-[#202936] outline-none focus:ring-2 ${
                    errors.pincode
                      ? 'border-[#D94B4B] focus:ring-[#D94B4B]/20'
                      : 'border-[#E8EAED] focus:border-[#142D4E] focus:ring-[#142D4E]/15'
                  }`}
                />
                {errors.pincode && <p className="text-xs text-[#D94B4B] mt-1">{errors.pincode}</p>}
              </div>
            </div>
          </section>

          {/* Step 4: Contact Details */}
          <section className="bg-white border border-[#E8EAED] rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-[#142D4E] text-white text-xs font-semibold flex items-center justify-center">
                4
              </span>
              <h2 className="text-lg font-semibold text-[#142D4E]">Contact Details</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="customer-name" className="block text-sm font-medium text-[#202936] mb-1.5">
                  Customer name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#737D89] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="customer-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className={`w-full h-12 pl-10 pr-4 bg-white border rounded-xl text-sm text-[#202936] outline-none focus:ring-2 ${
                      errors.customerName
                        ? 'border-[#D94B4B] focus:ring-[#D94B4B]/20'
                        : 'border-[#E8EAED] focus:border-[#142D4E] focus:ring-[#142D4E]/15'
                    }`}
                  />
                </div>
                {errors.customerName && <p className="text-xs text-[#D94B4B] mt-1">{errors.customerName}</p>}
              </div>

              <div>
                <label htmlFor="customer-phone" className="block text-sm font-medium text-[#202936] mb-1.5">
                  Contact number *
                </label>
                <input
                  id="customer-phone"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className={`w-full h-12 px-4 bg-white border rounded-xl text-sm text-[#202936] outline-none focus:ring-2 ${
                    errors.customerPhone
                      ? 'border-[#D94B4B] focus:ring-[#D94B4B]/20'
                      : 'border-[#E8EAED] focus:border-[#142D4E] focus:ring-[#142D4E]/15'
                  }`}
                />
                {errors.customerPhone && <p className="text-xs text-[#D94B4B] mt-1">{errors.customerPhone}</p>}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="customer-notes" className="block text-sm font-medium text-[#202936] mb-1.5">
                  Additional instructions (optional)
                </label>
                <textarea
                  id="customer-notes"
                  rows={3}
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  placeholder="Share any helpful access details or notes about the issue..."
                  className="w-full p-3.5 bg-white border border-[#E8EAED] rounded-xl text-sm text-[#202936] outline-none focus:border-[#142D4E] focus:ring-2 focus:ring-[#142D4E]/15"
                />
              </div>
            </div>
          </section>

          {/* Mobile Step 5: Booking Summary */}
          <div className="lg:hidden">{renderSummaryCard()}</div>
        </div>

        {/* Desktop Right Column: Step 5 Booking Summary */}
        <aside className="hidden lg:block lg:col-span-4 sticky top-24">
          {renderSummaryCard()}
        </aside>

        {/* Mobile Sticky Bottom Confirm Bar (Safe Area Compliant) */}
        <div className="fixed bottom-0 left-0 right-0 z-40 glass-nav border-t px-4 py-3 pb-safe flex items-center justify-between gap-4 lg:hidden shadow-lg">
          <div>
            <div className="text-xs text-[#6B7280]">Total</div>
            <div className="text-xl font-bold text-[#1E3A8A] leading-tight">
              {formatCurrency(service.price)}
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="qs-btn-primary px-6 text-sm"
          >
            {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
          </button>
        </div>
      </form>
    </div>
  );
};
