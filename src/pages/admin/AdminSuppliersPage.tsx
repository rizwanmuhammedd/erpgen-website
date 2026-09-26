import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  getAdminSuppliers,
  createAdminSupplier,
  updateAdminSupplier,
  updateAdminSupplierStatus,
  type Supplier,
  type CreateSupplierPayload,
  type UpdateSupplierPayload,
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
  FileText,
} from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const AdminSuppliersPage: React.FC = () => {
  const { user, token, logout } = useAuth();

  // Query state
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [searchInput, setSearchInput] = useState<string>('');
  const [activeSearch, setActiveSearch] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Suppliers data state
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Supplier Modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
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

  // Fetch suppliers
  const fetchSuppliers = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await getAdminSuppliers(
        {
          page,
          pageSize,
          search: activeSearch,
          isActive: selectedStatus === 'All' ? undefined : selectedStatus === 'Active',
        },
        token
      );
      setSuppliers(res.items);
      setTotalCount(res.totalCount);
      setTotalPages(res.totalPages);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to fetch suppliers.');
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize, activeSearch, selectedStatus, token]);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  // Handle Search Submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveSearch(searchInput.trim());
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setActiveSearch('');
    setPage(1);
  };

  // Open Modal for Create
  const handleOpenCreate = () => {
    setEditingSupplier(null);
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

  // Open Modal for Edit
  const handleOpenEdit = (sup: Supplier) => {
    setEditingSupplier(sup);
    setFormData({
      name: sup.name,
      code: sup.code,
      email: sup.email || '',
      phone: sup.phone || '',
      address: sup.address || '',
      city: sup.city || '',
      state: sup.state || '',
      country: sup.country || '',
      taxNumber: sup.taxNumber || '',
      notes: sup.notes || '',
      isActive: sup.isActive,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  // Save Supplier
  const handleSaveSupplier = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (!formData.name.trim()) {
      setFormError('Supplier name is required.');
      return;
    }
    if (!formData.code.trim()) {
      setFormError('Supplier code is required.');
      return;
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      if (editingSupplier) {
        const payload: UpdateSupplierPayload = {
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
        await updateAdminSupplier(editingSupplier.id, payload, token);
      } else {
        const payload: CreateSupplierPayload = {
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
        await createAdminSupplier(payload, token);
      }

      setIsModalOpen(false);
      fetchSuppliers();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Operation failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle Active Status
  const handleToggleStatus = async (s: Supplier) => {
    if (!token) return;
    const newStatus = !s.isActive;
    try {
      await updateAdminSupplierStatus(s.id, newStatus, token);
      setSuppliers((prev) =>
        prev.map((item) => (item.id === s.id ? { ...item, isActive: newStatus } : item))
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
              Supplier Management
            </h1>
            <p className="text-xs text-[#625D6B]">
              Vendor profiles, sourcing codes, tax registrations, and procurement party records.
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
              onClick={fetchSuppliers}
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
          <Link
            to="/admin/customers"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-[#625D6B] hover:text-[#1F1B2D] hover:bg-[#FAF8FC] transition-colors"
          >
            <Users className="w-4 h-4 text-[#625D6B]" />
            <span>Customers</span>
          </Link>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold text-[#6D57A5] bg-[#6D57A5]/10 border border-[#6D57A5]/20 shadow-2xs">
            <Truck className="w-4 h-4 text-[#6D57A5]" />
            <span>Suppliers</span>
          </div>
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
            Add Supplier
          </Button>

          <div className="text-xs text-[#625D6B]">
            Showing <span className="font-bold text-[#1F1B2D]">{suppliers.length}</span> of{' '}
            <span className="font-bold text-[#1F1B2D]">{totalCount}</span> suppliers
          </div>
        </div>

        {/* Filters and Search Bar */}
        <Card className="p-4 bg-white border border-[#E9E4F1] shadow-2xs">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#625D6B] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by supplier name, code, email, phone, or tax number..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-xs border border-[#E9E4F1] rounded-lg focus:outline-hidden focus:border-[#6D57A5] focus:ring-1 focus:ring-[#6D57A5]"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
              <Filter className="w-4 h-4 text-[#625D6B]" />
              <span className="text-xs font-medium text-[#625D6B]">Status:</span>
              <div className="flex gap-1 bg-[#FAF8FC] p-1 rounded-lg border border-[#E9E4F1]">
                {(['All', 'Active', 'Inactive'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setSelectedStatus(status);
                      setPage(1);
                    }}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                      selectedStatus === status
                        ? 'bg-white text-[#6D57A5] font-bold shadow-2xs'
                        : 'text-[#625D6B] hover:text-[#1F1B2D]'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Suppliers Table */}
        <Card className="overflow-hidden border border-[#E9E4F1] shadow-2xs">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-12 text-[#625D6B] space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-[#6D57A5]" />
              <p className="text-xs">Loading supplier records...</p>
            </div>
          ) : errorMessage ? (
            <div className="p-8 text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
              <p className="text-xs text-rose-600 font-medium">{errorMessage}</p>
              <Button variant="outline" size="sm" onClick={fetchSuppliers}>
                Retry
              </Button>
            </div>
          ) : suppliers.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <Truck className="w-10 h-10 text-[#625D6B]/40 mx-auto" />
              <h3 className="text-sm font-bold text-[#1F1B2D]">No suppliers found</h3>
              <p className="text-xs text-[#625D6B] max-w-sm mx-auto">
                {activeSearch || selectedStatus !== 'All'
                  ? 'No suppliers match your current filter criteria. Try resetting filters.'
                  : 'Start by registering your first supplier or vendor partner.'}
              </p>
              {(activeSearch || selectedStatus !== 'All') && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchInput('');
                    setActiveSearch('');
                    setSelectedStatus('All');
                    setPage(1);
                  }}
                >
                  Reset Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAF8FC] border-b border-[#E9E4F1] text-[#625D6B] uppercase font-mono tracking-wider text-[11px]">
                    <th className="py-3 px-4 font-semibold">Supplier</th>
                    <th className="py-3 px-4 font-semibold">Contact Details</th>
                    <th className="py-3 px-4 font-semibold">Location</th>
                    <th className="py-3 px-4 font-semibold">Tax Number</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold">Created</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9E4F1]">
                  {suppliers.map((sup) => (
                    <tr key={sup.id} className="hover:bg-[#FAF8FC]/60 transition-colors">
                      {/* Name & Code */}
                      <td className="py-3 px-4 align-top">
                        <div className="font-bold text-[#1F1B2D] text-sm">{sup.name}</div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="font-mono text-[10px] bg-[#6D57A5]/10 text-[#6D57A5] font-semibold px-1.5 py-0.5 rounded border border-[#6D57A5]/20">
                            {sup.code}
                          </span>
                        </div>
                        {sup.notes && (
                          <div className="text-[11px] text-[#625D6B] mt-1 flex items-start gap-1 line-clamp-1 italic">
                            <FileText className="w-3 h-3 shrink-0 mt-0.5" />
                            <span>{sup.notes}</span>
                          </div>
                        )}
                      </td>

                      {/* Contact Details */}
                      <td className="py-3 px-4 align-top">
                        <div className="space-y-1">
                          {sup.email ? (
                            <div className="flex items-center gap-1.5 text-[#1F1B2D]">
                              <Mail className="w-3 h-3 text-[#625D6B]" />
                              <span>{sup.email}</span>
                            </div>
                          ) : (
                            <span className="text-[#625D6B]/50 italic">No email</span>
                          )}

                          {sup.phone && (
                            <div className="flex items-center gap-1.5 text-[#625D6B]">
                              <Phone className="w-3 h-3" />
                              <span>{sup.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Location */}
                      <td className="py-3 px-4 align-top">
                        {sup.city || sup.state || sup.country || sup.address ? (
                          <div className="text-[#625D6B] flex items-start gap-1">
                            <MapPin className="w-3.5 h-3.5 shrink-0 text-[#625D6B] mt-0.5" />
                            <div>
                              {[sup.city, sup.state, sup.country].filter(Boolean).join(', ')}
                              {sup.address && (
                                <div className="text-[10px] text-[#625D6B]/70">{sup.address}</div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <span className="text-[#625D6B]/50 italic">—</span>
                        )}
                      </td>

                      {/* Tax Number */}
                      <td className="py-3 px-4 align-top font-mono text-[11px] text-[#1F1B2D]">
                        {sup.taxNumber ? (
                          <span className="bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                            {sup.taxNumber}
                          </span>
                        ) : (
                          <span className="text-[#625D6B]/50 italic">—</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4 align-top">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                            sup.isActive
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {sup.isActive ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                              Active
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-3 h-3 text-rose-500" />
                              Inactive
                            </>
                          )}
                        </span>
                      </td>

                      {/* Created At */}
                      <td className="py-3 px-4 align-top text-[11px] text-[#625D6B] font-mono">
                        {formatDate(sup.createdAt)}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 align-top text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(sup)}
                            className="p-1.5 text-[#625D6B] hover:text-[#6D57A5] hover:bg-[#6D57A5]/10 rounded transition-colors"
                            title="Edit Supplier"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleToggleStatus(sup)}
                            className={`p-1.5 rounded transition-colors ${
                              sup.isActive
                                ? 'text-emerald-600 hover:bg-emerald-50'
                                : 'text-gray-400 hover:bg-gray-100'
                            }`}
                            title={sup.isActive ? 'Deactivate Supplier' : 'Activate Supplier'}
                          >
                            {sup.isActive ? (
                              <ToggleRight className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <ToggleLeft className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 bg-[#FAF8FC] border-t border-[#E9E4F1]">
              <div className="text-xs text-[#625D6B]">
                Page <span className="font-bold text-[#1F1B2D]">{page}</span> of{' '}
                <span className="font-bold text-[#1F1B2D]">{totalPages}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1 || isLoading}
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  icon={<ChevronLeft className="w-3.5 h-3.5" />}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages || isLoading}
                  onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                >
                  <span className="flex items-center gap-1">
                    Next
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Modal: Create / Edit Supplier */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
            <div className="bg-white rounded-xl shadow-xl border border-[#E9E4F1] w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#E9E4F1]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#6D57A5]/10 text-[#6D57A5] flex items-center justify-center">
                    <Truck className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-[#1F1B2D]">
                    {editingSupplier ? 'Edit Supplier Profile' : 'Register New Supplier'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2 text-rose-700 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleSaveSupplier} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Supplier Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#1F1B2D]">
                      Supplier Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Industrial Supplies"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-[#E9E4F1] rounded-lg focus:outline-hidden focus:border-[#6D57A5] focus:ring-1 focus:ring-[#6D57A5]"
                    />
                  </div>

                  {/* Supplier Code */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#1F1B2D]">
                      Supplier Code <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SUP-001"
                      value={formData.code}
                      onChange={(e) =>
                        setFormData({ ...formData, code: e.target.value.toUpperCase() })
                      }
                      className="w-full px-3 py-1.5 text-xs font-mono border border-[#E9E4F1] rounded-lg focus:outline-hidden focus:border-[#6D57A5] focus:ring-1 focus:ring-[#6D57A5]"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#1F1B2D]">Email Address</label>
                    <input
                      type="email"
                      placeholder="orders@apexsupply.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-[#E9E4F1] rounded-lg focus:outline-hidden focus:border-[#6D57A5] focus:ring-1 focus:ring-[#6D57A5]"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#1F1B2D]">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 019-2834"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-[#E9E4F1] rounded-lg focus:outline-hidden focus:border-[#6D57A5] focus:ring-1 focus:ring-[#6D57A5]"
                    />
                  </div>

                  {/* Tax Number */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-[#1F1B2D]">
                      Tax / VAT / GST Registration Number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. US-EIN-987654321 / GSTIN29ABCDE1234F1Z5"
                      value={formData.taxNumber}
                      onChange={(e) => setFormData({ ...formData, taxNumber: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs font-mono border border-[#E9E4F1] rounded-lg focus:outline-hidden focus:border-[#6D57A5] focus:ring-1 focus:ring-[#6D57A5]"
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-[#1F1B2D]">Address</label>
                    <input
                      type="text"
                      placeholder="e.g. 742 Industrial Boulevard, Suite 100"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-[#E9E4F1] rounded-lg focus:outline-hidden focus:border-[#6D57A5] focus:ring-1 focus:ring-[#6D57A5]"
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#1F1B2D]">City</label>
                    <input
                      type="text"
                      placeholder="e.g. Chicago"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-[#E9E4F1] rounded-lg focus:outline-hidden focus:border-[#6D57A5] focus:ring-1 focus:ring-[#6D57A5]"
                    />
                  </div>

                  {/* State */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#1F1B2D]">State / Province</label>
                    <input
                      type="text"
                      placeholder="e.g. Illinois"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-[#E9E4F1] rounded-lg focus:outline-hidden focus:border-[#6D57A5] focus:ring-1 focus:ring-[#6D57A5]"
                    />
                  </div>

                  {/* Country */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-[#1F1B2D]">Country</label>
                    <input
                      type="text"
                      placeholder="e.g. United States"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-[#E9E4F1] rounded-lg focus:outline-hidden focus:border-[#6D57A5] focus:ring-1 focus:ring-[#6D57A5]"
                    />
                  </div>

                  {/* Notes */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-[#1F1B2D]">Internal Notes</label>
                    <textarea
                      rows={2}
                      placeholder="Preferred delivery terms, lead times, key account manager contact info..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-[#E9E4F1] rounded-lg focus:outline-hidden focus:border-[#6D57A5] focus:ring-1 focus:ring-[#6D57A5]"
                    />
                  </div>

                  {/* Status Toggle (only in Edit mode) */}
                  {editingSupplier && (
                    <div className="sm:col-span-2 flex items-center justify-between p-3 bg-[#FAF8FC] border border-[#E9E4F1] rounded-lg">
                      <div className="space-y-0.5">
                        <div className="text-xs font-semibold text-[#1F1B2D]">Active Status</div>
                        <div className="text-[11px] text-[#625D6B]">
                          Inactive suppliers are preserved non-destructively.
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, isActive: !formData.isActive })
                        }
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                          formData.isActive
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {formData.isActive ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Active
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                            Inactive
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E9E4F1]">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={isSubmitting}
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={isSubmitting}
                    className="bg-[#6D57A5] hover:bg-[#5C498D] text-white"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-1.5">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Saving...
                      </span>
                    ) : editingSupplier ? (
                      'Update Supplier'
                    ) : (
                      'Create Supplier'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
