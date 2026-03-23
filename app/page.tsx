'use client'
import { useRef } from "react";
import HeroSection from "./components/landing/HeroSection";
import ServicesSection from "./components/landing/ServicesSection";
import ProcessSection from "./components/landing/ProcessSection";
import QuoteForm from "./components/landing/QuoteForm";

export default function Index() {
  const quoteFormRef = useRef<HTMLDivElement>(null);

  const scrollToQuoteForm = () => {
    quoteFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onCtaClick={scrollToQuoteForm} />
      <ServicesSection />
      <ProcessSection />
      <div ref={quoteFormRef}>
        <QuoteForm />
      </div>
    </div>
  );
}
