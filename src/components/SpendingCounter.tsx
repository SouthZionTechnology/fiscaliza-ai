import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';

export const SpendingCounter = () => {
  const [amount, setAmount] = useState(245789432.67);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setAmount(prev => prev + Math.random() * 1000);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(value);
  };
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-counter shadow-counter">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-3">
          <TrendingUp className="w-5 h-5 text-counter-text" />
          <div className="text-center">
            <div className="text-xs text-muted-foreground font-medium">
              GASTOS PARLAMENTARES 2025
            </div>
            <div className="text-xl font-bold text-counter-text tabular-nums">
              {formatCurrency(amount)}
            </div>
          </div>
        </div>
        <div className="text-center mt-1">
          <span className="text-xs text-muted-foreground">
            Baseado em dados públicos • Atualizado em tempo real
          </span>
        </div>
      </div>
    </div>
  );
};