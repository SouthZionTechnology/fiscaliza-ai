import { Link } from 'react-router-dom';
import { SpendingCounter } from '@/components/SpendingCounter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, AlertTriangle, Trophy, Search } from 'lucide-react';

const quickAccessCards = [
  {
    title: 'Deputados',
    description: 'Explore os gastos de todos os deputados federais',
    icon: Users,
    path: '/deputados',
    count: '513 deputados',
  },
  {
    title: 'Gastos Suspeitos',
    description: 'Despesas acima da média que merecem atenção',
    icon: AlertTriangle,
    path: '/alertas',
    count: '47 alertas',
  },
  {
    title: 'Ranking',
    description: 'Deputados ordenados por total de gastos',
    icon: Trophy,
    path: '/ranking',
    count: 'Top 50',
  },
  {
    title: 'Explorar Dados',
    description: 'Filtre e analise gastos por categoria',
    icon: Search,
    path: '/explorar',
    count: '12 filtros',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Spending Counter */}
      <SpendingCounter />
      
      {/* Main Content */}
      <div className="pt-24 px-6">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Transparência Parlamentar 2025
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Acompanhe os gastos dos deputados federais com verbas parlamentares. 
            Dados públicos apresentados de forma clara e acessível.
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 text-sm uppercase">
            <Link to="/deputados">
              Acompanhe os gastos dos deputados
            </Link>
          </Button>
        </div>

        {/* Quick Access Cards */}
        <div className="max-w-6xl mx-auto pb-12">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Acesso Rápido
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickAccessCards.map((card) => (
              <Link key={card.path} to={card.path}>
                <Card className="h-full hover:shadow-float transition-shadow duration-300 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <card.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          {card.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {card.description}
                        </p>
                        <p className="text-xs text-primary font-medium">
                          {card.count}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}