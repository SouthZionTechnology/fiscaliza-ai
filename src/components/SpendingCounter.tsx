import { useEffect, useState } from 'react';
import { useSpendingStore } from '@/store/useSpendingStore';
import { formatCurrency } from '@/lib/utils';

export function SpendingCounter() {
  const contador = useSpendingStore((state) => state.contador);
  const setContador = useSpendingStore((state) => state.setContador);

  const [loaded, setLoaded] = useState(false);
  const [displayedValue, setDisplayedValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/gastos2025.json');
        const data = await res.json();
        if (data?.total) {
          setContador(data.total);
          setLoaded(true);
        }
      } catch (error) {
        console.error('Erro ao carregar gastos:', error);
      }
    };

    // Só busca se ainda não foi carregado
    if (contador === 0) {
      fetchData();
    } else {
      setLoaded(true);
    }
  }, [setContador, contador]);

  useEffect(() => {
    if (!loaded) return;

    let start = 0;
    const duration = 2000; // duração da animação em ms
    const increment = contador / (duration / 16); // aproxima 60fps

    const step = () => {
      start += increment;
      if (start < contador) {
        setDisplayedValue(start);
        requestAnimationFrame(step);
      } else {
        setDisplayedValue(contador);
      }
    };

    requestAnimationFrame(step);
  }, [contador, loaded]);

  return (
    <div className="text-center mt-8">
      {!loaded ? (
        <p className="text-gray-500 text-sm">Atualizando os gastos em tempo real...</p>
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-1">Gastos totais dos deputados em 2025</p>
          <h2 className="text-3xl font-bold text-lime-500">
            {formatCurrency(displayedValue)}
          </h2>
        </>
      )}
    </div>
  );
}
