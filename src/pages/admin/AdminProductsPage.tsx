import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  getAdminProducts,
  getAdminProductCategories,
  createAdminProduct,
  updateAdminProduct,
  updateAdminProductStatus,
  createAdminProductCategory,
  updateAdminProductCategory,
  updateAdminProductCategoryStatus,
  type Product,
  type ProductCategory,
  type CreateProductPayload,
  type UpdateProductPayload,
} from '../../services/productService';
import {
  Search,
  Filter,
  RefreshCw,
  LogOut,
  Package,
  Layers,
  Plus,
  Edit2,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Shield,
  Loader2,
  Tag,
  ToggleLeft,
  ToggleRight,
  MessageSquare,
  Boxes,
  Users,
  Truck,
  FolderPlus,
} from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const AdminProductsPage: React.FC = () => {
  const { user, token, logout } = useAuth();

  // Products query state
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [searchInput, setSearchInput] = useState<string>('');
  const [activeSearch, setActiveSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Products data state
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Product modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productFormData, setProductFormData] = useState<{
    name: string;
    sku: string;
    description: string;
    categoryId: string;
    unit: string;
    costPrice: string;
    sellingPrice: string;
    isActive: boolean;
  }>({
    name: '',
    sku: '',
    description: '',
    categoryId: '',
    unit: 'Piece',
    costPrice: '0',
    sellingPrice: '0',
    isActive: true,
  });
  const [isSubmittingProduct, setIsSubmittingProduct] = useState<boolean>(false);
  const [productFormError, setProductFormError] = useState<string | null>(null);

  // Category Manager modal state
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null);
  const [categoryFormData, setCategoryFormData] = useState<{
    name: string;
    description: string;
    isActive: boolean;
  }>({
    name: '',
    description: '',
    isActive: true,
  });
  const [isSubmittingCategory, setIsSubmittingCategory] = useState<boolean>(false);
  const [categoryFormError, setCategoryFormError] = useState<string | null>(null);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    if (!token) return;
    try {
      const data = await getAdminProductCategories(token);
      setCategories(data);
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  }, [token]);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await getAdminProducts(
        {
          page,
          pageSize,
          search: activeSearch,
          categoryId: selectedCategory === 'All' ? undefined : selectedCategory,
          isActive: selectedStatus === 'All' ? undefined : selectedStatus === 'Active',
        },
        token
      );
      setProducts(res.items);
      setTotalCount(res.totalCount);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to retrieve products.');
    } finally {
      setIsLoading(false);
    }
  }, [token, page, pageSize, activeSearch, selectedCategory, selectedStatus]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Search handler
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

  // Open Create Product Modal
  const handleOpenCreateProduct = () => {
    setEditingProduct(null);
    setProductFormData({
      name: '',
      sku: '',
      description: '',
      categoryId: '',
      unit: 'Piece',
      costPrice: '0',
      sellingPrice: '0',
      isActive: true,
    });
    setProductFormError(null);
    setIsProductModalOpen(true);
  };

  // Open Edit Product Modal
  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductFormData({
      name: prod.name,
      sku: prod.sku,
      description: prod.description || '',
      categoryId: prod.categoryId || '',
      unit: prod.unit,
      costPrice: prod.costPrice.toString(),
      sellingPrice: prod.sellingPrice.toString(),
      isActive: prod.isActive,
    });
    setProductFormError(null);
    setIsProductModalOpen(true);
  };

  // Submit Product Create / Edit
  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (!productFormData.name.trim()) {
      setProductFormError('Product name is required.');
      return;
    }
    if (!productFormData.sku.trim()) {
      setProductFormError('SKU is required.');
      return;
    }
    const cost = parseFloat(productFormData.costPrice);
    const selling = parseFloat(productFormData.sellingPrice);
    if (isNaN(cost) || cost < 0) {
      setProductFormError('Cost price must be a valid number >= 0.');
      return;
    }
    if (isNaN(selling) || selling < 0) {
      setProductFormError('Selling price must be a valid number >= 0.');
      return;
    }

    setIsSubmittingProduct(true);
    setProductFormError(null);

    try {
      if (editingProduct) {
        const payload: UpdateProductPayload = {
          name: productFormData.name.trim(),
          sku: productFormData.sku.trim(),
          description: productFormData.description.trim() || null,
          categoryId: productFormData.categoryId ? productFormData.categoryId : null,
          unit: productFormData.unit.trim(),
          costPrice: cost,
          sellingPrice: selling,
          isActive: productFormData.isActive,
        };
        await updateAdminProduct(editingProduct.id, payload, token);
      } else {
        const payload: CreateProductPayload = {
          name: productFormData.name.trim(),
          sku: productFormData.sku.trim(),
          description: productFormData.description.trim() || null,
          categoryId: productFormData.categoryId ? productFormData.categoryId : null,
          unit: productFormData.unit.trim(),
          costPrice: cost,
          sellingPrice: selling,
        };
        await createAdminProduct(payload, token);
      }

      setIsProductModalOpen(false);
      fetchProducts();
      fetchCategories();
    } catch (err) {
      setProductFormError(err instanceof Error ? err.message : 'Operation failed.');
    } finally {
      setIsSubmittingProduct(false);
    }
  };

  // Toggle Product Active Status
  const handleToggleProductStatus = async (prod: Product) => {
    if (!token) return;
    const newStatus = !prod.isActive;
    try {
      await updateAdminProductStatus(prod.id, newStatus, token);
      setProducts((prev) =>
        prev.map((p) => (p.id === prod.id ? { ...p, isActive: newStatus } : p))
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update status.');
    }
  };

  // Category Manager Handlers
  const handleOpenCategoryManager = () => {
    setEditingCategory(null);
    setCategoryFormData({ name: '', description: '', isActive: true });
    setCategoryFormError(null);
    setIsCategoryModalOpen(true);
  };

  const handleEditCategory = (cat: ProductCategory) => {
    setEditingCategory(cat);
    setCategoryFormData({
      name: cat.name,
      description: cat.description || '',
      isActive: cat.isActive,
    });
    setCategoryFormError(null);
  };

  const handleCancelEditCategory = () => {
    setEditingCategory(null);
    setCategoryFormData({ name: '', description: '', isActive: true });
    setCategoryFormError(null);
  };

  const handleSubmitCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    if (!categoryFormData.name.trim()) {
      setCategoryFormError('Category name is required.');
      return;
    }

    setIsSubmittingCategory(true);
    setCategoryFormError(null);

    try {
      if (editingCategory) {
        await updateAdminProductCategory(
          editingCategory.id,
          {
            name: categoryFormData.name.trim(),
            description: categoryFormData.description.trim() || null,
            isActive: categoryFormData.isActive,
          },
          token
        );
      } else {
        await createAdminProductCategory(
          {
            name: categoryFormData.name.trim(),
            description: categoryFormData.description.trim() || null,
          },
          token
        );
      }

      handleCancelEditCategory();
      fetchCategories();
      fetchProducts();
    } catch (err) {
      setCategoryFormError(err instanceof Error ? err.message : 'Operation failed.');
    } finally {
      setIsSubmittingCategory(false);
    }
  };

  const handleToggleCategoryStatus = async (cat: ProductCategory) => {
    if (!token) return;
    const newStatus = !cat.isActive;
    try {
      await updateAdminProductCategoryStatus(cat.id, newStatus, token);
      fetchCategories();
      fetchProducts();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update status.');
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(val);
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
              Product & Item Catalog
            </h1>
            <p className="text-xs text-[#625D6B]">
              Manage ERP product masters, categories, units, and active pricing foundations.
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
              onClick={() => {
                fetchProducts();
                fetchCategories();
              }}
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
          <Link
            to="/admin/contact-enquiries"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-[#625D6B] hover:text-[#1F1B2D] hover:bg-[#FAF8FC] transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-[#625D6B]" />
            <span>Contact Enquiries</span>
          </Link>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold text-[#6D57A5] bg-[#6D57A5]/10 border border-[#6D57A5]/20 shadow-2xs">
            <Package className="w-4 h-4 text-[#6D57A5]" />
            <span>Products & Catalog</span>
          </div>
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

        {/* Action Bar & Stats */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              onClick={handleOpenCreateProduct}
              className="bg-[#6D57A5] hover:bg-[#5C498D] text-white"
            >
              Add Product
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={<Layers className="w-4 h-4 text-[#6D57A5]" />}
              onClick={handleOpenCategoryManager}
              className="border-[#E9E4F1] hover:bg-[#FAF8FC]"
            >
              Manage Categories ({categories.length})
            </Button>
          </div>

          <div className="text-xs text-[#625D6B]">
            Showing <span className="font-bold text-[#1F1B2D]">{products.length}</span> of{' '}
            <span className="font-bold text-[#1F1B2D]">{totalCount}</span> items
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
                  placeholder="Search by product name or SKU..."
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

            {/* Dropdown Filters */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Category Filter */}
              <div className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#625D6B]" />
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setPage(1);
                  }}
                  className="py-1.5 px-3 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] text-xs text-[#1F1B2D] focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
                >
                  <option value="All">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} {!cat.isActive ? '(Inactive)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5">
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
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* Products Table Card */}
        <Card variant="default" className="bg-white border border-[#E9E4F1] shadow-xs overflow-hidden">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 text-[#6D57A5] animate-spin" />
              <p className="text-xs text-[#625D6B] font-medium">Loading catalog items...</p>
            </div>
          ) : errorMessage ? (
            <div className="p-8 text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
              <p className="text-xs text-rose-600 font-medium">{errorMessage}</p>
              <Button size="sm" variant="outline" onClick={fetchProducts}>
                Try Again
              </Button>
            </div>
          ) : products.length === 0 ? (
            <div className="py-16 px-4 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#FAF8FC] border border-[#E9E4F1] flex items-center justify-center mx-auto text-[#6D57A5]">
                <Package className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#1F1B2D]">No products found</h3>
                <p className="text-xs text-[#625D6B] max-w-sm mx-auto">
                  {activeSearch || selectedCategory !== 'All' || selectedStatus !== 'All'
                    ? 'No products match your active search filters. Try clearing filters or search term.'
                    : 'Your catalog is currently empty. Click "Add Product" to create your first item.'}
                </p>
              </div>
              {activeSearch || selectedCategory !== 'All' || selectedStatus !== 'All' ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    handleClearSearch();
                    setSelectedCategory('All');
                    setSelectedStatus('All');
                  }}
                >
                  Clear All Filters
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="primary"
                  icon={<Plus className="w-4 h-4" />}
                  onClick={handleOpenCreateProduct}
                >
                  Create First Product
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FAF8FC] border-b border-[#E9E4F1] text-[11px] font-mono uppercase tracking-wider text-[#625D6B]">
                    <th className="py-3 px-4 font-semibold">SKU / Item</th>
                    <th className="py-3 px-4 font-semibold">Category</th>
                    <th className="py-3 px-4 font-semibold">Unit</th>
                    <th className="py-3 px-4 font-semibold text-right">Cost Price</th>
                    <th className="py-3 px-4 font-semibold text-right">Selling Price</th>
                    <th className="py-3 px-4 font-semibold text-center">Status</th>
                    <th className="py-3 px-4 font-semibold">Created</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9E4F1] text-xs">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#FAF8FC]/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5">
                          <span className="font-bold text-[#1F1B2D] block">{p.name}</span>
                          <span className="font-mono text-[10px] text-[#6D57A5] font-semibold bg-[#6D57A5]/5 px-1.5 py-0.5 rounded border border-[#6D57A5]/20 inline-block">
                            {p.sku}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        {p.categoryName ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-purple-50 text-[#6D57A5] border border-[#E9E4F1]">
                            {p.categoryName}
                          </span>
                        ) : (
                          <span className="text-[#625D6B]/60 italic text-[11px]">Unassigned</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#625D6B]">{p.unit}</td>
                      <td className="py-3.5 px-4 text-right font-mono text-[#625D6B]">
                        {formatCurrency(p.costPrice)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-[#1F1B2D]">
                        {formatCurrency(p.sellingPrice)}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            p.isActive
                              ? 'bg-[#E4F8F0] text-[#129267] border-[#17B681]/30'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              p.isActive ? 'bg-[#17B681]' : 'bg-slate-400'
                            }`}
                          />
                          {p.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#625D6B] text-[11px]">
                        {formatDate(p.createdAt)}
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenEditProduct(p)}
                          className="h-7 px-2 text-[#6D57A5] hover:bg-[#6D57A5]/10"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleProductStatus(p)}
                          className={`h-7 px-2 ${
                            p.isActive
                              ? 'text-amber-600 hover:bg-amber-50'
                              : 'text-[#17B681] hover:bg-[#E4F8F0]'
                          }`}
                          title={p.isActive ? 'Deactivate Product' : 'Activate Product'}
                        >
                          {p.isActive ? (
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
          {!isLoading && products.length > 0 && (
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

      {/* CREATE / EDIT PRODUCT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-[#E9E4F1] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#E9E4F1] bg-[#FAF8FC]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#6D57A5] text-white flex items-center justify-center">
                  <Package className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#1F1B2D]">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="text-[#625D6B] hover:text-[#1F1B2D] p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmitProduct} className="p-5 overflow-y-auto space-y-4">
              {productFormError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{productFormError}</span>
                </div>
              )}

              {/* Name & SKU */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1F1B2D]">
                    Product Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Standard Laser Toner"
                    value={productFormData.name}
                    onChange={(e) =>
                      setProductFormData({ ...productFormData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1F1B2D]">
                    SKU Code <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PRD-TNR-001"
                    value={productFormData.sku}
                    onChange={(e) =>
                      setProductFormData({ ...productFormData, sku: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs font-mono uppercase rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
                  />
                </div>
              </div>

              {/* Category & Unit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1F1B2D]">Category</label>
                  <select
                    value={productFormData.categoryId}
                    onChange={(e) =>
                      setProductFormData({ ...productFormData, categoryId: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
                  >
                    <option value="">None / Unassigned</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} {!c.isActive ? '(Inactive)' : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1F1B2D]">
                    Unit of Measurement <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Piece, Box, Kg, Hour, Litre..."
                    value={productFormData.unit}
                    onChange={(e) =>
                      setProductFormData({ ...productFormData, unit: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
                  />
                </div>
              </div>

              {/* Cost Price & Selling Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1F1B2D]">Cost Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={productFormData.costPrice}
                    onChange={(e) =>
                      setProductFormData({ ...productFormData, costPrice: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1F1B2D]">
                    Selling Price ($) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={productFormData.sellingPrice}
                    onChange={(e) =>
                      setProductFormData({ ...productFormData, sellingPrice: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1F1B2D]">Description</label>
                <textarea
                  rows={3}
                  placeholder="Optional item details, specifications, notes..."
                  value={productFormData.description}
                  onChange={(e) =>
                    setProductFormData({ ...productFormData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
                />
              </div>

              {/* IsActive (only shown when editing) */}
              {editingProduct && (
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="isActiveCheckbox"
                    checked={productFormData.isActive}
                    onChange={(e) =>
                      setProductFormData({ ...productFormData, isActive: e.target.checked })
                    }
                    className="rounded border-[#E9E4F1] text-[#6D57A5] focus:ring-[#6D57A5]"
                  />
                  <label htmlFor="isActiveCheckbox" className="text-xs font-medium text-[#1F1B2D]">
                    Product is active and available for quotation / sales
                  </label>
                </div>
              )}

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#E9E4F1]">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsProductModalOpen(false)}
                  disabled={isSubmittingProduct}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={isSubmittingProduct}
                  icon={
                    isSubmittingProduct ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    )
                  }
                  className="bg-[#6D57A5] hover:bg-[#5C498D] text-white"
                >
                  {isSubmittingProduct
                    ? 'Saving...'
                    : editingProduct
                    ? 'Update Product'
                    : 'Save Product'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CATEGORY MANAGER MODAL */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white rounded-2xl border border-[#E9E4F1] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#E9E4F1] bg-[#FAF8FC]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#6D57A5] text-white flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1F1B2D]">Product Categories</h3>
                  <p className="text-[11px] text-[#625D6B]">
                    Define groupings for your items. Categories cannot be permanently deleted.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(false)}
                className="text-[#625D6B] hover:text-[#1F1B2D] p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-6">
              {/* Category Add/Edit Form */}
              <form
                onSubmit={handleSubmitCategory}
                className="p-4 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1F1B2D] flex items-center gap-1.5">
                    <FolderPlus className="w-3.5 h-3.5 text-[#6D57A5]" />
                    {editingCategory ? `Edit Category: ${editingCategory.name}` : 'Create New Category'}
                  </span>
                  {editingCategory && (
                    <button
                      type="button"
                      onClick={handleCancelEditCategory}
                      className="text-[11px] text-[#625D6B] hover:text-[#1F1B2D] underline"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                {categoryFormError && (
                  <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{categoryFormError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-[#1F1B2D]">Category Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hardware, Services..."
                      value={categoryFormData.name}
                      onChange={(e) =>
                        setCategoryFormData({ ...categoryFormData, name: e.target.value })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-lg bg-white border border-[#E9E4F1] focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-[#1F1B2D]">Description</label>
                    <input
                      type="text"
                      placeholder="Optional notes..."
                      value={categoryFormData.description}
                      onChange={(e) =>
                        setCategoryFormData({ ...categoryFormData, description: e.target.value })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-lg bg-white border border-[#E9E4F1] focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
                    />
                  </div>
                </div>

                {editingCategory && (
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="catActive"
                      checked={categoryFormData.isActive}
                      onChange={(e) =>
                        setCategoryFormData({ ...categoryFormData, isActive: e.target.checked })
                      }
                      className="rounded border-[#E9E4F1] text-[#6D57A5] focus:ring-[#6D57A5]"
                    />
                    <label htmlFor="catActive" className="text-xs font-medium text-[#1F1B2D]">
                      Category is active
                    </label>
                  </div>
                )}

                <div className="flex justify-end pt-1">
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={isSubmittingCategory}
                    icon={
                      isSubmittingCategory ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      )
                    }
                    className="bg-[#6D57A5] hover:bg-[#5C498D] text-white"
                  >
                    {isSubmittingCategory
                      ? 'Saving...'
                      : editingCategory
                      ? 'Save Changes'
                      : 'Add Category'}
                  </Button>
                </div>
              </form>

              {/* Categories Existing List */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#625D6B] font-bold">
                  Existing Categories ({categories.length})
                </span>

                {categories.length === 0 ? (
                  <p className="text-xs text-[#625D6B] italic py-3 text-center">
                    No categories created yet.
                  </p>
                ) : (
                  <div className="divide-y divide-[#E9E4F1] border border-[#E9E4F1] rounded-xl overflow-hidden">
                    {categories.map((c) => (
                      <div
                        key={c.id}
                        className="p-3 bg-white flex items-center justify-between gap-3 hover:bg-[#FAF8FC] transition-colors"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#1F1B2D]">{c.name}</span>
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${
                                c.isActive
                                  ? 'bg-[#E4F8F0] text-[#129267] border-[#17B681]/30'
                                  : 'bg-slate-100 text-slate-500 border-slate-200'
                              }`}
                            >
                              {c.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          {c.description && (
                            <p className="text-[11px] text-[#625D6B]">{c.description}</p>
                          )}
                          <span className="text-[10px] text-[#625D6B] font-mono">
                            {c.productCount} product{c.productCount === 1 ? '' : 's'} assigned
                          </span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditCategory(c)}
                            className="h-7 px-2 text-[#6D57A5] hover:bg-[#6D57A5]/10"
                            title="Edit Category"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleCategoryStatus(c)}
                            className={`h-7 px-2 ${
                              c.isActive
                                ? 'text-amber-600 hover:bg-amber-50'
                                : 'text-[#17B681] hover:bg-[#E4F8F0]'
                            }`}
                            title={c.isActive ? 'Deactivate Category' : 'Activate Category'}
                          >
                            {c.isActive ? (
                              <ToggleRight className="w-4 h-4" />
                            ) : (
                              <ToggleLeft className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#E9E4F1] bg-[#FAF8FC] flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCategoryModalOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
