import SpendingCounterReal from "../components/SpendingCounterReal";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="p-8">
      <Helmet>
        <title>Fiscaliza.ai - Início</title>
      </Helmet>
      <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Fiscaliza.ai</h1>
      <p className="text-lg mb-4">
        Acompanhe os gastos públicos dos deputados federais de forma simples e
        transparente.
      </p>
      <SpendingCounterReal />
    </div>
  );
}
