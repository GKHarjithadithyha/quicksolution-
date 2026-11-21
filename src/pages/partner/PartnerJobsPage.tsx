import React, { useState } from 'react';
import { partnerService } from '../../services/partner.service';
import { useAuth } from '../../features/auth/AuthContext';
import { BookingStatusBadge, PaymentStatusBadge } from '../../components/common/StatusBadges';
import { formatCurrency } from '../../lib/utils';
import { 
  Calendar, 
  MapPin, 
  Phone, 
  CheckCircle, 
  XCircle, 
  Play, 
  CheckCheck, 
  Clock, 
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

export const PartnerJobsPage: React.FC = () => {
  const { user } = useAuth();
  // Find current partner profile matching user
  const partner = partnerService.getPartners().find(p => p.user_id === user.id) || partnerService.getPartners()[0];
  const [refreshKey, setRefreshKey] = useState(0);

  const jobs = partnerService.getAssignedJobs(partner.id);
  const activeJobs = jobs.filter(j => j.status !== 'completed' && j.status !== 'cancelled');

  const handleAccept = (bookingId: string) => {
    partnerService.acceptJob(bookingId, partner.id);
    toast.success('Job accepted! Customer notified.');
    setRefreshKey(k => k + 1);
  };

  const handleReject = (bookingId: string) => {
    const reason = prompt('Please provide reason for declining:', 'Schedule conflict / fully booked');
    if (reason !== null) {
      partnerService.rejectJob(bookingId, partner.id, reason);
      toast.info('Job rejected. Booking returned to admin for reassignment.');
      setRefreshKey(k => k + 1);
    }
  };

  const handleStart = (bookingId: string) => {
    partnerService.startJob(bookingId, partner.id);
    toast.success('Job marked In-Progress. Begin service work!');
    setRefreshKey(k => k + 1);
  };

  const handleComplete = (bookingId: string) => {
    partnerService.completeJob(bookingId, partner.id);
    toast.success('Job successfully completed! Great work.');
    setRefreshKey(k => k + 1);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Partner Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4 shadow-lg">
        <div className="space-y-1">
          <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">Technician Workspace</span>
          <h1 className="text-2xl sm:text-3xl font-black">Welcome back, {partner.full_name}</h1>
          <p className="text-blue-200 text-xs">
            {partner.skills.join(' • ')}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 flex items-center gap-4 text-center">
          <div>
            <div className="text-xl font-black text-white">{activeJobs.length}</div>
            <div className="text-[11px] text-blue-200">Active Jobs</div>
          </div>
          <div className="w-px h-8 bg-white/20"></div>
          <div>
            <div className="text-xl font-black text-white">{partner.rating} ★</div>
            <div className="text-[11px] text-blue-200">Partner Rating</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">
          Assigned Tasks & Service Calls ({activeJobs.length})
        </h2>
      </div>

      {activeJobs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
          <Clock className="w-12 h-12 text-slate-300 mx-auto mb-2" />
          <h3 className="text-base font-bold text-slate-800">No active job assignments</h3>
          <p className="text-xs text-slate-400 mt-1">
            New bookings dispatched by Admin will appear here in real time.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {activeJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                    {job.booking_number}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {job.service_name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <BookingStatusBadge status={job.status} />
                  <PaymentStatusBadge status={job.payment.status} />
                </div>
              </div>

              {/* Customer & Address Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-50 p-3.5 rounded-xl space-y-2 border border-slate-200/60">
                  <span className="text-slate-400 uppercase font-semibold text-[10px]">Customer Details</span>
                  <div className="font-bold text-slate-900 text-sm">{job.customer_name}</div>
                  <div className="flex items-center gap-2 text-slate-700 font-medium">
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    <span>{job.customer_phone}</span>
                  </div>
                  {job.customer_notes && (
                    <div className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded border border-amber-200">
                      <strong>Customer note:</strong> {job.customer_notes}
                    </div>
                  )}
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl space-y-2 border border-slate-200/60">
                  <span className="text-slate-400 uppercase font-semibold text-[10px]">Schedule & Location</span>
                  <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {new Date(job.scheduled_at).toLocaleString()}
                  </div>
                  <div className="flex items-start gap-1.5 text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{job.address}, {job.landmark ? `(Near ${job.landmark}),` : ''} {job.city} - {job.pincode}</span>
                  </div>
                  <div className="font-extrabold text-emerald-700 text-sm pt-1">
                    Job Value: {formatCurrency(job.service_price_snapshot)}
                  </div>
                </div>
              </div>

              {/* Job Action Buttons (Section 3.2: Accept, Reject, Start, Complete) */}
              <div className="pt-2 flex flex-wrap items-center gap-2 justify-end border-t border-slate-100">
                {job.status === 'assigned' && (
                  <>
                    <button
                      onClick={() => handleReject(job.id)}
                      className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 border border-rose-200 cursor-pointer"
                    >
                      <XCircle className="w-4 h-4" /> Reject Job
                    </button>
                    <button
                      onClick={() => handleAccept(job.id)}
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-sm shadow-blue-600/20 cursor-pointer"
                    >
                      <CheckCircle className="w-4 h-4" /> Accept Assignment
                    </button>
                  </>
                )}

                {job.status === 'accepted' && (
                  <button
                    onClick={() => handleStart(job.id)}
                    className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-sm shadow-purple-600/20 cursor-pointer"
                  >
                    <Play className="w-4 h-4" /> Arrived & Start Service
                  </button>
                )}

                {job.status === 'in_progress' && (
                  <button
                    onClick={() => handleComplete(job.id)}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-sm shadow-emerald-600/20 cursor-pointer"
                  >
                    <CheckCheck className="w-4 h-4" /> Mark Service Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
