// scripts/atualizar_gastos.ts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

// Corrigir __dirname para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Busca todos os deputados ativos em 2025
async function buscarDeputadosAtivos(): Promise<number[]> {
  const url = `https://dadosabertos.camara.leg.br/api/v2/deputados?dataInicio=2025-01-01&dataFim=2025-12-31`;
  const response = await axios.get(url, {
    headers: { accept: 'application/json' }
  });

  const deputados = response.data.dados;
  return deputados.map((dep: any) => dep.id);
}

// Busca todas as despesas de um deputado específico em 2025
async function buscarDespesasPorDeputado(id: number): Promise<number> {
  let pagina = 1;
  let total = 0;

  while (true) {
    const url = `https://dadosabertos.camara.leg.br/api/v2/deputados/${id}/despesas?ano=2025&itens=100&pagina=${pagina}`;
    const response = await axios.get(url, {
      headers: { accept: 'application/json' }
    });

    const despesas = response.data.dados;

    if (!despesas || despesas.length === 0) {
      break;
    }

    for (const item of despesas) {
      if (item.valorDocumento) {
        total += item.valorDocumento;
      }
    }

    pagina++;
  }

  return total;
}

// Executa todo o processo
async function atualizarGastos() {
  console.log("🔍 Buscando deputados em exercício...");
  const ids = await buscarDeputadosAtivos();

  let gastoTotal = 0;
  let processados = 0;

  for (const id of ids) {
    try {
      const totalDeputado = await buscarDespesasPorDeputado(id);
      gastoTotal += totalDeputado;
      processados++;
      console.log(`✅ Deputado ${id} processado (${processados}/${ids.length})`);
    } catch (err) {
      console.warn(`⚠️ Erro ao processar deputado ${id}`);
    }
  }

  const resultado = {
    total: gastoTotal,
    atualizado_em: new Date().toISOString(),
  };

  const outputPath = path.join(__dirname, '..', 'public', 'gastos2025.json');
  fs.writeFileSync(outputPath, JSON.stringify(resultado, null, 2), 'utf-8');

  console.log("✅ Gasto total salvo com sucesso em:", outputPath);
  console.log(`💰 Total gasto: R$ ${gastoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
}

// Iniciar
atualizarGastos();
