import { useState } from 'react';
import { mockDeputies } from '@/data/mockDeputies';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Search, Filter, Download } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Mock expense data
const mockExpenses = [
  { id: '1', deputyId: '1', deputyName: 'Maria Silva Santos', category: 'Hospedagem', amount: 3200.50, date: '2025-01-15', provider: 'Hotel Brasília', description: 'Hospedagem - 3 diárias' },
  { id: '2', deputyId: '2', deputyName: 'João Carlos Oliveira', category: 'Passagens Aéreas', amount: 1800.00, date: '2025-01-14', provider: 'Companhia Aérea', description: 'São Paulo - Brasília' },
  { id: '3', deputyId: '3', deputyName: 'Ana Beatriz Costa', category: 'Alimentação', amount: 450.75, date: '2025-01-13', provider: 'Restaurante Central', description: 'Almoço institucional' },
  { id: '4', deputyId: '4', deputyName: 'Carlos Eduardo Mendes', category: 'Combustível', amount: 1200.00, date: '2025-01-12', provider: 'Posto Shell', description: 'Abastecimento veículos' },
  { id: '5', deputyId: '5', deputyName: 'Fernanda Rodrigues', category: 'Consultoria', amount: 5600.00, date: '2025-01-11', provider: 'Consultoria Técnica Ltda', description: 'Assessoria especializada' },
];

const categories = ['Todas', 'Hospedagem', 'Passagens Aéreas', 'Alimentação', 'Combustível', 'Consultoria'];
const states = ['Todos', 'SP', 'MG', 'RJ', 'RS', 'PR', 'PE', 'BA', 'SC', 'GO', 'MT'];

export default function Explore() {
  const [filters, setFilters] = useState({
    search: '',
    category: 'Todas',
    state: 'Todos',
    minAmount: '',
    maxAmount: '',
    startDate: null as Date | null,
    endDate: null as Date | null,
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const filteredExpenses = mockExpenses.filter(expense => {
    const deputy = mockDeputies.find(d => d.id === expense.deputyId);
    if (!deputy) return false;

    // Search filter
    if (filters.search && !expense.deputyName.toLowerCase().includes(filters.search.toLowerCase()) &&
        !expense.provider.toLowerCase().includes(filters.search.toLowerCase()) &&
        !expense.description.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    // Category filter
    if (filters.category !== 'Todas' && expense.category !== filters.category) {
      return false;
    }

    // State filter
    if (filters.state !== 'Todos' && deputy.state !== filters.state) {
      return false;
    }

    // Amount filters
    if (filters.minAmount && expense.amount < parseFloat(filters.minAmount)) {
      return false;
    }
    if (filters.maxAmount && expense.amount > parseFloat(filters.maxAmount)) {
      return false;
    }

    return true;
  });

  const totalFiltered = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const avgExpense = filteredExpenses.length > 0 ? totalFiltered / filteredExpenses.length : 0;

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'Todas',
      state: 'Todos',
      minAmount: '',
      maxAmount: '',
      startDate: null,
      endDate: null,
    });
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value && value !== 'Todas' && value !== 'Todos'
  ).length;

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Explorar Dados
          </h1>
          <p className="text-muted-foreground">
            Filtre e analise os gastos parlamentares por diferentes critérios
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filtros
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary">{activeFiltersCount}</Badge>
                )}
              </CardTitle>
              {activeFiltersCount > 0 && (
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Limpar Filtros
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search and Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="search">Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Nome, fornecedor, descrição..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label>Categoria</Label>
                <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Estado</Label>
                <Select value={filters.state} onValueChange={(value) => setFilters(prev => ({ ...prev, state: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Amount and Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="min-amount">Valor Mínimo</Label>
                <Input
                  id="min-amount"
                  type="number"
                  placeholder="0,00"
                  value={filters.minAmount}
                  onChange={(e) => setFilters(prev => ({ ...prev, minAmount: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="max-amount">Valor Máximo</Label>
                <Input
                  id="max-amount"
                  type="number"
                  placeholder="999.999,99"
                  value={filters.maxAmount}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxAmount: e.target.value }))}
                />
              </div>
              <div>
                <Label>Data Inicial</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.startDate ? format(filters.startDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filters.startDate || undefined}
                      onSelect={(date) => setFilters(prev => ({ ...prev, startDate: date || null }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Data Final</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.endDate ? format(filters.endDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filters.endDate || undefined}
                      onSelect={(date) => setFilters(prev => ({ ...prev, endDate: date || null }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{filteredExpenses.length}</p>
                <p className="text-sm text-muted-foreground">Registros</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xl font-bold text-foreground">
                  {formatCurrency(totalFiltered)}
                </p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xl font-bold text-foreground">
                  {formatCurrency(avgExpense)}
                </p>
                <p className="text-sm text-muted-foreground">Média</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex justify-center">
              <Button size="sm" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Exportar CSV
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Table */}
        <Card>
          <CardHeader>
            <CardTitle>Resultados da Pesquisa</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredExpenses.length > 0 ? (
              <div className="space-y-4">
                {filteredExpenses.map((expense) => {
                  const deputy = mockDeputies.find(d => d.id === expense.deputyId);
                  return (
                    <div key={expense.id} className="border border-border rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                        <div className="md:col-span-2">
                          <p className="font-semibold text-foreground">{expense.deputyName}</p>
                          <p className="text-sm text-muted-foreground">{deputy?.party} • {deputy?.state}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Categoria</p>
                          <Badge variant="outline">{expense.category}</Badge>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Valor</p>
                          <p className="font-bold text-foreground">{formatCurrency(expense.amount)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Data</p>
                          <p className="text-sm text-foreground">{formatDate(expense.date)}</p>
                        </div>
                        <div className="text-right">
                          <Button size="sm" variant="outline">
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-muted-foreground">
                          <strong>Fornecedor:</strong> {expense.provider}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Descrição:</strong> {expense.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Nenhum resultado encontrado com os filtros aplicados.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}