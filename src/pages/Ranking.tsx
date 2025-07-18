import { useState } from 'react';
import { mockDeputies } from '@/data/mockDeputies';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Trophy, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Ranking() {
  const [includeFlights, setIncludeFlights] = useState(true);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Calculate spending with/without flights (mock calculation)
  const getAdjustedSpending = (deputy: typeof mockDeputies[0]) => {
    if (includeFlights) {
      return deputy.totalSpent;
    }
    // Assume flights are ~30% of total spending (mock calculation)
    return deputy.totalSpent * 0.7;
  };

  const rankedDeputies = [...mockDeputies]
    .map(deputy => ({
      ...deputy,
      adjustedSpending: getAdjustedSpending(deputy)
    }))
    .sort((a, b) => b.adjustedSpending - a.adjustedSpending);

  const getRankIcon = (position: number) => {
    if (position === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (position === 2) return <Trophy className="w-5 h-5 text-gray-400" />;
    if (position === 3) return <Trophy className="w-5 h-5 text-yellow-600" />;
    return null;
  };

  const getRankBadge = (position: number) => {
    if (position <= 3) return 'destructive';
    if (position <= 10) return 'secondary';
    return 'outline';
  };

  const totalSpending = rankedDeputies.reduce((sum, deputy) => sum + deputy.adjustedSpending, 0);
  const averageSpending = totalSpending / rankedDeputies.length;
  const highSpenders = rankedDeputies.filter(d => d.adjustedSpending > averageSpending * 1.5).length;

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Ranking de Gastos
          </h1>
          <p className="text-muted-foreground">
            Deputados ordenados por total de gastos em 2025
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Configurações do Ranking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch
                id="include-flights"
                checked={includeFlights}
                onCheckedChange={setIncludeFlights}
              />
              <Label htmlFor="include-flights" className="text-sm">
                {includeFlights ? 'Incluir passagens aéreas' : 'Excluir passagens aéreas'}
              </Label>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              As passagens aéreas podem representar uma parcela significativa dos gastos parlamentares
            </p>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-xl font-bold text-foreground">
                    {formatCurrency(rankedDeputies[0]?.adjustedSpending || 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Maior Gasto</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingDown className="w-8 h-8 text-success" />
                <div>
                  <p className="text-xl font-bold text-foreground">
                    {formatCurrency(rankedDeputies[rankedDeputies.length - 1]?.adjustedSpending || 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Menor Gasto</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xl font-bold text-foreground">
                  {formatCurrency(averageSpending)}
                </p>
                <p className="text-sm text-muted-foreground">Média Geral</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-warning" />
                <div>
                  <p className="text-xl font-bold text-foreground">{highSpenders}</p>
                  <p className="text-sm text-muted-foreground">Acima da Média</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ranking List */}
        <div className="space-y-3">
          {rankedDeputies.map((deputy, index) => {
            const position = index + 1;
            const isAboveAverage = deputy.adjustedSpending > averageSpending * 1.2;
            
            return (
              <Card key={deputy.id} className={`overflow-hidden ${position <= 3 ? 'border-primary/50' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Rank Position */}
                    <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-full flex-shrink-0">
                      {getRankIcon(position) || (
                        <span className="font-bold text-foreground">#{position}</span>
                      )}
                    </div>

                    {/* Deputy Photo */}
                    <img
                      src={deputy.profileImage}
                      alt={deputy.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-border flex-shrink-0"
                    />

                    {/* Deputy Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground text-lg">
                            {deputy.name}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {deputy.party} • {deputy.state}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-xl text-foreground">
                            {formatCurrency(deputy.adjustedSpending)}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={getRankBadge(position)} className="text-xs">
                              #{position}
                            </Badge>
                            {isAboveAverage && (
                              <Badge variant="secondary" className="text-xs">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Acima da média
                              </Badge>
                            )}
                            {deputy.alertCount > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                {deputy.alertCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button asChild size="sm" variant="outline" className="flex-shrink-0">
                      <Link to={`/deputado/${deputy.id}`}>
                        Ver Detalhes
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border/50">
          <p className="text-sm text-muted-foreground text-center">
            Ranking baseado em dados públicos da Câmara dos Deputados • Atualizado em Janeiro 2025
          </p>
        </div>
      </div>
    </div>
  );
}