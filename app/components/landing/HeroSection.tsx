import { ArrowRight } from "lucide-react";
import { heroStyles } from "@/app/hooks/use-styles";
interface HeroSectionProps {
  onCtaClick: () => void;
}

export default function HeroSection({ onCtaClick }: HeroSectionProps) {
  return (
    <>
      <style>{heroStyles}</style>
      <section className="hs-root">
        <div className="hs-bg" />
        <div className="hs-noise" />
        <div className="hs-grid" />

        <div className="hs-inner">
          {/* Badge */}
          <div className="hs-badge">
            <span className="hs-badge-dot" />
            <span className="hs-badge-text">Desenvolvimento sob medida</span>
          </div>

          {/* Headline */}
          <h1 className="hs-headline">
            <strong>KJ Correa</strong>
            Transforme suas<br />
            <em>ideias em código.</em>
          </h1>

          {/* Subtitle */}
          <p className="hs-sub">
            Desenvolvemos aplicações web, apps mobile, integrações, APIs e sistemas
            com IA adaptados às necessidades do seu negócio.
          </p>

          {/* CTAs */}
          <div className="hs-ctas">
            <button className="hs-btn-primary" onClick={onCtaClick}>
              Solicitar Orçamento
              <ArrowRight />
            </button>
          </div>

          {/* Stats */}
          <div className="hs-stats">
            <div className="hs-stat">
              <div className="hs-stat-num">50+</div>
              <div className="hs-stat-label">Projetos entregues</div>
            </div>
            <div className="hs-stat">
              <div className="hs-stat-num">5</div>
              <div className="hs-stat-label">Especialidades</div>
            </div>
            <div className="hs-stat">
              <div className="hs-stat-num">2–3</div>
              <div className="hs-stat-label">Dias para proposta</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}