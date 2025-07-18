import { mockDeputies } from '@/data/mockDeputies';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock suspicious expenses data
const suspiciousExpenses = [
  {
    deputyId: '4',
    deputyName: 'Carlos Eduardo Mendes',
    category: 'Hospedagem',
    amount: 12500.00,
    average: 3200.00,
    multiplier: 3.9,
    date: '2025-01-15',
    provider: 'Hotel Luxury Brasília',
    description: 'Hospedagem - 5 diárias'
  },
  {
    deputyId: '6',
    deputyName: 'Roberto Almeida',
    category: 'Alimentação',
    amount: 2800.00,
    average: 850.00,
    multiplier: 3.3,
    date: '2025-01-12',
    provider: 'Restaurante Premium',
    description: 'Jantar institucional'
  },
  {
    deputyId: '10',
    deputyName: 'Marcos Vinícius Teixeira',
    category: 'Combustível',
    amount: 4500.00,
    average: 1200.00,
    multiplier: 3.8,
    date: '2025-01-10',
    provider: 'Posto Central',
    description: 'Abastecimento veículos'
  },
  {
    deputyId: '1',
    deputyName: 'Maria Silva Santos',
    category: 'Passagens Aéreas',
    amount: 15600.00,
    average: 4800.00,
    multiplier: 3.3,
    date: '2025-01-08',
    provider: 'Companhia Aérea Nacional',
    description: 'Viagem São Paulo - Brasília'
  },
  {
    deputyId: '8',
    deputyName: 'Pedro Henrique Lima',
    category: 'Consultoria',
    amount: 18900.00,
    average: 5500.00,
    multiplier: 3.4,
    date: '2025-01-05',
    provider: 'Consultoria Estratégica Ltda',
    description: 'Assessoria técnica especializada'
  }
];

export default function SuspiciousSpending() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getSeverityColor = (multiplier: number) => {
    if (multiplier >= 4) return 'destructive';
    if (multiplier >= 3.5) return 'secondary';
    return 'outline';
  };

  const totalSuspiciousAmount = suspiciousExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const avgMultiplier = suspiciousExpenses.reduce((sum, expense) => sum + expense.multiplier, 0) / suspiciousExpenses.length;

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Gastos Suspeitos
          </h1>
          <p className="text-muted-foreground">
            Despesas que estão 3x ou mais acima da média da categoria
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-warning" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{suspiciousExpenses.length}</p>
                  <p className="text-sm text-muted-foreground">Alertas Ativos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-destructive" />
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {formatCurrency(totalSuspiciousAmount)}
                  </p>
                  <p className="text-sm text-muted-foreground">Valor Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">
                  {avgMultiplier.toFixed(1)}x
                </p>
                <p className="text-sm text-muted-foreground">Média Acima do Normal</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Suspicious Expenses List */}
        <div className="space-y-4">
          {suspiciousExpenses.map((expense, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg text-foreground">
                      {expense.deputyName}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(expense.date)} • {expense.provider}
                    </p>
                  </div>
                  <Badge variant={getSeverityColor(expense.multiplier)}>
                    {expense.multiplier.toFixed(1)}x acima da média
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Categoria</p>
                    <p className="font-semibold text-foreground">{expense.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Valor Gasto</p>
                    <p className="font-bold text-destructive text-lg">
                      {formatCurrency(expense.amount)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Média da Categoria</p>
                    <p className="font-medium text-muted-foreground">
                      {formatCurrency(expense.average)}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {expense.description}
                  </p>
                  <Button asChild size="sm" variant="outline">
                    <Link to={`/deputado/${expense.deputyId}`}>
                      Ver Perfil Completo
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-6 bg-muted/30 rounded-lg border border-border/50">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Importante
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Os alertas são baseados em análise estatística de dados públicos e não constituem 
                acusações. Gastos acima da média podem ter justificativas legítimas que devem ser 
                avaliadas individualmente pelos órgãos competentes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}