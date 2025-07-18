import { useParams, Link } from 'react-router-dom';
import { mockDeputies } from '@/data/mockDeputies';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle, TrendingUp, Calendar, Building } from 'lucide-react';

// Mock detailed spending data for a deputy
const mockDeputyExpenses = [
  { category: 'Hospedagem', amount: 45600.00, percentage: 29.1, transactions: 24 },
  { category: 'Passagens Aéreas', amount: 38200.00, percentage: 24.4, transactions: 18 },
  { category: 'Alimentação', amount: 28400.00, percentage: 18.1, transactions: 142 },
  { category: 'Combustível', amount: 22300.00, percentage: 14.2, transactions: 36 },
  { category: 'Consultoria', amount: 15600.00, percentage: 9.9, transactions: 8 },
  { category: 'Material de Escritório', amount: 6689.45, percentage: 4.3, transactions: 23 },
];

const mockRecentTransactions = [
  { id: '1', date: '2025-01-18', category: 'Hospedagem', amount: 2400.00, provider: 'Hotel Brasília Palace', description: 'Hospedagem - semana parlamentar' },
  { id: '2', date: '2025-01-15', category: 'Passagens Aéreas', amount: 1800.00, provider: 'LATAM Airlines', description: 'São Paulo - Brasília' },
  { id: '3', date: '2025-01-12', category: 'Alimentação', amount: 340.50, provider: 'Restaurante do Congresso', description: 'Almoço reunião' },
  { id: '4', date: '2025-01-10', category: 'Combustível', amount: 850.00, provider: 'Posto BR', description: 'Abastecimento veículo oficial' },
  { id: '5', date: '2025-01-08', category: 'Consultoria', amount: 5200.00, provider: 'Consultoria Jurídica Ltda', description: 'Assessoria técnica legislativa' },
];

export default function DeputyProfile() {
  const { id } = useParams();
  const deputy = mockDeputies.find(d => d.id === id);

  if (!deputy) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Deputado não encontrado</h1>
          <Button asChild>
            <Link to="/deputados">Voltar para Lista de Deputados</Link>
          </Button>
        </div>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const totalCategorySpending = mockDeputyExpenses.reduce((sum, cat) => sum + cat.amount, 0);
  const avgTransactionValue = totalCategorySpending / mockDeputyExpenses.reduce((sum, cat) => sum + cat.transactions, 0);

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/deputados">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Deputados
          </Link>
        </Button>

        {/* Deputy Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <img
                src={deputy.profileImage}
                alt={deputy.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-border"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      {deputy.name}
                    </h1>
                    <div className="flex items-center gap-4 text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {deputy.party}
                      </span>
                      <span>{deputy.state}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Mandato 2023-2027
                      </span>
                    </div>
                  </div>
                  {deputy.alertCount > 0 && (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {deputy.alertCount} Alerta{deputy.alertCount > 1 ? 's' : ''}
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Gasto em 2025</p>
                    <p className="text-2xl font-bold text-foreground">
                      {formatCurrency(deputy.totalSpent)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Valor Médio por Transação</p>
                    <p className="text-xl font-semibold text-foreground">
                      {formatCurrency(avgTransactionValue)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total de Transações</p>
                    <p className="text-xl font-semibold text-foreground">
                      {mockDeputyExpenses.reduce((sum, cat) => sum + cat.transactions, 0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Spending by Category */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Gastos por Categoria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockDeputyExpenses.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        {category.category}
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        {formatCurrency(category.amount)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground min-w-0">
                        {category.percentage}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {category.transactions} transações
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Transações Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentTransactions.map((transaction) => (
                  <div key={transaction.id} className="border-l-2 border-primary/20 pl-4 py-2">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm">
                          {transaction.category}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(transaction.date)} • {transaction.provider}
                        </p>
                      </div>
                      <p className="font-bold text-foreground">
                        {formatCurrency(transaction.amount)}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {transaction.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button variant="outline" size="sm">
                  Ver Todas as Transações
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts Section */}
        {deputy.alertCount > 0 && (
          <Card className="mt-8 border-warning/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <AlertTriangle className="w-5 h-5" />
                Gastos que Merecem Atenção
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-foreground">Hospedagem Acima da Média</p>
                      <p className="text-sm text-muted-foreground">
                        Janeiro 2025 • Hotel Luxury Brasília
                      </p>
                    </div>
                    <Badge variant="secondary">3.2x acima da média</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Valor gasto: {formatCurrency(12500)} | Média da categoria: {formatCurrency(3900)}
                  </p>
                </div>
                {deputy.alertCount > 1 && (
                  <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-foreground">Consultoria Especializada</p>
                        <p className="text-sm text-muted-foreground">
                          Janeiro 2025 • Consultoria Jurídica Ltda
                        </p>
                      </div>
                      <Badge variant="secondary">3.8x acima da média</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Valor gasto: {formatCurrency(18900)} | Média da categoria: {formatCurrency(4950)}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border/50">
          <p className="text-sm text-muted-foreground text-center">
            Dados baseados em informações públicas da Câmara dos Deputados • 
            Última atualização: Janeiro 2025
          </p>
        </div>
      </div>
    </div>
  );
}