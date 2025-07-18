import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockDeputies } from '@/data/mockDeputies';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, AlertTriangle } from 'lucide-react';

export default function Deputies() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDeputies = mockDeputies.filter(deputy =>
    deputy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deputy.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deputy.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Deputados Federais
          </h1>
          <p className="text-muted-foreground">
            Explore os gastos individuais de cada deputado federal em 2025
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, partido ou estado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{filteredDeputies.length}</p>
                <p className="text-sm text-muted-foreground">Deputados</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(filteredDeputies.reduce((sum, d) => sum + d.totalSpent, 0))}
                </p>
                <p className="text-sm text-muted-foreground">Total Gasto</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">
                  {filteredDeputies.reduce((sum, d) => sum + d.alertCount, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Alertas Ativos</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Deputies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDeputies.map((deputy) => (
            <Card key={deputy.id} className="overflow-hidden hover:shadow-float transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative">
                  {/* Profile Image */}
                  <div className="p-4 pb-2">
                    <div className="flex items-start justify-between">
                      <img
                        src={deputy.profileImage}
                        alt={deputy.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-border"
                      />
                      {deputy.alertCount > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {deputy.alertCount}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Deputy Info */}
                  <div className="px-4 pb-4">
                    <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-2">
                      {deputy.name}
                    </h3>
                    <p className="text-muted-foreground text-xs mb-3">
                      {deputy.party} • {deputy.state}
                    </p>
                    
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-muted-foreground">Total Gasto em 2025</p>
                        <p className="font-bold text-foreground">
                          {formatCurrency(deputy.totalSpent)}
                        </p>
                      </div>
                      
                      <Button asChild size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs uppercase font-semibold">
                        <Link to={`/deputado/${deputy.id}`}>
                          Ver Detalhes
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDeputies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nenhum deputado encontrado com os critérios de busca.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}