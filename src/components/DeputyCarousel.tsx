import { DeputyCard } from './DeputyCard';
import { useRef } from 'react';

interface Deputy {
  id: string;
  name: string;
  party: string;
  state: string;
  totalSpent: number;
  alertCount: number;
  profileImage?: string;
}

interface DeputyCarouselProps {
  deputies: Deputy[];
  onViewDetails: (id: string) => void;
}

export const DeputyCarousel = ({ deputies, onViewDetails }: DeputyCarouselProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">
            Deputados Federais
          </h2>
          <p className="text-sm text-muted-foreground">
            {deputies.length} deputados
          </p>
        </div>
      </div>
      
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none'
        }}
      >
        <div className="flex gap-4 px-4 pb-4">
          {deputies.map((deputy) => (
            <DeputyCard
              key={deputy.id}
              deputy={deputy}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </div>
    </div>
  );
};