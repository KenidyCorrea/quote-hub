import { useState } from "react";
import { quoteStyles } from "@/app/hooks/use-styles";
import { useQuoteOptions } from "@/app/hooks/useQuoteOptions";

import { createQuote } from "@/app/services/quoteService";

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function QuoteForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const { projectTypes, budgets, timelines } = useQuoteOptions();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Campo obrigatório";
    if (!formData.email.trim()) newErrors.email = "Campo obrigatório";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "E-mail inválido";
    if (!formData.projectType) newErrors.projectType = "Selecione um tipo";
    if (!formData.budget) newErrors.budget = "Selecione uma faixa";
    if (!formData.timeline) newErrors.timeline = "Selecione um cronograma";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePick = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await createQuote(formData);
      setSubmittedEmail(formData.email);
      setIsSuccess(true);
    } catch (err) {
      console.log(err)
      alert("Falha ao enviar. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <>
        <style>{quoteStyles}</style>
        <div className="qf-root">
          <div className="qf-bg" />
          <div className="qf-noise" />
          <div className="qf-success">
            <div className="qf-success-card">
              <div className="qf-success-icon">✦</div>
              <h2 className="qf-success-title">Solicitação<br /><em style={{ fontStyle: "italic" }}>recebida.</em></h2>
              <p className="qf-success-sub">
                Analisaremos cuidadosamente os detalhes do seu projeto<br />e retornaremos em breve.
              </p>
              <div className="qf-success-steps">
                <div className="qf-success-step">
                  <span className="qf-success-step-num">01</span>
                  <span className="qf-success-step-text">Nossa equipe analisará seus requisitos de projeto em detalhes.</span>
                </div>
                <div className="qf-success-step">
                  <span className="qf-success-step-num">02</span>
                  <span className="qf-success-step-text">Prepararemos uma proposta detalhada com escopo e orçamento.</span>
                </div>
                <div className="qf-success-step">
                  <span className="qf-success-step-num">03</span>
                  <span className="qf-success-step-text">
                    Retornaremos em 2–3 dias úteis para <strong>{submittedEmail}</strong>.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{quoteStyles}</style>
      <div className="qf-root">
        <div className="qf-bg" />
        <div className="qf-noise" />
        <div className="qf-container">

          {/* Sidebar */}
          <aside className="qf-sidebar">
            <div className="qf-logo">Studio — 2026</div>

            <div className="qf-sidebar-headline">
              <span className="qf-eyebrow">Solicitar Orçamento</span>
              <h1 className="qf-title">
                Vamos construir<br /><em>algo</em><br />notável.
              </h1>
              <div className="qf-divider" />
              <p className="qf-subtitle">
                Compartilhe os detalhes do seu projeto e nossa equipe preparará uma proposta personalizada.
              </p>
            </div>

            <div className="qf-steps">
              <div className="qf-step">
                <span className="qf-step-num">01</span>
                <div className="qf-step-line" />
                <span className="qf-step-text">Preencha o formulário</span>
              </div>
              <div className="qf-step">
                <span className="qf-step-num">02</span>
                <div className="qf-step-line" />
                <span className="qf-step-text">Receba a proposta em 2–3 dias</span>
              </div>
              <div className="qf-step">
                <span className="qf-step-num">03</span>
                <div className="qf-step-line" />
                <span className="qf-step-text">Inicie seu projeto</span>
              </div>
            </div>
          </aside>

          {/* Form panel */}
          <main className="qf-panel">
            <div className="qf-form-header">
              <h2 className="qf-form-title">Detalhes do projeto</h2>
              <p className="qf-form-desc">campos marcados com ✦ são obrigatórios</p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Name + Email */}
              <div className="qf-row">
                <div className="qf-field">
                  <label className="qf-label">Nome <span className="qf-label-req">✦</span></label>
                  <input
                    className={`qf-input${errors.name ? " error" : ""}`}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                  />
                  {errors.name && <span className="qf-error">{errors.name}</span>}
                </div>
                <div className="qf-field">
                  <label className="qf-label">E-mail <span className="qf-label-req">✦</span></label>
                  <input
                    className={`qf-input${errors.email ? " error" : ""}`}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                  />
                  {errors.email && <span className="qf-error">{errors.email}</span>}
                </div>
              </div>

              {/* Company */}
              <div className="qf-field">
                <label className="qf-label">Empresa</label>
                <input
                  className="qf-input"
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Nome da sua empresa (opcional)"
                />
              </div>

              <div className="qf-sep" />

              {/* Project Type */}
              <div className="qf-field">
                <label className="qf-label">
                  Tipo de Projeto <span className="qf-label-req">✦</span>
                </label>
                <div className="qf-pills">
                  {projectTypes.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      className={`qf-pill${formData.projectType === t.id ? " selected" : ""}`}
                      onClick={() => handlePick("projectType", t.id)}
                    >
                      <span className="qf-pill-icon">{t.icon}</span>
                      <span className="qf-pill-label">{t.label}</span>
                    </button>
                  ))}
                </div>
                {errors.projectType && <span className="qf-error">{errors.projectType}</span>}
              </div>

              <div className="qf-sep" />

              {/* Budget */}
              <div className="qf-field">
                <label className="qf-label">
                  Orçamento Estimado <span className="qf-label-req">✦</span>
                </label>
                <div className="qf-options">
                  {budgets.map((b) => (
                    <button
                      key={b.value}
                      type="button"
                      className={`qf-opt${formData.budget === b.id ? " selected" : ""}`}
                      onClick={() => handlePick("budget", b.id)}                    >
                      {b.label}
                    </button>
                  ))}
                </div>
                {errors.budget && <span className="qf-error">{errors.budget}</span>}
              </div>

              {/* Timeline */}
              <div className="qf-field">
                <label className="qf-label">
                  Cronograma <span className="qf-label-req">✦</span>
                </label>
                <div className="qf-options">
                  {timelines.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      className={`qf-opt${formData.timeline === t.id ? " selected" : ""}`}
                      onClick={() => handlePick("timeline", t.id)}                    >
                      {t.label}
                    </button>
                  ))}
                </div>
                {errors.timeline && <span className="qf-error">{errors.timeline}</span>}
              </div>

              <div className="qf-sep" />

              {/* Description */}
              <div className="qf-field">
                <label className="qf-label">Descrição do Projeto</label>
                <textarea
                  className="qf-input"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Conte-nos sobre seus objetivos, funcionalidades desejadas e qualquer requisito específico..."
                  rows={5}
                />
              </div>

              <button className="qf-submit" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="qf-spinner" />
                    Enviando...
                  </>
                ) : (
                  <>Solicitar Orçamento</>
                )}
              </button>

              <p className="qf-note">
                Retorno em 2–3 dias úteis · Sem compromisso
              </p>
            </form>
          </main>
        </div>
      </div>
    </>
  );
}
