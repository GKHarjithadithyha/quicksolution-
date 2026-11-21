import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { serviceService } from '../../services/service.service';
import { formatCurrency } from '../../lib/utils';
import { Star, Clock, ShieldCheck, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';

export const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = serviceService.getServiceById(id || '');

  if (!service) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
        <h2 className="text-lg font-bold text-slate-800">Service Not Found</h2>
        <Link to="/services" className="mt-4 inline-block text-sm text-emerald-600 font-semibold">
          Return to All Services
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link to="/services" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" /> Back to Services
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm">
        <div className="relative h-72 sm:h-96 w-full bg-slate-900">
          <img
            src={service.image_url}
            alt={service.name}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500 text-slate-950 text-xs font-bold px-2.5 py-0.5 rounded-full">
                Verified Technician Service
              </span>
              <div className="bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {service.rating} ({service.reviews_count} reviews)
              </div>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold">{service.name}</h1>
          </div>
        </div>

        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Service Overview</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900">What's Included in this Package</h3>
              <div className="space-y-2">
                {service.included.map((item, index) => (
                  <div key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-6 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Estimated duration: <strong>{service.duration} mins</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>30-Day Service Guarantee</span>
              </div>
            </div>
          </div>

          {/* Pricing & Booking Card */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs text-slate-500 font-medium">Standard All-Inclusive Price</span>
              <div className="text-3xl font-black text-slate-900 mt-1">
                {formatCurrency(service.price)}
              </div>
              <p className="text-xs text-slate-500 mt-1">Includes taxes, visiting fees & basic equipment.</p>
            </div>

            <div className="space-y-3">
              <Link
                to={`/book/${service.id}`}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-center text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all"
              >
                Proceed to Schedule
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="text-[11px] text-slate-400 text-center">
                Secure static UPI QR payment at confirmation step
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
