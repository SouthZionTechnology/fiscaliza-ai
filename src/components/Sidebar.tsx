import { NavLink } from 'react-router-dom';
import { Home, Users, AlertTriangle, Trophy, Search, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: Home, label: 'Início', path: '/' },
  { icon: Users, label: 'Deputados', path: '/deputados' },
  { icon: AlertTriangle, label: 'Gastos Suspeitos', path: '/alertas' },
  { icon: Trophy, label: 'Ranking', path: '/ranking' },
  { icon: Search, label: 'Explorar', path: '/explorar' },
];

export function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border/50 shadow-float z-40 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <FileText className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-foreground text-lg">Transparência</h1>
            <p className="text-xs text-muted-foreground">Dados Parlamentares</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    "hover:bg-muted/50",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )
                }
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border/50">
        <p className="text-xs text-muted-foreground">
          Dados públicos da Câmara dos Deputados
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Atualizado em Janeiro 2025
        </p>
      </div>
    </div>
  );
}