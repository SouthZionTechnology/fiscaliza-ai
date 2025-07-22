import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge classes do Tailwind de forma inteligente.
 * Exemplo: cn("p-2", condicao && "text-red-500")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formata um número como moeda brasileira (R$)
 */
export function formatCurrency(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}
