import { Globe, Smartphone, Zap, Server, Sparkles } from "lucide-react";
import { servicesStyles } from "@/app/hooks/use-styles";

const services = [
  {
    icon: Globe,
    title: "Aplicações Web",
    tag: "WEB",
    description:
      "Soluções web full-stack com frameworks modernos, design responsivo e arquitetura escalável.",
  },
  {
    icon: Smartphone,
    title: "Aplicações Mobile",
    tag: "MOBILE",
    description:
      "Aplicações mobile nativas e multiplataforma para iOS e Android com experiências impecáveis.",
  },
  {
    icon: Zap,
    title: "Automação e Integrações",
    tag: "AUTO",
    description:
      "Otimize seus fluxos de trabalho com soluções de automação personalizada e integrações de terceiros.",
  },
  {
    icon: Server,
    title: "APIs e Sistemas Backend",
    tag: "API",
    description:
      "Infraestrutura backend robusta, APIs RESTful, microsserviços e soluções de banco de dados.",
  },
  {
    icon: Sparkles,
    title: "Soluções de IA",
    tag: "AI",
    description:
      "Aproveite machine learning e IA para aprimorar suas aplicações e inteligência empresarial.",
  },
];

export default function ServicesSection() {
  return (
    <>
      <style>{servicesStyles}</style>
      <section className="ss-root">
        <div className="ss-bg" />
        <div className="ss-noise" />

        <div className="ss-inner">
          {/* Header */}
          <div className="ss-header">
            <span className="ss-eyebrow">O que fazemos</span>
            <h2 className="ss-title">
              Nossos <em>Serviços</em>
            </h2>
            <p className="ss-subtitle">
              Especializamos em uma ampla gama de serviços de desenvolvimento de software
              personalizado para atender aos seus requisitos empresariais únicos.
            </p>
          </div>

          {/* Grid */}
          <div className="ss-grid">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="ss-card">
                  <div className="ss-card-top">
                    <div className="ss-icon-wrap">
                      <Icon className="ss-icon" />
                    </div>
                    <span className="ss-tag">{service.tag}</span>
                  </div>

                  <div className="ss-card-title">{service.title}</div>
                  <p className="ss-card-desc">{service.description}</p>
                  <span className="ss-card-arrow">→ saiba mais</span>
                </div>
              );
            })}
          </div>

          {/* Footer rule */}
          <div className="ss-footer">
            <div className="ss-footer-line" />
            <span className="ss-footer-text">soluções sob medida</span>
            <div className="ss-footer-line" />
          </div>
        </div>
      </section>
    </>
  );
}