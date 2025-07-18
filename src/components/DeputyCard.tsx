import { AlertTriangle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface DeputyCardProps {
  deputy: {
    id: string;
    name: string;
    party: string;
    state: string;
    totalSpent: number;
    alertCount: number;
    profileImage?: string;
  };
  onViewDetails: (id: string) => void;
}

export const DeputyCard = ({ deputy, onViewDetails }: DeputyCardProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(value);
  };

  return (
    <Card className="min-w-[280px] max-w-[320px] p-4 bg-gradient-card shadow-card border-border/50 transition-all duration-300 hover:shadow-float hover:scale-[1.02]">
      <div className="flex items-start gap-3 mb-3">
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            {deputy.profileImage ? (
              <img 
                src={deputy.profileImage} 
                alt={`Foto de ${deputy.name}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-6 h-6 text-muted-foreground" />
            )}
          </div>
          {deputy.alertCount > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-warning rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-black">
                {deputy.alertCount}
              </span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2">
            {deputy.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {deputy.party} • {deputy.state}
          </p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="text-xs text-muted-foreground mb-1">
            Total gasto em 2025
          </div>
          <div className="text-lg font-bold text-foreground tabular-nums">
            {formatCurrency(deputy.totalSpent)}
          </div>
        </div>
        
        {deputy.alertCount > 0 && (
          <div className="flex items-center gap-2 text-xs text-warning">
            <AlertTriangle className="w-4 h-4" />
            <span className="font-medium">
              {deputy.alertCount} gasto{deputy.alertCount > 1 ? 's' : ''} acima da média
            </span>
          </div>
        )}
        
        <Button 
          onClick={() => onViewDetails(deputy.id)}
          variant="outline"
          className="w-full font-medium text-sm uppercase border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          Ver Detalhes
        </Button>
      </div>
    </Card>
  );
};