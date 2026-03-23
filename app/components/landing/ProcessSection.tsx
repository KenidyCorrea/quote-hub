import { CheckCircle2 } from "lucide-react";
import { processStyles } from "@/app/hooks/use-styles";

const steps = [
  {
    number: "01",
    title: "Envie os Detalhes do Projeto",
    description:
      "Conte-nos sobre a visão, requisitos e cronograma do seu projeto. Coletamos todas as informações necessárias para entender seus objetivos.",
  },
  {
    number: "02",
    title: "Equipe Analisa os Requisitos",
    description:
      "Nossa equipe experiente revisa sua solicitação, avalia viabilidade técnica e cria um escopo de projeto abrangente.",
  },
  {
    number: "03",
    title: "Receba Orçamento & Proposta",
    description:
      "Obtenha uma proposta detalhada incluindo cronograma, detalhamento de orçamento, entregas e próximos passos do seu projeto.",
  },
];


export default function ProcessSection() {
  return (
    <>
      <style>{processStyles}</style>
      <section className="ps-root">
        <div className="ps-bg" />
        <div className="ps-noise" />

        <div className="ps-inner">
          {/* Header */}
          <div className="ps-header">
            <span className="ps-eyebrow">Como funciona</span>
            <h2 className="ps-title">
              Nosso <em>Processo</em>
            </h2>
            <p className="ps-subtitle">
              Uma abordagem simplificada para entregar sua solução de software personalizado.
            </p>
          </div>

          {/* Steps */}
          <div className="ps-steps">
            {/* Desktop connector track */}
            <div className="ps-track">
              <div className="ps-track-fill" />
            </div>

            {steps.map((step, index) => (
              <div key={index} className="ps-step">
                <div className="ps-num-wrap">
                  <div className="ps-num-ring">
                    <span className="ps-num">{step.number}</span>
                  </div>
                </div>
                <div className="ps-step-body">
                  <div className="ps-step-title">{step.title}</div>
                  <p className="ps-step-desc">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="ps-cta">
            <div className="ps-cta-icon">
              <CheckCircle2 />
            </div>
            <div className="ps-cta-body">
              <span className="ps-cta-strong">Pronto para avançar?</span>
              <p className="ps-cta-text">
                Após enviar sua solicitação de orçamento, revisaremos os detalhes do seu projeto
                e entraremos em contato em 2–3 dias úteis com uma proposta abrangente.
              </p>
            </div>
            <span className="ps-cta-tag">2–3 dias úteis</span>
          </div>
        </div>
      </section>
    </>
  );
}