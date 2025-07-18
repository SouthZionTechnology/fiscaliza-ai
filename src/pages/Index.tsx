import { useState } from 'react';
import { SpendingCounter } from '@/components/SpendingCounter';
import { DeputyCarousel } from '@/components/DeputyCarousel';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { mockDeputies } from '@/data/mockDeputies';
import { Search, Info } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('deputados');

  const handleViewDetails = (deputyId: string) => {
    console.log('Ver detalhes do deputado:', deputyId);
    // Aqui seria implementada a navegação para a página de detalhes
  };

  const handleSearchAll = () => {
    console.log('Explorar todos os deputados');
    // Aqui seria implementada a navegação para a página de exploração
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Fixed Spending Counter */}
      <SpendingCounter />
      
      {/* Main Content */}
      <div className="pt-24 pb-20">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Transparência Parlamentar
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Acompanhe como os deputados federais estão utilizando as verbas parlamentares. 
              Dados públicos apresentados de forma clara e acessível.
            </p>
            <Button 
              onClick={handleSearchAll}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 text-sm uppercase"
            >
              <Search className="w-4 h-4 mr-2" />
              Explorar Gastos dos Deputados
            </Button>
          </div>
        </div>

        {/* Deputy Cards Carousel */}
        <div className="mt-8">
          <DeputyCarousel 
            deputies={mockDeputies} 
            onViewDetails={handleViewDetails}
          />
        </div>

        {/* Information Section */}
        <div className="container mx-auto px-4 mt-12">
          <div className="bg-card/50 border border-border/50 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">
                  Sobre os Dados
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Os dados apresentados são baseados em informações públicas disponibilizadas pela 
                  API da Câmara dos Deputados. Os valores incluem gastos com passagens, hospedagem, 
                  alimentação, combustível e outros itens autorizados pela cota parlamentar.
                </p>
                <p className="text-xs text-muted-foreground mt-3">
                  Fonte: API da Câmara dos Deputados • Última atualização: Janeiro 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
};

export default Index;
