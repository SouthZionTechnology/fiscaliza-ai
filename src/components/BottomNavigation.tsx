import { Users, AlertTriangle, Trophy, Search } from 'lucide-react';
import { useState } from 'react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const tabs = [
    { id: 'deputados', label: 'Deputados', icon: Users },
    { id: 'gastos-suspeitos', label: 'Gastos Suspeitos', icon: AlertTriangle },
    { id: 'ranking', label: 'Ranking', icon: Trophy },
    { id: 'explorar', label: 'Explorar', icon: Search }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border/50 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'text-primary bg-primary/10' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium leading-none">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};