import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  getAdminWarehouses,
  createAdminWarehouse,
  updateAdminWarehouse,
  updateAdminWarehouseStatus,
  getAdminStockBalances,
  getAdminSingleStockBalance,
  adjustAdminStock,
  getAdminStockMovements,
  type Warehouse,
  type StockBalance,
  type StockMovement,
  type CreateWarehousePayload,
  type UpdateWarehousePayload,
  type StockAdjustmentPayload,
} from '../../services/inventoryService';
import {
  getAdminProducts,
  type Product,
} from '../../services/productService';
import {
  Search,
  Filter,
  RefreshCw,
  LogOut,
  Package,
  Warehouse as WarehouseIcon,
  ArrowUpDown,
  ArrowDownLeft,
  ArrowUpRight,
  History,
  Shield,
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Edit2,
  ToggleLeft,
  ToggleRight,
  FolderPlus,
  MessageSquare,
  Boxes,
} from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const AdminInventoryPage: React.FC = () => {
  const { user, token, logout } = useAuth();

  // Active top-level subtab: 'stock' | 'movements'
  const [activeTab, setActiveTab] = useState<'stock' | 'movements'>('stock');

  // Warehouses state
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  // Stock query state
  const [stockPage, setStockPage] = useState<number>(1);
  const [stockPageSize] = useState<number>(10);
  const [stockSearchInput, setStockSearchInput] = useState<string>('');
  const [stockActiveSearch, setStockActiveSearch] = useState<string>('');
  const [stockWarehouseFilter, setStockWarehouseFilter] = useState<string>('All');

  // Stock balances data state
  const [stockBalances, setStockBalances] = useState<StockBalance[]>([]);
  const [stockTotalCount, setStockTotalCount] = useState<number>(0);
  const [stockTotalPages, setStockTotalPages] = useState<number>(1);
  const [isStockLoading, setIsStockLoading] = useState<boolean>(true);
  const [stockErrorMessage, setStockErrorMessage] = useState<string | null>(null);

  // Movements query state
  const [movementsPage, setMovementsPage] = useState<number>(1);
  const [movementsPageSize] = useState<number>(10);
  const [movementProductFilter, setMovementProductFilter] = useState<string>('All');
  const [movementWarehouseFilter, setMovementWarehouseFilter] = useState<string>('All');
  const [movementTypeFilter, setMovementTypeFilter] = useState<string>('All');

  // Movements data state
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [movementsTotalCount, setMovementsTotalCount] = useState<number>(0);
  const [movementsTotalPages, setMovementsTotalPages] = useState<number>(1);
  const [isMovementsLoading, setIsMovementsLoading] = useState<boolean>(false);
  const [movementsErrorMessage, setMovementsErrorMessage] = useState<string | null>(null);

  // Warehouse Manager Modal state
  const [isWarehouseModalOpen, setIsWarehouseModalOpen] = useState<boolean>(false);
  const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(null);
  const [warehouseFormData, setWarehouseFormData] = useState<{
    name: string;
    code: string;
    description: string;
    isActive: boolean;
  }>({
    name: '',
    code: '',
    description: '',
    isActive: true,
  });
  const [isSubmittingWarehouse, setIsSubmittingWarehouse] = useState<boolean>(false);
  const [warehouseFormError, setWarehouseFormError] = useState<string | null>(null);

  // Stock Adjustment Modal state
  const [isAdjustmentModalOpen, setIsAdjustmentModalOpen] = useState<boolean>(false);
  const [adjustmentFormData, setAdjustmentFormData] = useState<{
    productId: string;
    warehouseId: string;
    direction: 'In' | 'Out';
    quantity: string;
    reason: string;
  }>({
    productId: '',
    warehouseId: '',
    direction: 'In',
    quantity: '1',
    reason: '',
  });
  const [currentAvailableStock, setCurrentAvailableStock] = useState<number | null>(null);
  const [isLoadingBalanceCheck, setIsLoadingBalanceCheck] = useState<boolean>(false);
  const [isSubmittingAdjustment, setIsSubmittingAdjustment] = useState<boolean>(false);
  const [adjustmentError, setAdjustmentError] = useState<string | null>(null);

  // Fetch initial Warehouses & Products list for selectors
  const fetchMetadata = useCallback(async () => {
    if (!token) return;
    try {
      const [whData, prodData] = await Promise.all([
        getAdminWarehouses(token),
        getAdminProducts({ pageSize: 100, isActive: true }, token),
      ]);
      setWarehouses(whData);
      setAllProducts(prodData.items);
    } catch (err) {
      console.error('Failed to load inventory metadata:', err);
    }
  }, [token]);

  // Fetch Stock Balances
  const fetchStockBalances = useCallback(async () => {
    if (!token) return;
    setIsStockLoading(true);
    setStockErrorMessage(null);

    try {
      const res = await getAdminStockBalances(
        {
          page: stockPage,
          pageSize: stockPageSize,
          search: stockActiveSearch,
          warehouseId: stockWarehouseFilter === 'All' ? undefined : stockWarehouseFilter,
        },
        token
      );
      setStockBalances(res.items);
      setStockTotalCount(res.totalCount);
      setStockTotalPages(res.totalPages || 1);
    } catch (err) {
      setStockErrorMessage(err instanceof Error ? err.message : 'Failed to retrieve stock balances.');
    } finally {
      setIsStockLoading(false);
    }
  }, [token, stockPage, stockPageSize, stockActiveSearch, stockWarehouseFilter]);

  // Fetch Stock Movements
  const fetchMovements = useCallback(async () => {
    if (!token) return;
    setIsMovementsLoading(true);
    setMovementsErrorMessage(null);

    try {
      const res = await getAdminStockMovements(
        {
          page: movementsPage,
          pageSize: movementsPageSize,
          productId: movementProductFilter === 'All' ? undefined : movementProductFilter,
          warehouseId: movementWarehouseFilter === 'All' ? undefined : movementWarehouseFilter,
          movementType: movementTypeFilter === 'All' ? undefined : movementTypeFilter,
        },
        token
      );
      setMovements(res.items);
      setMovementsTotalCount(res.totalCount);
      setMovementsTotalPages(res.totalPages || 1);
    } catch (err) {
      setMovementsErrorMessage(err instanceof Error ? err.message : 'Failed to retrieve stock movements.');
    } finally {
      setIsMovementsLoading(false);
    }
  }, [token, movementsPage, movementsPageSize, movementProductFilter, movementWarehouseFilter, movementTypeFilter]);

  useEffect(() => {
    fetchMetadata();
  }, [fetchMetadata]);

  useEffect(() => {
    fetchStockBalances();
  }, [fetchStockBalances]);

  useEffect(() => {
    if (activeTab === 'movements') {
      fetchMovements();
    }
  }, [activeTab, fetchMovements]);

  // Check live balance when product or warehouse changes in Adjustment modal
  useEffect(() => {
    const checkBalance = async () => {
      if (!token || !adjustmentFormData.productId || !adjustmentFormData.warehouseId) {
        setCurrentAvailableStock(null);
        return;
      }
      setIsLoadingBalanceCheck(true);
      try {
        const bal = await getAdminSingleStockBalance(
          adjustmentFormData.productId,
          adjustmentFormData.warehouseId,
          token
        );
        setCurrentAvailableStock(bal.quantity);
      } catch {
        setCurrentAvailableStock(0);
      } finally {
        setIsLoadingBalanceCheck(false);
      }
    };

    if (isAdjustmentModalOpen) {
      checkBalance();
    }
  }, [token, isAdjustmentModalOpen, adjustmentFormData.productId, adjustmentFormData.warehouseId]);

  // Stock search handlers
  const handleStockSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStockPage(1);
    setStockActiveSearch(stockSearchInput);
  };

  const handleClearStockSearch = () => {
    setStockSearchInput('');
    setStockActiveSearch('');
    setStockPage(1);
  };

  // Open Adjustment Modal
  const handleOpenAdjustment = (productId?: string, warehouseId?: string) => {
    const defaultProduct = productId || (allProducts.length > 0 ? allProducts[0].id : '');
    const defaultWarehouse =
      warehouseId ||
      (warehouses.filter((w) => w.isActive).length > 0
        ? warehouses.filter((w) => w.isActive)[0].id
        : '');

    setAdjustmentFormData({
      productId: defaultProduct,
      warehouseId: defaultWarehouse,
      direction: 'In',
      quantity: '1',
      reason: '',
    });
    setAdjustmentError(null);
    setIsAdjustmentModalOpen(true);
  };

  // Submit Stock Adjustment
  const handleSubmitAdjustment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (!adjustmentFormData.productId) {
      setAdjustmentError('Please select a product.');
      return;
    }
    if (!adjustmentFormData.warehouseId) {
      setAdjustmentError('Please select a warehouse.');
      return;
    }
    const qty = parseFloat(adjustmentFormData.quantity);
    if (isNaN(qty) || qty <= 0) {
      setAdjustmentError('Quantity must be a positive number greater than 0.');
      return;
    }
    if (!adjustmentFormData.reason.trim()) {
      setAdjustmentError('Please specify an adjustment reason.');
      return;
    }

    if (
      adjustmentFormData.direction === 'Out' &&
      currentAvailableStock !== null &&
      qty > currentAvailableStock
    ) {
      setAdjustmentError(
        `Insufficient stock! Cannot deduct ${qty}. Current available is ${currentAvailableStock}.`
      );
      return;
    }

    setIsSubmittingAdjustment(true);
    setAdjustmentError(null);

    try {
      const payload: StockAdjustmentPayload = {
        productId: adjustmentFormData.productId,
        warehouseId: adjustmentFormData.warehouseId,
        quantity: qty,
        direction: adjustmentFormData.direction,
        reason: adjustmentFormData.reason.trim(),
      };

      await adjustAdminStock(payload, token);
      setIsAdjustmentModalOpen(false);
      fetchStockBalances();
      fetchMetadata();
      if (activeTab === 'movements') {
        fetchMovements();
      }
    } catch (err) {
      setAdjustmentError(err instanceof Error ? err.message : 'Adjustment failed.');
    } finally {
      setIsSubmittingAdjustment(false);
    }
  };

  // Warehouse Management Handlers
  const handleOpenWarehouseManager = () => {
    setEditingWarehouse(null);
    setWarehouseFormData({ name: '', code: '', description: '', isActive: true });
    setWarehouseFormError(null);
    setIsWarehouseModalOpen(true);
  };

  const handleEditWarehouse = (wh: Warehouse) => {
    setEditingWarehouse(wh);
    setWarehouseFormData({
      name: wh.name,
      code: wh.code,
      description: wh.description || '',
      isActive: wh.isActive,
    });
    setWarehouseFormError(null);
  };

  const handleCancelEditWarehouse = () => {
    setEditingWarehouse(null);
    setWarehouseFormData({ name: '', code: '', description: '', isActive: true });
    setWarehouseFormError(null);
  };

  const handleSubmitWarehouse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (!warehouseFormData.name.trim()) {
      setWarehouseFormError('Warehouse name is required.');
      return;
    }
    if (!warehouseFormData.code.trim()) {
      setWarehouseFormError('Warehouse code is required.');
      return;
    }

    setIsSubmittingWarehouse(true);
    setWarehouseFormError(null);

    try {
      if (editingWarehouse) {
        const payload: UpdateWarehousePayload = {
          name: warehouseFormData.name.trim(),
          code: warehouseFormData.code.trim().toUpperCase(),
          description: warehouseFormData.description.trim() || null,
          isActive: warehouseFormData.isActive,
        };
        await updateAdminWarehouse(editingWarehouse.id, payload, token);
      } else {
        const payload: CreateWarehousePayload = {
          name: warehouseFormData.name.trim(),
          code: warehouseFormData.code.trim().toUpperCase(),
          description: warehouseFormData.description.trim() || null,
        };
        await createAdminWarehouse(payload, token);
      }

      handleCancelEditWarehouse();
      fetchMetadata();
      fetchStockBalances();
    } catch (err) {
      setWarehouseFormError(err instanceof Error ? err.message : 'Operation failed.');
    } finally {
      setIsSubmittingWarehouse(false);
    }
  };

  const handleToggleWarehouseStatus = async (wh: Warehouse) => {
    if (!token) return;
    const newStatus = !wh.isActive;
    try {
      await updateAdminWarehouseStatus(wh.id, newStatus, token);
      fetchMetadata();
      fetchStockBalances();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update warehouse status.');
    }
  };

  const formatQuantity = (val: number, unit: string = '') => {
    return `${new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    }).format(val)} ${unit}`.trim();
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

  const getMovementTypeBadge = (type: number | string) => {
    const typeStr =
      type === 0 || type === 'In' || type === '0'
        ? 'In'
        : type === 1 || type === 'Out' || type === '1'
        ? 'Out'
        : 'Adjustment';

    if (typeStr === 'In') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E4F8F0] text-[#129267] border border-[#17B681]/30">
          <ArrowDownLeft className="w-3 h-3 text-[#17B681]" />
          IN (Stock Addition)
        </span>
      );
    } else if (typeStr === 'Out') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
          <ArrowUpRight className="w-3 h-3 text-rose-500" />
          OUT (Stock Deduction)
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-[#6D57A5] border border-[#E9E4F1]">
          <ArrowUpDown className="w-3 h-3 text-[#6D57A5]" />
          ADJUSTMENT
        </span>
      );
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
              Inventory & Stock Management
            </h1>
            <p className="text-xs text-[#625D6B]">
              Multi-warehouse inventory balances, atomic adjustments, and immutable movement audit trails.
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
              icon={
                <RefreshCw
                  className={`w-3.5 h-3.5 ${isStockLoading || isMovementsLoading ? 'animate-spin' : ''}`}
                />
              }
              onClick={() => {
                fetchMetadata();
                fetchStockBalances();
                if (activeTab === 'movements') fetchMovements();
              }}
              disabled={isStockLoading || isMovementsLoading}
              title="Refresh"
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
        <div className="flex items-center gap-2 border-b border-[#E9E4F1] pb-2">
          <Link
            to="/admin/contact-enquiries"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-[#625D6B] hover:text-[#1F1B2D] hover:bg-[#FAF8FC] transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-[#625D6B]" />
            <span>Contact Enquiries</span>
          </Link>
          <Link
            to="/admin/products"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-[#625D6B] hover:text-[#1F1B2D] hover:bg-[#FAF8FC] transition-colors"
          >
            <Package className="w-4 h-4 text-[#625D6B]" />
            <span>Products & Catalog</span>
          </Link>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-[#6D57A5] bg-[#6D57A5]/10 border border-[#6D57A5]/20 shadow-2xs">
            <Boxes className="w-4 h-4 text-[#6D57A5]" />
            <span>Inventory & Stock</span>
          </div>
        </div>

        {/* Action Bar & Subtab Switcher */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#FAF8FC] p-1 rounded-xl border border-[#E9E4F1]">
              <button
                type="button"
                onClick={() => setActiveTab('stock')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'stock'
                    ? 'bg-white text-[#6D57A5] shadow-xs'
                    : 'text-[#625D6B] hover:text-[#1F1B2D]'
                }`}
              >
                <Boxes className="w-3.5 h-3.5" />
                <span>Stock Balances</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('movements')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'movements'
                    ? 'bg-white text-[#6D57A5] shadow-xs'
                    : 'text-[#625D6B] hover:text-[#1F1B2D]'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Movement History</span>
              </button>
            </div>

            <Button
              variant="outline"
              size="sm"
              icon={<WarehouseIcon className="w-4 h-4 text-[#6D57A5]" />}
              onClick={handleOpenWarehouseManager}
              className="border-[#E9E4F1] hover:bg-[#FAF8FC]"
            >
              Warehouses ({warehouses.length})
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              icon={<ArrowUpDown className="w-4 h-4" />}
              onClick={() => handleOpenAdjustment()}
              className="bg-[#6D57A5] hover:bg-[#5C498D] text-white"
            >
              Adjust Stock (IN / OUT)
            </Button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* VIEW 1: STOCK BALANCES */}
        {/* ======================================================== */}
        {activeTab === 'stock' && (
          <div className="space-y-4">
            {/* Filter and Search Controls */}
            <Card variant="default" className="p-4 sm:p-5 bg-white border border-[#E9E4F1] shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
                {/* Search Input */}
                <form
                  onSubmit={handleStockSearchSubmit}
                  className="flex-1 max-w-md relative flex items-center gap-2"
                >
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Search stock by product name or SKU..."
                      value={stockSearchInput}
                      onChange={(e) => setStockSearchInput(e.target.value)}
                      className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-xs text-[#1F1B2D] placeholder:text-[#625D6B]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6D57A5]/20 focus:border-[#6D57A5]"
                    />
                    <Search className="w-4 h-4 text-[#625D6B]/60 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    {stockSearchInput && (
                      <button
                        type="button"
                        onClick={handleClearStockSearch}
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

                {/* Warehouse Dropdown Filter */}
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-[#625D6B]" />
                  <select
                    value={stockWarehouseFilter}
                    onChange={(e) => {
                      setStockWarehouseFilter(e.target.value);
                      setStockPage(1);
                    }}
                    className="py-1.5 px-3 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] text-xs text-[#1F1B2D] focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
                  >
                    <option value="All">All Warehouses</option>
                    {warehouses.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.name} ({w.code}) {!w.isActive ? '[Inactive]' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>

            {/* Stock Balances Table */}
            <Card variant="default" className="bg-white border border-[#E9E4F1] shadow-xs overflow-hidden">
              {isStockLoading ? (
                <div className="py-20 flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-8 h-8 text-[#6D57A5] animate-spin" />
                  <p className="text-xs text-[#625D6B] font-medium">Loading stock balances...</p>
                </div>
              ) : stockErrorMessage ? (
                <div className="p-8 text-center space-y-3">
                  <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
                  <p className="text-xs text-rose-600 font-medium">{stockErrorMessage}</p>
                  <Button size="sm" variant="outline" onClick={fetchStockBalances}>
                    Try Again
                  </Button>
                </div>
              ) : stockBalances.length === 0 ? (
                <div className="py-16 px-4 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#FAF8FC] border border-[#E9E4F1] flex items-center justify-center mx-auto text-[#6D57A5]">
                    <Boxes className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-[#1F1B2D]">No stock balances found</h3>
                    <p className="text-xs text-[#625D6B] max-w-sm mx-auto">
                      {stockActiveSearch || stockWarehouseFilter !== 'All'
                        ? 'No stock records match your filters. Try clearing your search or warehouse filter.'
                        : 'No stock movements have been recorded yet. Click "Adjust Stock" to enter opening stock.'}
                    </p>
                  </div>
                  {stockActiveSearch || stockWarehouseFilter !== 'All' ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        handleClearStockSearch();
                        setStockWarehouseFilter('All');
                      }}
                    >
                      Clear Filters
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="primary"
                      icon={<ArrowUpDown className="w-4 h-4" />}
                      onClick={() => handleOpenAdjustment()}
                      className="bg-[#6D57A5] hover:bg-[#5C498D] text-white"
                    >
                      Record Opening Stock
                    </Button>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#FAF8FC] border-b border-[#E9E4F1] text-[11px] font-mono uppercase tracking-wider text-[#625D6B]">
                        <th className="py-3 px-4 font-semibold">Product / SKU</th>
                        <th className="py-3 px-4 font-semibold">Warehouse / Location</th>
                        <th className="py-3 px-4 font-semibold text-right">Available Stock</th>
                        <th className="py-3 px-4 font-semibold">Last Movement</th>
                        <th className="py-3 px-4 font-semibold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E9E4F1] text-xs">
                      {stockBalances.map((b) => (
                        <tr key={b.id} className="hover:bg-[#FAF8FC]/70 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="space-y-0.5">
                              <span className="font-bold text-[#1F1B2D] block">{b.productName}</span>
                              <span className="font-mono text-[10px] text-[#6D57A5] font-semibold bg-[#6D57A5]/5 px-1.5 py-0.5 rounded border border-[#6D57A5]/20 inline-block">
                                {b.productSKU}
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1.5">
                              <WarehouseIcon className="w-3.5 h-3.5 text-[#625D6B]" />
                              <span className="font-semibold text-[#1F1B2D]">{b.warehouseName}</span>
                              <span className="text-[10px] font-mono text-[#625D6B] bg-[#FAF8FC] px-1.5 py-0.5 rounded border border-[#E9E4F1]">
                                {b.warehouseCode}
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <span
                              className={`font-mono font-bold text-sm ${
                                b.quantity > 0 ? 'text-[#129267]' : 'text-slate-500'
                              }`}
                            >
                              {formatQuantity(b.quantity, b.productUnit)}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-[#625D6B] text-[11px]">
                            {formatDate(b.updatedAt)}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenAdjustment(b.productId, b.warehouseId)}
                              className="h-7 px-2.5 text-xs text-[#6D57A5] hover:bg-[#6D57A5]/10 border-[#E9E4F1]"
                              icon={<ArrowUpDown className="w-3 h-3" />}
                            >
                              Adjust
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination Footer */}
              {!isStockLoading && stockBalances.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-[#E9E4F1] bg-[#FAF8FC]/50 text-xs">
                  <span className="text-[#625D6B]">
                    Showing <span className="font-bold text-[#1F1B2D]">{stockBalances.length}</span> of{' '}
                    <span className="font-bold text-[#1F1B2D]">{stockTotalCount}</span> records (Page{' '}
                    <span className="font-bold text-[#1F1B2D]">{stockPage}</span> of{' '}
                    <span className="font-bold text-[#1F1B2D]">{stockTotalPages}</span>)
                  </span>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setStockPage((p) => Math.max(1, p - 1))}
                      disabled={stockPage <= 1}
                      icon={<ChevronLeft className="w-3.5 h-3.5" />}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setStockPage((p) => Math.min(stockTotalPages, p + 1))}
                      disabled={stockPage >= stockTotalPages}
                      icon={<ChevronRight className="w-3.5 h-3.5" />}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: MOVEMENT HISTORY */}
        {/* ======================================================== */}
        {activeTab === 'movements' && (
          <div className="space-y-4">
            {/* Filters */}
            <Card variant="default" className="p-4 sm:p-5 bg-white border border-[#E9E4F1] shadow-xs">
              <div className="flex flex-wrap items-center gap-4 justify-between">
                <div className="flex flex-wrap items-center gap-3">
                  {/* Warehouse Filter */}
                  <div className="flex items-center gap-1.5">
                    <WarehouseIcon className="w-3.5 h-3.5 text-[#625D6B]" />
                    <select
                      value={movementWarehouseFilter}
                      onChange={(e) => {
                        setMovementWarehouseFilter(e.target.value);
                        setMovementsPage(1);
                      }}
                      className="py-1.5 px-3 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] text-xs text-[#1F1B2D] focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
                    >
                      <option value="All">All Warehouses</option>
                      {warehouses.map((w) => (
                        <option key={w.id} value={w.id}>
                          {w.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Product Filter */}
                  <div className="flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-[#625D6B]" />
                    <select
                      value={movementProductFilter}
                      onChange={(e) => {
                        setMovementProductFilter(e.target.value);
                        setMovementsPage(1);
                      }}
                      className="py-1.5 px-3 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] text-xs text-[#1F1B2D] focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
                    >
                      <option value="All">All Products</option>
                      {allProducts.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.sku})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Movement Type Filter */}
                  <div className="flex items-center gap-1.5">
                    <Filter className="w-3.5 h-3.5 text-[#625D6B]" />
                    <select
                      value={movementTypeFilter}
                      onChange={(e) => {
                        setMovementTypeFilter(e.target.value);
                        setMovementsPage(1);
                      }}
                      className="py-1.5 px-3 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] text-xs text-[#1F1B2D] focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
                    >
                      <option value="All">All Movement Types</option>
                      <option value="0">IN Movements</option>
                      <option value="1">OUT Movements</option>
                      <option value="2">Adjustments</option>
                    </select>
                  </div>
                </div>

                <div className="text-xs text-[#625D6B]">
                  Total Movements: <span className="font-bold text-[#1F1B2D]">{movementsTotalCount}</span>
                </div>
              </div>
            </Card>

            {/* Movements Table */}
            <Card variant="default" className="bg-white border border-[#E9E4F1] shadow-xs overflow-hidden">
              {isMovementsLoading ? (
                <div className="py-20 flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-8 h-8 text-[#6D57A5] animate-spin" />
                  <p className="text-xs text-[#625D6B] font-medium">Loading movement history...</p>
                </div>
              ) : movementsErrorMessage ? (
                <div className="p-8 text-center space-y-3">
                  <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
                  <p className="text-xs text-rose-600 font-medium">{movementsErrorMessage}</p>
                  <Button size="sm" variant="outline" onClick={fetchMovements}>
                    Try Again
                  </Button>
                </div>
              ) : movements.length === 0 ? (
                <div className="py-16 px-4 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#FAF8FC] border border-[#E9E4F1] flex items-center justify-center mx-auto text-[#6D57A5]">
                    <History className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-[#1F1B2D]">No movement records found</h3>
                  <p className="text-xs text-[#625D6B]">
                    No stock movements matched your filter criteria.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#FAF8FC] border-b border-[#E9E4F1] text-[11px] font-mono uppercase tracking-wider text-[#625D6B]">
                        <th className="py-3 px-4 font-semibold">Date & Time</th>
                        <th className="py-3 px-4 font-semibold">Item / SKU</th>
                        <th className="py-3 px-4 font-semibold">Warehouse</th>
                        <th className="py-3 px-4 font-semibold">Movement Type</th>
                        <th className="py-3 px-4 font-semibold text-right">Quantity</th>
                        <th className="py-3 px-4 font-semibold text-right">Balance After</th>
                        <th className="py-3 px-4 font-semibold">Reason</th>
                        <th className="py-3 px-4 font-semibold">Recorded By</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E9E4F1] text-xs">
                      {movements.map((m) => (
                        <tr key={m.id} className="hover:bg-[#FAF8FC]/70 transition-colors">
                          <td className="py-3.5 px-4 font-mono text-[11px] text-[#625D6B]">
                            {formatDate(m.createdAt)}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="space-y-0.5">
                              <span className="font-bold text-[#1F1B2D] block">{m.productName}</span>
                              <span className="font-mono text-[10px] text-[#6D57A5]">
                                {m.productSKU}
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-[#1F1B2D]">{m.warehouseName}</span>
                            <span className="block text-[10px] font-mono text-[#625D6B]">
                              {m.warehouseCode}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">{getMovementTypeBadge(m.movementType)}</td>
                          <td className="py-3.5 px-4 text-right font-mono font-bold">
                            {formatQuantity(m.quantity, m.productUnit)}
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono font-semibold text-[#1F1B2D]">
                            {formatQuantity(m.balanceAfter, m.productUnit)}
                          </td>
                          <td className="py-3.5 px-4 text-[#1F1B2D] max-w-xs truncate" title={m.reason}>
                            {m.reason}
                          </td>
                          <td className="py-3.5 px-4 text-[11px] text-[#625D6B]">
                            {m.createdByUserName || 'Administrator'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              {!isMovementsLoading && movements.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-[#E9E4F1] bg-[#FAF8FC]/50 text-xs">
                  <span className="text-[#625D6B]">
                    Page <span className="font-bold text-[#1F1B2D]">{movementsPage}</span> of{' '}
                    <span className="font-bold text-[#1F1B2D]">{movementsTotalPages}</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setMovementsPage((p) => Math.max(1, p - 1))}
                      disabled={movementsPage <= 1}
                      icon={<ChevronLeft className="w-3.5 h-3.5" />}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setMovementsPage((p) => Math.min(movementsTotalPages, p + 1))}
                      disabled={movementsPage >= movementsTotalPages}
                      icon={<ChevronRight className="w-3.5 h-3.5" />}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}
      </Container>

      {/* ======================================================== */}
      {/* STOCK ADJUSTMENT MODAL */}
      {/* ======================================================== */}
      {isAdjustmentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl border border-[#E9E4F1] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#E9E4F1] bg-[#FAF8FC]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#6D57A5] text-white flex items-center justify-center">
                  <ArrowUpDown className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1F1B2D]">Stock Adjustment</h3>
                  <p className="text-[11px] text-[#625D6B]">Atomic stock adjustment with movement audit trail.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAdjustmentModalOpen(false)}
                className="text-[#625D6B] hover:text-[#1F1B2D] p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmitAdjustment} className="p-5 overflow-y-auto space-y-4">
              {adjustmentError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{adjustmentError}</span>
                </div>
              )}

              {/* Product Select */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1F1B2D]">
                  Select Product <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={adjustmentFormData.productId}
                  onChange={(e) =>
                    setAdjustmentFormData({ ...adjustmentFormData, productId: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
                >
                  <option value="">-- Choose Product --</option>
                  {allProducts.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.sku})
                    </option>
                  ))}
                </select>
              </div>

              {/* Warehouse Select */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1F1B2D]">
                  Select Warehouse <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={adjustmentFormData.warehouseId}
                  onChange={(e) =>
                    setAdjustmentFormData({ ...adjustmentFormData, warehouseId: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
                >
                  <option value="">-- Choose Warehouse --</option>
                  {warehouses
                    .filter((w) => w.isActive)
                    .map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.name} ({w.code})
                      </option>
                    ))}
                </select>
              </div>

              {/* Available Stock Indicator */}
              <div className="p-3 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] flex items-center justify-between">
                <span className="text-xs text-[#625D6B] font-medium">Current Stock in Warehouse:</span>
                <span className="font-mono font-bold text-sm text-[#1F1B2D]">
                  {isLoadingBalanceCheck ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#6D57A5]" />
                  ) : currentAvailableStock !== null ? (
                    formatQuantity(currentAvailableStock)
                  ) : (
                    '—'
                  )}
                </span>
              </div>

              {/* Adjustment Direction Toggle */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1F1B2D]">
                  Adjustment Direction <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setAdjustmentFormData({ ...adjustmentFormData, direction: 'In' })
                    }
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                      adjustmentFormData.direction === 'In'
                        ? 'bg-[#E4F8F0] border-[#17B681] text-[#129267] ring-2 ring-[#17B681]/20'
                        : 'bg-white border-[#E9E4F1] text-[#625D6B] hover:bg-[#FAF8FC]'
                    }`}
                  >
                    <ArrowDownLeft className="w-4 h-4 text-[#17B681]" />
                    <span>STOCK IN (+)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setAdjustmentFormData({ ...adjustmentFormData, direction: 'Out' })
                    }
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                      adjustmentFormData.direction === 'Out'
                        ? 'bg-rose-50 border-rose-400 text-rose-700 ring-2 ring-rose-400/20'
                        : 'bg-white border-[#E9E4F1] text-[#625D6B] hover:bg-[#FAF8FC]'
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4 text-rose-500" />
                    <span>STOCK OUT (-)</span>
                  </button>
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1F1B2D]">
                  Quantity to Adjust <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.001"
                  min="0.001"
                  required
                  placeholder="e.g. 10"
                  value={adjustmentFormData.quantity}
                  onChange={(e) =>
                    setAdjustmentFormData({ ...adjustmentFormData, quantity: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
                />
              </div>

              {/* Reason */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1F1B2D]">
                  Reason / Audit Note <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Opening stock, physical inventory correction..."
                  value={adjustmentFormData.reason}
                  onChange={(e) =>
                    setAdjustmentFormData({ ...adjustmentFormData, reason: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#E9E4F1]">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAdjustmentModalOpen(false)}
                  disabled={isSubmittingAdjustment}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={isSubmittingAdjustment}
                  icon={
                    isSubmittingAdjustment ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    )
                  }
                  className="bg-[#6D57A5] hover:bg-[#5C498D] text-white"
                >
                  {isSubmittingAdjustment ? 'Executing...' : 'Post Adjustment'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* WAREHOUSE MANAGER MODAL */}
      {/* ======================================================== */}
      {isWarehouseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white rounded-2xl border border-[#E9E4F1] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#E9E4F1] bg-[#FAF8FC]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#6D57A5] text-white flex items-center justify-center">
                  <WarehouseIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1F1B2D]">Warehouse Locations</h3>
                  <p className="text-[11px] text-[#625D6B]">
                    Manage distribution locations. Warehouses cannot be permanently deleted.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsWarehouseModalOpen(false)}
                className="text-[#625D6B] hover:text-[#1F1B2D] p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-6">
              {/* Form */}
              <form
                onSubmit={handleSubmitWarehouse}
                className="p-4 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1F1B2D] flex items-center gap-1.5">
                    <FolderPlus className="w-3.5 h-3.5 text-[#6D57A5]" />
                    {editingWarehouse ? `Edit Warehouse: ${editingWarehouse.name}` : 'Create New Warehouse'}
                  </span>
                  {editingWarehouse && (
                    <button
                      type="button"
                      onClick={handleCancelEditWarehouse}
                      className="text-[11px] text-[#625D6B] hover:text-[#1F1B2D] underline"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                {warehouseFormError && (
                  <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{warehouseFormError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-[#1F1B2D]">Warehouse Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Central Distribution Hub"
                      value={warehouseFormData.name}
                      onChange={(e) =>
                        setWarehouseFormData({ ...warehouseFormData, name: e.target.value })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-lg bg-white border border-[#E9E4F1] focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-[#1F1B2D]">Unique Code *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. WH-MAIN-01"
                      value={warehouseFormData.code}
                      onChange={(e) =>
                        setWarehouseFormData({ ...warehouseFormData, code: e.target.value })
                      }
                      className="w-full px-3 py-1.5 text-xs font-mono uppercase rounded-lg bg-white border border-[#E9E4F1] focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-[#1F1B2D]">Description / Address</label>
                  <input
                    type="text"
                    placeholder="Optional address, contact, notes..."
                    value={warehouseFormData.description}
                    onChange={(e) =>
                      setWarehouseFormData({ ...warehouseFormData, description: e.target.value })
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-white border border-[#E9E4F1] focus:outline-none focus:ring-1 focus:ring-[#6D57A5]"
                  />
                </div>

                {editingWarehouse && (
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="whActive"
                      checked={warehouseFormData.isActive}
                      onChange={(e) =>
                        setWarehouseFormData({ ...warehouseFormData, isActive: e.target.checked })
                      }
                      className="rounded border-[#E9E4F1] text-[#6D57A5] focus:ring-[#6D57A5]"
                    />
                    <label htmlFor="whActive" className="text-xs font-medium text-[#1F1B2D]">
                      Warehouse is active
                    </label>
                  </div>
                )}

                <div className="flex justify-end pt-1">
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={isSubmittingWarehouse}
                    icon={
                      isSubmittingWarehouse ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      )
                    }
                    className="bg-[#6D57A5] hover:bg-[#5C498D] text-white"
                  >
                    {isSubmittingWarehouse
                      ? 'Saving...'
                      : editingWarehouse
                      ? 'Save Changes'
                      : 'Add Warehouse'}
                  </Button>
                </div>
              </form>

              {/* Warehouse List */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#625D6B] font-bold">
                  Existing Warehouses ({warehouses.length})
                </span>

                {warehouses.length === 0 ? (
                  <p className="text-xs text-[#625D6B] italic py-3 text-center">
                    No warehouses defined yet. Create your first warehouse above.
                  </p>
                ) : (
                  <div className="divide-y divide-[#E9E4F1] border border-[#E9E4F1] rounded-xl overflow-hidden">
                    {warehouses.map((w) => (
                      <div
                        key={w.id}
                        className="p-3 bg-white flex items-center justify-between gap-3 hover:bg-[#FAF8FC] transition-colors"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#1F1B2D]">{w.name}</span>
                            <span className="font-mono text-[10px] text-[#6D57A5] bg-[#6D57A5]/5 px-1.5 py-0.5 rounded border border-[#6D57A5]/20 font-semibold">
                              {w.code}
                            </span>
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${
                                w.isActive
                                  ? 'bg-[#E4F8F0] text-[#129267] border-[#17B681]/30'
                                  : 'bg-slate-100 text-slate-500 border-slate-200'
                              }`}
                            >
                              {w.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          {w.description && (
                            <p className="text-[11px] text-[#625D6B]">{w.description}</p>
                          )}
                          <span className="text-[10px] text-[#625D6B] font-mono">
                            {w.totalProductsInStock} items stocked | Total Qty: {w.totalStockQuantity}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditWarehouse(w)}
                            className="h-7 px-2 text-[#6D57A5] hover:bg-[#6D57A5]/10"
                            title="Edit Warehouse"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleWarehouseStatus(w)}
                            className={`h-7 px-2 ${
                              w.isActive
                                ? 'text-amber-600 hover:bg-amber-50'
                                : 'text-[#17B681] hover:bg-[#E4F8F0]'
                            }`}
                            title={w.isActive ? 'Deactivate Warehouse' : 'Activate Warehouse'}
                          >
                            {w.isActive ? (
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
                onClick={() => setIsWarehouseModalOpen(false)}
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
