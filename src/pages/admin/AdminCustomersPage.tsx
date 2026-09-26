import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  getAdminCustomers,
  createAdminCustomer,
  updateAdminCustomer,
  updateAdminCustomerStatus,
  type Customer,
  type CreateCustomerPayload,
  type UpdateCustomerPayload,
} from '../../services/partyService';
import {
  Search,
  Filter,
  RefreshCw,
  LogOut,
  Package,
  Boxes,
  Users,
  Truck,
  Plus,
  Edit2,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Shield,
  Loader2,
  ToggleLeft,
  ToggleRight,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const AdminCustomersPage: React.FC = () => {
  const { user, token, logout } = useAuth();

  // Query state
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [searchInput, setSearchInput] = useState<string>('');
  const [activeSearch, setActiveSearch] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Customers data state
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Customer Modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    code: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    taxNumber: string;
    notes: string;
    isActive: boolean;
  }>({
    name: '',
    code: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    taxNumber: '',
    notes: '',
    isActive: true,
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Fetch customers
  const fetchCustomers = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await getAdminCustomers(
        {
          page,
          pageSize,
          search: activeSearch,
          isActive: selectedStatus === 'All' ? undefined : selectedStatus === 'Active',
        },
        token
      );
      setCustomers(res.items);
      setTotalCount(res.totalCount);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to retrieve customers.');
    } finally {
      setIsLoading(false);
    }
  }, [token, page, pageSize, activeSearch, selectedStatus]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  // Search handlers
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

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingCustomer(null);
    setFormData({
      name: '',
      code: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      country: '',
      taxNumber: '',
      notes: '',
      isActive: true,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (c: Customer) => {
    setEditingCustomer(c);
    setFormData({
      name: c.name,
      code: c.code,
      email: c.email || '',
      phone: c.phone || '',
      address: c.address || '',
      city: c.city || '',
      state: c.state || '',
      country: c.country || '',
      taxNumber: c.taxNumber || '',
      notes: c.notes || '',
      isActive: c.isActive,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  // Submit Modal
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (!formData.name.trim()) {
      setFormError('Customer name is required.');
      return;
    }
    if (!formData.code.trim()) {
      setFormError('Customer code is required.');
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      if (editingCustomer) {
        const payload: UpdateCustomerPayload = {
          name: formData.name.trim(),
          code: formData.code.trim().toUpperCase(),
          email: formData.email.trim() || null,
          phone: formData.phone.trim() || null,
          address: formData.address.trim() || null,
          city: formData.city.trim() || null,
          state: formData.state.trim() || null,
          country: formData.country.trim() || null,
          taxNumber: formData.taxNumber.trim() || null,
          notes: formData.notes.trim() || null,
          isActive: formData.isActive,
        };
        await updateAdminCustomer(editingCustomer.id, payload, token);
      } else {
        const payload: CreateCustomerPayload = {
          name: formData.name.trim(),
          code: formData.code.trim().toUpperCase(),
          email: formData.email.trim() || null,
          phone: formData.phone.trim() || null,
          address: formData.address.trim() || null,
          city: formData.city.trim() || null,
          state: formData.state.trim() || null,
          country: formData.country.trim() || null,
          taxNumber: formData.taxNumber.trim() || null,
          notes: formData.notes.trim() || null,
        };
        await createAdminCustomer(payload, token);
      }

      setIsModalOpen(false);
      fetchCustomers();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Operation failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle Active Status
  const handleToggleStatus = async (c: Customer) => {
    if (!token) return;
    const newStatus = !c.isActive;
    try {
      await updateAdminCustomerStatus(c.id, newStatus, token);
      setCustomers((prev) =>
        prev.map((item) => (item.id === c.id ? { ...item, isActive: newStatus } : item))
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update status.');
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="min-h-screen py-8 space-y-6">
      <Container size="xl" className="space-y-6">
        {/* Top Bar / Admin Header */}
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
              Customer Management
            </h1>
            <p className="text-xs text-[#625D6B]">
              Client profiles, account codes, tax registrations, and billing party records.
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
              onClick={fetchCustomers}
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

        {/* Global Admin Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#E9E4F1] pb-2">
          <Link
            to="/admin/contact-enquiries"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-[#625D6B] hover:text-[#1F1B2D] hover:bg-[#FAF8FC] transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-[#625D6B]" />
            <span>Contact Enquiries</span>
          </Link>
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
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold text-[#6D57A5] bg-[#6D57A5]/10 border border-[#6D57A5]/20 shadow-2xs">
            <Users className="w-4 h-4 text-[#6D57A5]" />
            <span>Customers</span>
          </div>
          <Link
            to="/admin/suppliers"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-[#625D6B] hover:text-[#1F1B2D] hover:bg-[#FAF8FC] transition-colors"
          >
            <Truck className="w-4 h-4 text-[#625D6B]" />
            <span>Suppliers</span>
          </Link>
        </div>

        {/* Action Bar & Stats */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={handleOpenCreate}
            className="bg-[#6D57A5] hover:bg-[#5C498D] text-white"
          >
            Add Customer
          </Button>

          <div className="text-xs text-[#625D6B]">
            Showing <span className="font-bold text-[#1F1B2D]">{customers.length}</span> of{' '}
            <span className="font-bold text-[#1F1B2D]">{totalCount}</span> customers
          </div>
        </div>

        {/* Filter and Search Controls */}
        <Card variant="default" className="p-4 sm:p-5 bg-white border border-[#E9E4F1] shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md relative flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by name, code, email, phone, or tax #..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-xs text-[#1F1B2D] placeholder:text-[#625D6B]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6D57A5]/20 focus:border-[#6D57A5]"
                />
                <Search className="w-4 h-4 text-[#625D6B]/60 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                {searchInput && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#625D6B] hover:text-[#1F1B2D]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <Button type="submit" variant="secondary" size="sm">
                Search
              </Button>
            </form>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-[#625D6B]" />
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setPage(1);
                }}
                className="py-1.5 px-3 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] text-xs text-[#1F1B2D] focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
              >
                <option value="All">All Status</option>
                <option value="Active">Active Customers</option>
                <option value="Inactive">Inactive Customers</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Customers Table Card */}
        <Card variant="default" className="bg-white border border-[#E9E4F1] shadow-xs overflow-hidden">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 text-[#6D57A5] animate-spin" />
              <p className="text-xs text-[#625D6B] font-medium">Loading customer accounts...</p>
            </div>
          ) : errorMessage ? (
            <div className="p-8 text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
              <p className="text-xs text-rose-600 font-medium">{errorMessage}</p>
              <Button size="sm" variant="outline" onClick={fetchCustomers}>
                Try Again
              </Button>
            </div>
          ) : customers.length === 0 ? (
            <div className="py-16 px-4 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#FAF8FC] border border-[#E9E4F1] flex items-center justify-center mx-auto text-[#6D57A5]">
                <Users className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#1F1B2D]">No customers found</h3>
                <p className="text-xs text-[#625D6B] max-w-sm mx-auto">
                  {activeSearch || selectedStatus !== 'All'
                    ? 'No customers match your active search filters. Try clearing your filters.'
                    : 'No customer accounts registered yet. Click "Add Customer" to create your first client.'}
                </p>
              </div>
              {activeSearch || selectedStatus !== 'All' ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    handleClearSearch();
                    setSelectedStatus('All');
                  }}
                >
                  Clear Filters
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="primary"
                  icon={<Plus className="w-4 h-4" />}
                  onClick={handleOpenCreate}
                  className="bg-[#6D57A5] hover:bg-[#5C498D] text-white"
                >
                  Create First Customer
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FAF8FC] border-b border-[#E9E4F1] text-[11px] font-mono uppercase tracking-wider text-[#625D6B]">
                    <th className="py-3 px-4 font-semibold">Code / Client</th>
                    <th className="py-3 px-4 font-semibold">Contact Info</th>
                    <th className="py-3 px-4 font-semibold">Location</th>
                    <th className="py-3 px-4 font-semibold">Tax ID</th>
                    <th className="py-3 px-4 font-semibold text-center">Status</th>
                    <th className="py-3 px-4 font-semibold">Created</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9E4F1] text-xs">
                  {customers.map((c) => (
                    <tr key={c.id} className="hover:bg-[#FAF8FC]/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5">
                          <span className="font-bold text-[#1F1B2D] block">{c.name}</span>
                          <span className="font-mono text-[10px] text-[#6D57A5] font-semibold bg-[#6D57A5]/5 px-1.5 py-0.5 rounded border border-[#6D57A5]/20 inline-block">
                            {c.code}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 space-y-0.5">
                        {c.email && (
                          <div className="flex items-center gap-1.5 text-[#625D6B]">
                            <Mail className="w-3 h-3 text-[#6D57A5]" />
                            <span className="font-mono text-[11px]">{c.email}</span>
                          </div>
                        )}
                        {c.phone && (
                          <div className="flex items-center gap-1.5 text-[#625D6B]">
                            <Phone className="w-3 h-3 text-[#17B681]" />
                            <span className="font-mono text-[11px]">{c.phone}</span>
                          </div>
                        )}
                        {!c.email && !c.phone && (
                          <span className="text-[#625D6B]/50 italic text-[11px]">No contact details</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        {c.city || c.country ? (
                          <div className="flex items-center gap-1 text-[#625D6B]">
                            <MapPin className="w-3 h-3 shrink-0 text-[#625D6B]/70" />
                            <span>{[c.city, c.state, c.country].filter(Boolean).join(', ')}</span>
                          </div>
                        ) : (
                          <span className="text-[#625D6B]/50 italic text-[11px]">Unspecified</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#625D6B]">
                        {c.taxNumber || <span className="text-[#625D6B]/40 italic">—</span>}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            c.isActive
                              ? 'bg-[#E4F8F0] text-[#129267] border-[#17B681]/30'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              c.isActive ? 'bg-[#17B681]' : 'bg-slate-400'
                            }`}
                          />
                          {c.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#625D6B] text-[11px]">
                        {formatDate(c.createdAt)}
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenEdit(c)}
                          className="h-7 px-2 text-[#6D57A5] hover:bg-[#6D57A5]/10"
                          title="Edit Customer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStatus(c)}
                          className={`h-7 px-2 ${
                            c.isActive
                              ? 'text-amber-600 hover:bg-amber-50'
                              : 'text-[#17B681] hover:bg-[#E4F8F0]'
                          }`}
                          title={c.isActive ? 'Deactivate Customer' : 'Activate Customer'}
                        >
                          {c.isActive ? (
                            <ToggleRight className="w-4 h-4" />
                          ) : (
                            <ToggleLeft className="w-4 h-4" />
                          )}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Footer */}
          {!isLoading && customers.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-[#E9E4F1] bg-[#FAF8FC]/50 text-xs">
              <span className="text-[#625D6B]">
                Page <span className="font-bold text-[#1F1B2D]">{page}</span> of{' '}
                <span className="font-bold text-[#1F1B2D]">{totalPages}</span>
              </span>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  icon={<ChevronLeft className="w-3.5 h-3.5" />}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  icon={<ChevronRight className="w-3.5 h-3.5" />}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </Card>
      </Container>

      {/* CREATE / EDIT CUSTOMER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-[#E9E4F1] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#E9E4F1] bg-[#FAF8FC]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#6D57A5] text-white flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#1F1B2D]">
                  {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-[#625D6B] hover:text-[#1F1B2D] p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4">
              {formError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Name & Code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1F1B2D]">
                    Customer Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Global Solutions"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1F1B2D]">
                    Customer Code <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CUS-APEX-01"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono uppercase rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1F1B2D]">Email Address</label>
                  <input
                    type="email"
                    placeholder="billing@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1F1B2D]">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+1 (555) 019-2834"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
                  />
                </div>
              </div>

              {/* Tax Number & Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1F1B2D]">Tax / VAT Number</label>
                  <input
                    type="text"
                    placeholder="Optional tax identification..."
                    value={formData.taxNumber}
                    onChange={(e) => setFormData({ ...formData, taxNumber: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1F1B2D]">Street Address</label>
                  <input
                    type="text"
                    placeholder="Suite 400, Commerce Tower"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
                  />
                </div>
              </div>

              {/* City, State, Country */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1F1B2D]">City</label>
                  <input
                    type="text"
                    placeholder="New York"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1F1B2D]">State / Province</label>
                  <input
                    type="text"
                    placeholder="NY"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1F1B2D]">Country</label>
                  <input
                    type="text"
                    placeholder="USA"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1F1B2D]">Internal Notes</label>
                <textarea
                  rows={2}
                  placeholder="Optional customer account notes, terms, or preferences..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
                />
              </div>

              {/* IsActive (when editing) */}
              {editingCustomer && (
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="customerActiveCheckbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded border-[#E9E4F1] text-[#6D57A5] focus:ring-[#6D57A5]"
                  />
                  <label htmlFor="customerActiveCheckbox" className="text-xs font-medium text-[#1F1B2D]">
                    Customer is active and eligible for transactions
                  </label>
                </div>
              )}

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#E9E4F1]">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={isSubmitting}
                  icon={
                    isSubmitting ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    )
                  }
                  className="bg-[#6D57A5] hover:bg-[#5C498D] text-white"
                >
                  {isSubmitting
                    ? 'Saving...'
                    : editingCustomer
                    ? 'Update Customer'
                    : 'Save Customer'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
