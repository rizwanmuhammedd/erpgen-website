import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  getAdminContactEnquiries,
  updateAdminContactEnquiryStatus,
  type AdminContactEnquiryResponse,
} from '../../services/contactService';
import {
  Search,
  Filter,
  Eye,
  RefreshCw,
  LogOut,
  Mail,
  Phone,
  Calendar,
  Clock,
  Globe,
  CheckCircle2,
  AlertCircle,
  X,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Shield,
  Loader2,
  Package,
  Boxes,
  Users,
  Truck,
} from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

// Status labels & color badge maps
const STATUS_CONFIG: Record<
  string,
  { label: string; bg: string; text: string; border: string }
> = {
  New: { label: 'New', bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200' },
  Read: { label: 'Read', bg: 'bg-purple-50', text: 'text-[#6D57A5]', border: 'border-[#E9E4F1]' },
  Contacted: { label: 'Contacted', bg: 'bg-[#E4F8F0]', text: 'text-[#129267]', border: 'border-[#17B681]/30' },
  Closed: { label: 'Closed', bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200' },
};

export const AdminContactEnquiriesPage: React.FC = () => {
  const { user, token, logout } = useAuth();

  // Query state
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [searchInput, setSearchInput] = useState<string>('');
  const [activeSearch, setActiveSearch] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Data state
  const [enquiries, setEnquiries] = useState<AdminContactEnquiryResponse[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Selected enquiry for detail modal
  const [selectedEnquiry, setSelectedEnquiry] = useState<AdminContactEnquiryResponse | null>(null);
  const [statusUpdateVal, setStatusUpdateVal] = useState<string>('New');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<boolean>(false);
  const [updateFeedback, setUpdateFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Fetch enquiries
  const fetchEnquiries = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await getAdminContactEnquiries(
        {
          page,
          pageSize,
          search: activeSearch,
          status: selectedStatus === 'All' ? undefined : selectedStatus,
        },
        token
      );
      setEnquiries(res.items);
      setTotalCount(res.totalCount);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to retrieve enquiries.');
    } finally {
      setIsLoading(false);
    }
  }, [token, page, pageSize, activeSearch, selectedStatus]);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  // Handle Search Submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setActiveSearch(searchInput);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setActiveSearch('');
    setPage(1);
  };

  // Handle Status Filter Click
  const handleStatusFilterChange = (status: string) => {
    setSelectedStatus(status);
    setPage(1);
  };

  // Open Enquiry Detail
  const handleOpenDetail = (enquiry: AdminContactEnquiryResponse) => {
    setSelectedEnquiry(enquiry);
    setStatusUpdateVal(typeof enquiry.status === 'number' ? getStatusName(enquiry.status) : enquiry.status);
    setUpdateFeedback(null);
  };

  // Update Status
  const handleUpdateStatus = async () => {
    if (!selectedEnquiry || !token) return;
    setIsUpdatingStatus(true);
    setUpdateFeedback(null);

    try {
      const updated = await updateAdminContactEnquiryStatus(
        selectedEnquiry.id,
        statusUpdateVal,
        token
      );
      setSelectedEnquiry(updated);
      setUpdateFeedback({ type: 'success', message: `Status updated to ${statusUpdateVal}.` });

      // Update in local list
      setEnquiries((prev) =>
        prev.map((e) => (e.id === updated.id ? updated : e))
      );
    } catch (err) {
      setUpdateFeedback({
        type: 'error',
        message: err instanceof Error ? err.message : 'Failed to update status.',
      });
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Status mapping helper
  const getStatusName = (status: number | string): string => {
    if (typeof status === 'string') return status;
    const mapping: Record<number, string> = {
      0: 'New',
      1: 'Read',
      2: 'Contacted',
      3: 'Closed',
    };
    return mapping[status] || 'New';
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="min-h-screen py-8 space-y-6">
      <Container size="xl" className="space-y-6">
        {/* Top Bar / Admin Identity */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E9E4F1]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#6D57A5] text-white flex items-center justify-center shadow-xs">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#6D57A5] font-bold">
                ERPGen Administrative Console
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1F1B2D] font-heading">
              Contact Enquiries Management
            </h1>
            <p className="text-xs text-[#625D6B]">
              Review, filter, and track status for direct customer consultations and module inquiries.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-[#1F1B2D]">{user?.fullName || 'Administrator'}</span>
              <span className="text-[10px] font-mono text-[#625D6B]">{user?.email}</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              icon={<RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />}
              onClick={fetchEnquiries}
              disabled={isLoading}
              title="Refresh list"
            >
              Refresh
            </Button>

            <Button
              variant="outline"
              size="sm"
              icon={<LogOut className="w-3.5 h-3.5" />}
              onClick={logout}
              title="Sign out of Admin"
              className="text-rose-600 hover:bg-rose-50 hover:border-rose-200"
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#E9E4F1] pb-2">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold text-[#6D57A5] bg-[#6D57A5]/10 border border-[#6D57A5]/20 shadow-2xs">
            <MessageSquare className="w-4 h-4 text-[#6D57A5]" />
            <span>Contact Enquiries</span>
          </div>
          <Link
            to="/admin/products"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-[#625D6B] hover:text-[#1F1B2D] hover:bg-[#FAF8FC] transition-colors"
          >
            <Package className="w-4 h-4 text-[#625D6B]" />
            <span>Products & Catalog</span>
          </Link>
          <Link
            to="/admin/inventory"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-[#625D6B] hover:text-[#1F1B2D] hover:bg-[#FAF8FC] transition-colors"
          >
            <Boxes className="w-4 h-4 text-[#625D6B]" />
            <span>Inventory & Stock</span>
          </Link>
          <Link
            to="/admin/customers"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-[#625D6B] hover:text-[#1F1B2D] hover:bg-[#FAF8FC] transition-colors"
          >
            <Users className="w-4 h-4 text-[#625D6B]" />
            <span>Customers</span>
          </Link>
          <Link
            to="/admin/suppliers"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-[#625D6B] hover:text-[#1F1B2D] hover:bg-[#FAF8FC] transition-colors"
          >
            <Truck className="w-4 h-4 text-[#625D6B]" />
            <span>Suppliers</span>
          </Link>
        </div>

        {/* Filter and Search Controls */}
        <Card variant="default" className="p-4 sm:p-5 bg-white border border-[#E9E4F1] shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md relative flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by customer name, email, or phone..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-xs text-[#1F1B2D] placeholder:text-[#625D6B]/60 focus:bg-white focus-ring-purple"
                />
                <Search className="w-4 h-4 text-[#625D6B]/70 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                {searchInput && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#625D6B] hover:text-[#1F1B2D]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <Button type="submit" variant="primary" size="sm">
                Search
              </Button>
            </form>

            {/* Status Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              <span className="text-xs text-[#625D6B] font-semibold flex items-center gap-1 mr-1">
                <Filter className="w-3.5 h-3.5" /> Status:
              </span>
              {['All', 'New', 'Read', 'Contacted', 'Closed'].map((status) => {
                const isSelected = selectedStatus === status;
                return (
                  <button
                    key={status}
                    onClick={() => handleStatusFilterChange(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#6D57A5] text-white shadow-xs'
                        : 'bg-[#FAF8FC] border border-[#E9E4F1] text-[#625D6B] hover:bg-white hover:text-[#1F1B2D]'
                    }`}
                  >
                    {status}
                  </button>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <Button variant="outline" size="sm" onClick={fetchEnquiries} className="text-xs">
              Retry
            </Button>
          </div>
        )}

        {/* Enquiries Table Card */}
        <Card variant="default" className="bg-white border border-[#E9E4F1] shadow-xs overflow-hidden">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-8 h-8 text-[#6D57A5] animate-spin" />
              <p className="text-xs text-[#625D6B] font-mono">Loading enquiries from server...</p>
            </div>
          ) : enquiries.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#625D6B] flex items-center justify-center mx-auto">
                <MessageSquare className="w-6 h-6 text-[#6D57A5]" />
              </div>
              <h3 className="text-base font-bold text-[#1F1B2D]">No contact enquiries found</h3>
              <p className="text-xs text-[#625D6B] max-w-sm mx-auto">
                {activeSearch || selectedStatus !== 'All'
                  ? 'No results match your active search or filter criteria. Try clearing filters.'
                  : 'New enquiries submitted through the contact form will appear here.'}
              </p>
              {(activeSearch || selectedStatus !== 'All') && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    handleClearSearch();
                    setSelectedStatus('All');
                  }}
                  className="mt-2"
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8FC] text-[#625D6B] font-mono uppercase tracking-wider text-[10px] border-b border-[#E9E4F1]">
                  <tr>
                    <th className="py-3 px-4 font-bold">Customer Name</th>
                    <th className="py-3 px-4 font-bold">Email</th>
                    <th className="py-3 px-4 font-bold">Phone</th>
                    <th className="py-3 px-4 font-bold">Client IP</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                    <th className="py-3 px-4 font-bold">Submitted Date</th>
                    <th className="py-3 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9E4F1]">
                  {enquiries.map((enquiry) => {
                    const statusName = getStatusName(enquiry.status);
                    const config = STATUS_CONFIG[statusName] || STATUS_CONFIG.New;

                    return (
                      <tr
                        key={enquiry.id}
                        className="hover:bg-[#FAF8FC]/70 transition-colors cursor-pointer group"
                        onClick={() => handleOpenDetail(enquiry)}
                      >
                        <td className="py-3 px-4">
                          <div className="font-bold text-[#1F1B2D] group-hover:text-[#6D57A5] transition-colors">
                            {enquiry.name}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono text-[#625D6B]">
                          {enquiry.email}
                        </td>
                        <td className="py-3 px-4 text-[#625D6B]">
                          {enquiry.phone || '—'}
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-[#625D6B]">
                          {enquiry.ipAddress ? (
                            <span className="inline-flex items-center gap-1">
                              <Globe className="w-3 h-3 text-[#6D57A5]" />
                              <span>{enquiry.ipAddress}</span>
                            </span>
                          ) : (
                            <span className="text-[#625D6B]/50">—</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border ${config.bg} ${config.text} ${config.border}`}
                          >
                            {config.label}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[#625D6B] whitespace-nowrap">
                          {formatDate(enquiry.createdAt)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenDetail(enquiry);
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-[#E9E4F1] hover:border-[#6D57A5] hover:text-[#6D57A5] text-[11px] font-semibold text-[#1F1B2D] transition-all shadow-2xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Details</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Bar */}
          {!isLoading && enquiries.length > 0 && (
            <div className="p-4 border-t border-[#E9E4F1] bg-[#FAF8FC] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#625D6B]">
              <div>
                Showing <span className="font-bold text-[#1F1B2D]">{(page - 1) * pageSize + 1}</span> to{' '}
                <span className="font-bold text-[#1F1B2D]">{Math.min(page * pageSize, totalCount)}</span> of{' '}
                <span className="font-bold text-[#1F1B2D]">{totalCount}</span> enquiries
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  icon={<ChevronLeft className="w-3.5 h-3.5" />}
                >
                  Previous
                </Button>
                <span className="font-mono text-xs font-bold text-[#1F1B2D] px-2">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  icon={<ChevronRight className="w-3.5 h-3.5" />}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Enquiry Detail Modal / Slide-over */}
        {selectedEnquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-xs animate-in fade-in">
            <Card
              variant="default"
              className="bg-white border border-[#E9E4F1] shadow-2xl rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-5 sm:p-6 border-b border-[#E9E4F1] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#6D57A5] font-bold block">
                    Enquiry Details
                  </span>
                  <h3 className="text-xl font-bold text-[#1F1B2D] font-heading">
                    {selectedEnquiry.name}
                  </h3>
                  <span className="text-[10px] font-mono text-[#625D6B]">ID: {selectedEnquiry.id}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="p-2 rounded-xl text-[#625D6B] hover:bg-[#FAF8FC] hover:text-[#1F1B2D] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-6 space-y-5 flex-1 text-xs">
                {/* Contact Quick Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1]">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-[#625D6B] block">Email Address</span>
                    <a
                      href={`mailto:${selectedEnquiry.email}`}
                      className="font-bold text-[#6D57A5] hover:underline flex items-center gap-1.5 truncate"
                    >
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      <span>{selectedEnquiry.email}</span>
                    </a>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-[#625D6B] block">Phone Number</span>
                    {selectedEnquiry.phone ? (
                      <a
                        href={`tel:${selectedEnquiry.phone}`}
                        className="font-bold text-[#17B681] hover:underline flex items-center gap-1.5 truncate"
                      >
                        <Phone className="w-3.5 h-3.5 shrink-0" />
                        <span>{selectedEnquiry.phone}</span>
                      </a>
                    ) : (
                      <span className="text-[#625D6B]">Not provided</span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-[#625D6B] block">Client IP Address</span>
                    <div className="font-mono text-[11px] font-bold text-[#1F1B2D] flex items-center gap-1.5 truncate">
                      <Globe className="w-3.5 h-3.5 text-[#6D57A5] shrink-0" />
                      <span>{selectedEnquiry.ipAddress || 'Not recorded'}</span>
                    </div>
                  </div>
                </div>

                {/* Timestamps */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-[#625D6B]">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#6D57A5]" />
                    <span>Submitted: {formatDate(selectedEnquiry.createdAt)}</span>
                  </div>
                  {selectedEnquiry.updatedAt && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#17B681]" />
                      <span>Last Updated: {formatDate(selectedEnquiry.updatedAt)}</span>
                    </div>
                  )}
                </div>

                {/* Message Body */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#625D6B] font-bold block">
                    Message / Business Requirements
                  </span>
                  <div className="p-4 rounded-xl bg-white border border-[#E9E4F1] text-[#1F1B2D] leading-relaxed whitespace-pre-wrap font-sans text-xs">
                    {selectedEnquiry.message}
                  </div>
                </div>

                {/* Status Update Form */}
                <div className="p-4 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1F1B2D]">Manage Enquiry Status</span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                        (STATUS_CONFIG[getStatusName(selectedEnquiry.status)] || STATUS_CONFIG.New).bg
                      } ${(STATUS_CONFIG[getStatusName(selectedEnquiry.status)] || STATUS_CONFIG.New).text} ${
                        (STATUS_CONFIG[getStatusName(selectedEnquiry.status)] || STATUS_CONFIG.New).border
                      }`}
                    >
                      Current: {getStatusName(selectedEnquiry.status)}
                    </span>
                  </div>

                  {updateFeedback && (
                    <div
                      className={`p-2.5 rounded-lg text-xs flex items-center gap-2 ${
                        updateFeedback.type === 'success'
                          ? 'bg-[#E4F8F0] border border-[#17B681]/30 text-[#129267]'
                          : 'bg-rose-50 border border-rose-200 text-rose-700'
                      }`}
                    >
                      {updateFeedback.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 shrink-0" />
                      )}
                      <span>{updateFeedback.message}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <select
                      value={statusUpdateVal}
                      onChange={(e) => setStatusUpdateVal(e.target.value)}
                      disabled={isUpdatingStatus}
                      className="px-3 py-2 rounded-xl bg-white border border-[#E9E4F1] text-xs font-semibold text-[#1F1B2D] focus-ring-purple cursor-pointer flex-1"
                    >
                      <option value="New">New</option>
                      <option value="Read">Read</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Closed">Closed</option>
                    </select>

                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      onClick={handleUpdateStatus}
                      disabled={isUpdatingStatus || statusUpdateVal === getStatusName(selectedEnquiry.status)}
                      icon={isUpdatingStatus ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : undefined}
                    >
                      {isUpdatingStatus ? 'Saving...' : 'Update Status'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-[#E9E4F1] bg-[#FAF8FC] flex justify-end">
                <Button variant="outline" size="sm" onClick={() => setSelectedEnquiry(null)}>
                  Close
                </Button>
              </div>
            </Card>
          </div>
        )}
      </Container>
    </div>
  );
};
