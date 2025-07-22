import React, { useEffect, useState } from "react";

// Função para formatar moeda brasileira
function formatCurrencyBR(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

// Simula busca de dados reais via API
async function fetchTotalGastos2025(): Promise<number> {
  const deputadosUrl = "https://dadosabertos.camara.leg.br/api/v2/deputados";
  let totalGasto = 0;
  let pagina = 1;
  let terminou = false;

  while (!terminou) {
    const res = await fetch(`${deputadosUrl}?itens=100&pagina=${pagina}`);
    const data = await res.json();
    const deputados = data.dados;

    if (!deputados || deputados.length === 0) {
      terminou = true;
      break;
    }

    for (const deputado of deputados) {
      const despesasUrl = `https://dadosabertos.camara.leg.br/api/v2/deputados/${deputado.id}/despesas?ano=2025&itens=100`;
      const resDespesas = await fetch(despesasUrl);
      const dataDespesas = await resDespesas.json();
      const despesas = dataDespesas.dados;
      const soma = despesas.reduce((acc: number, d: any) => acc + d.valorDocumento, 0);
      totalGasto += soma;
    }

    pagina++;
  }

  return totalGasto;
}

export default function SpendingCounterReal() {
  const [valorAtual, setValorAtual] = useState<number | null>(null);
  const [gastoPorSegundo, setGastoPorSegundo] = useState<number>(0);

  useEffect(() => {
    let intervalo: NodeJS.Timeout;

    async function inicializarContador() {
      const totalGasto = await fetchTotalGastos2025();
      const segundosAno = 365 * 24 * 60 * 60;
      const gastoSec = totalGasto / segundosAno;

      const agora = new Date();
      const inicioAno = new Date(agora.getFullYear(), 0, 1);
      const segundosPassados = Math.floor((agora.getTime() - inicioAno.getTime()) / 1000);
      const valorInicial = segundosPassados * gastoSec;

      setValorAtual(valorInicial);
      setGastoPorSegundo(gastoSec);

      intervalo = setInterval(() => {
        setValorAtual((prev) => (prev !== null ? prev + gastoSec : null));
      }, 1000);
    }

    inicializarContador();

    return () => {
      if (intervalo) clearInterval(intervalo);
    };
  }, []);

  return (
    <div className="bg-[#212121] text-[#AEEA00] p-6 rounded-lg shadow-md w-full max-w-xl mx-auto text-center">
      <h2 className="text-xl font-semibold mb-2">Gasto das Verbas Parlamentares em 2025</h2>
      <p className="text-base text-gray-300 mb-4">
        Simulação em tempo real baseada em dados da API oficial
      </p>

      {valorAtual === null ? (
        <div className="text-lg text-gray-400 animate-pulse">
          Atualizando os gastos em tempo real...
        </div>
      ) : (
        <h1 className="text-4xl font-bold">{formatCurrencyBR(valorAtual)}</h1>
      )}
    </div>
  );
}
