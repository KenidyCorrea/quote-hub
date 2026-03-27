"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  LoaderCircle,
  LogOut,
  MessageSquareText,
  RefreshCcw,
  Send,
} from "lucide-react";
import { startTransition, useEffect, useState } from "react";

import { adminStyles } from "@/app/hooks/use-styles";
import type {
  QuoteFilters,
  QuoteMessage,
  QuoteOption,
  QuotePagination,
  QuoteRecord,
  QuoteStatusFilter,
  QuoteSummary,
} from "@/app/lib/quote-types";
import { createSupabaseBrowserClient } from "@/app/lib/supabase/browser";

import AdminModal from "./AdminModal";

type AdminDashboardProps = {
  budgets: QuoteOption[];
  currentUserEmail: string;
  currentUserId: string;
  filters: QuoteFilters;
  initialQuotes: QuoteRecord[];
  loadError: string | null;
  pagination: QuotePagination;
  projectTypes: QuoteOption[];
  summary: QuoteSummary;
  timelines: QuoteOption[];
};

const statusOptions: Array<{ label: string; value: QuoteStatusFilter }> = [
  { label: "Todos", value: "all" },
  { label: "Pendentes", value: "pending" },
  { label: "Respondidos", value: "answered" },
];

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "medium",
  timeStyle: "short",
});

function formatDate(value: string | null) {
  if (!value) {
    return "-";
  }

  return dateFormatter.format(new Date(value));
}

function getOptionLabel(options: QuoteOption[], id: string | null) {
  if (!id) {
    return "Nao informado";
  }

  return options.find((option) => option.id === id)?.label ?? "Nao informado";
}

function getStatusLabel(status: string | null) {
  if (!status) {
    return "Sem status";
  }

  return (
    {
      pending: "Pendente",
      answered: "Respondido",
      approved: "Aprovado",
      rejected: "Recusado",
    }[status] ?? status
  );
}

function getStatusClass(status: string | null) {
  switch (status) {
    case "answered":
      return "answered";
    case "approved":
      return "approved";
    case "rejected":
      return "rejected";
    default:
      return "pending";
  }
}

function buildAdminUrl(filters: QuoteFilters, page: number) {
  const params = new URLSearchParams();

  if (filters.status !== "all") {
    params.set("status", filters.status);
  }

  if (filters.from) {
    params.set("from", filters.from);
  }

  if (filters.to) {
    params.set("to", filters.to);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const queryString = params.toString();

  return queryString ? `/admin?${queryString}` : "/admin";
}

function hasSameFilters(left: QuoteFilters, right: QuoteFilters) {
  return (
    left.status === right.status &&
    left.from === right.from &&
    left.to === right.to
  );
}

export default function AdminDashboard({
  budgets,
  currentUserEmail,
  currentUserId,
  filters,
  initialQuotes,
  loadError,
  pagination,
  projectTypes,
  summary,
  timelines,
}: AdminDashboardProps) {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [quotes, setQuotes] = useState(initialQuotes);
  const [selectedQuote, setSelectedQuote] = useState<QuoteRecord | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [messages, setMessages] = useState<QuoteMessage[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [actionError, setActionError] = useState<string | null>(loadError);
  const [isSendingReply, setIsSendingReply] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filterStatus, setFilterStatus] = useState<QuoteStatusFilter>(filters.status);
  const [filterFrom, setFilterFrom] = useState(filters.from);
  const [filterTo, setFilterTo] = useState(filters.to);

  useEffect(() => {
    setQuotes(initialQuotes);
    setFilterStatus(filters.status);
    setFilterFrom(filters.from);
    setFilterTo(filters.to);
    setIsRefreshing(false);
  }, [filters.from, filters.status, filters.to, initialQuotes, pagination.page]);

  useEffect(() => {
    setActionError(loadError);
  }, [loadError]);

  const closeDetailsModal = () => {
    setIsDetailsOpen(false);
  };

  const closeReplyModal = () => {
    setIsReplyOpen(false);
    setReplyText("");
  };

  const handleRefresh = () => {
    setActionError(null);
    setIsRefreshing(true);

    startTransition(() => {
      router.refresh();
    });
  };

  const navigateToFilters = (nextFilters: QuoteFilters, nextPage: number) => {
    if (hasSameFilters(filters, nextFilters) && nextPage === pagination.page) {
      return;
    }

    setIsRefreshing(true);
    startTransition(() => {
      router.push(buildAdminUrl(nextFilters, nextPage));
    });
  };

  const handleApplyFilters = () => {
    if (filterFrom && filterTo && filterFrom > filterTo) {
      setActionError("A data inicial nao pode ser maior que a data final.");
      return;
    }

    setActionError(null);
    navigateToFilters(
      {
        from: filterFrom,
        status: filterStatus,
        to: filterTo,
      },
      1,
    );
  };

  const handleClearFilters = () => {
    setActionError(null);
    navigateToFilters(
      {
        from: "",
        status: "all",
        to: "",
      },
      1,
    );
  };

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > pagination.totalPages || nextPage === pagination.page) {
      return;
    }

    navigateToFilters(filters, nextPage);
  };

  const loadQuoteMessages = async (quoteId: string) => {
    setMessages([]);
    setMessagesLoading(true);

    const { data, error } = await supabase
      .from("quote_messages")
      .select("id, quote_id, user_id, message, created_at")
      .eq("quote_id", quoteId)
      .order("created_at", { ascending: true });

    if (error) {
      setActionError(error.message);
      setMessages([]);
      setMessagesLoading(false);
      return;
    }

    setMessages((data ?? []) as QuoteMessage[]);
    setMessagesLoading(false);
  };

  const openDetailsModal = (quote: QuoteRecord) => {
    setSelectedQuote(quote);
    setActionError(null);
    setIsReplyOpen(false);
    setIsDetailsOpen(true);
    void loadQuoteMessages(quote.id);
  };

  const openReplyModal = (quote: QuoteRecord) => {
    setSelectedQuote(quote);
    setReplyText("");
    setActionError(null);
    setIsDetailsOpen(false);
    setIsReplyOpen(true);
    void loadQuoteMessages(quote.id);
  };

  const handleReplySubmit = async () => {
    if (!selectedQuote || !replyText.trim()) {
      return;
    }

    setIsSendingReply(true);
    setActionError(null);

    const { data, error } = await supabase
      .from("quote_messages")
      .insert({
        message: replyText.trim(),
        quote_id: selectedQuote.id,
        user_id: currentUserId,
      })
      .select("id, quote_id, user_id, message, created_at")
      .single();

    if (error) {
      setActionError(error.message);
      setIsSendingReply(false);
      return;
    }

    const nextUpdatedAt = new Date().toISOString();
    const { error: statusError } = await supabase
      .from("quotes")
      .update({
        status: "answered",
        updated_at: nextUpdatedAt,
      })
      .eq("id", selectedQuote.id);

    setMessages((currentMessages) => [...currentMessages, data as QuoteMessage]);
    setReplyText("");
    setIsSendingReply(false);
    setSelectedQuote((currentQuote) =>
      currentQuote
        ? {
          ...currentQuote,
          status: "answered",
          updated_at: nextUpdatedAt,
        }
        : currentQuote,
    );
    setQuotes((currentQuotes) => {
      const updatedQuotes = currentQuotes.map((quote) =>
        quote.id === selectedQuote.id
          ? {
            ...quote,
            status: "answered",
            updated_at: nextUpdatedAt,
          }
          : quote,
      );

      return filters.status === "pending"
        ? updatedQuotes.filter((quote) => quote.id !== selectedQuote.id)
        : updatedQuotes;
    });

    if (statusError) {
      setActionError(
        `A resposta foi salva, mas o status do quote nao foi atualizado: ${statusError.message}`,
      );
    }

    startTransition(() => {
      router.refresh();
    });
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      setActionError(error.message);
      setIsLoggingOut(false);
      return;
    }

    router.replace("/login");
    router.refresh();
  };

  return (
    <>
      <style>{adminStyles}</style>

      <main className="ad-root">
        <div className="ad-bg" />
        <div className="ad-noise" />

        <div className="ad-shell">
          <div className="ad-topbar">
            <div className="ad-brand">QuoteHub Admin</div>
            <div className="ad-topbar-actions">
              <button
                type="button"
                className="ad-btn-secondary"
                onClick={handleRefresh}
              >
                {isRefreshing ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCcw className="h-4 w-4" />
                )}
                Atualizar
              </button>
              <button
                type="button"
                className="ad-btn-secondary"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="h-4 w-4" />
                )}
                Sair
              </button>
            </div>
          </div>

          <section className="ad-hero">
            <div className="ad-hero-main">
              <span className="ad-eyebrow">Painel restrito</span>
              <h1 className="ad-title">
                Gerencie seus <em>orcamentos</em>
              </h1>
            </div>

          </section>

          <section className="ad-stats">
            <div className="ad-stat">
              <div className="ad-stat-label">Encontrados</div>
              <div className="ad-stat-value">{summary.total}</div>
            </div>
            <div className="ad-stat">
              <div className="ad-stat-label">Pendentes</div>
              <div className="ad-stat-value">{summary.pending}</div>
            </div>
            <div className="ad-stat">
              <div className="ad-stat-label">Respondidos</div>
              <div className="ad-stat-value">{summary.answered}</div>
            </div>
          </section>

          <section className="ad-filters">
            <span className="ad-section-kicker">Refinar listagem</span>
            <div className="ad-filter-grid">
              <label className="ad-field">
                <span className="ad-label">Status</span>
                <select
                  value={filterStatus}
                  onChange={(event) =>
                    setFilterStatus(event.target.value as QuoteStatusFilter)
                  }
                  className="ad-input"
                >
                  {statusOptions.map((statusOption) => (
                    <option key={statusOption.value} value={statusOption.value}>
                      {statusOption.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="ad-field">
                <span className="ad-label">Data inicial</span>
                <input
                  type="date"
                  value={filterFrom}
                  onChange={(event) => setFilterFrom(event.target.value)}
                  className="ad-input"
                />
              </label>

              <label className="ad-field">
                <span className="ad-label">Data final</span>
                <input
                  type="date"
                  value={filterTo}
                  onChange={(event) => setFilterTo(event.target.value)}
                  className="ad-input"
                />
              </label>

              <div className="ad-filter-actions">
                <button
                  type="button"
                  className="ad-btn-primary"
                  onClick={handleApplyFilters}
                >
                  Aplicar
                </button>
                <button
                  type="button"
                  className="ad-btn-secondary"
                  onClick={handleClearFilters}
                >
                  Limpar
                </button>
              </div>
            </div>
          </section>

          {actionError ? <div className="ad-error">{actionError}</div> : null}

          <section className="ad-list">
            {quotes.length === 0 ? (
              <div className="ad-empty">
                Nenhum orcamento encontrado com os filtros atuais.
              </div>
            ) : (
              quotes.map((quote) => (
                <article key={quote.id} className="ad-card">
                  <div className="ad-card-inner">
                    <div className="ad-card-main">
                      <div className="ad-card-top">
                        <h2 className="ad-card-title">{quote.name}</h2>
                        <span className={`ad-status ${getStatusClass(quote.status)}`}>
                          {getStatusLabel(quote.status)}
                        </span>
                      </div>

                      <div className="ad-card-grid">
                        <div className="ad-chip">
                          <span className="ad-chip-label">E-mail</span>
                          <span className="ad-chip-value">{quote.email}</span>
                        </div>
                        <div className="ad-chip">
                          <span className="ad-chip-label">Empresa</span>
                          <span className="ad-chip-value">
                            {quote.company || "Sem empresa"}
                          </span>
                        </div>
                        <div className="ad-chip">
                          <span className="ad-chip-label">Projeto</span>
                          <span className="ad-chip-value">
                            {getOptionLabel(projectTypes, quote.project_type_id)}
                          </span>
                        </div>
                        <div className="ad-chip">
                          <span className="ad-chip-label">Investimento</span>
                          <span className="ad-chip-value">
                            {getOptionLabel(budgets, quote.budget_range_id)}
                          </span>
                        </div>
                        <div className="ad-chip">
                          <span className="ad-chip-label">Prazo</span>
                          <span className="ad-chip-value">
                            {getOptionLabel(timelines, quote.timeline_id)}
                          </span>
                        </div>
                        <div className="ad-chip">
                          <span className="ad-chip-label">Recebido em</span>
                          <span className="ad-chip-value">
                            {formatDate(quote.created_at)}
                          </span>
                        </div>
                      </div>

                      <p className="ad-card-desc">
                        {quote.description?.trim() || "Sem descricao informada."}
                      </p>
                    </div>

                    <div className="ad-card-actions">
                      <button
                        type="button"
                        className="ad-btn-secondary"
                        onClick={() => openDetailsModal(quote)}
                      >
                        <Eye className="h-4 w-4" />
                        Ver dados
                      </button>
                      <button
                        type="button"
                        className="ad-btn-primary"
                        onClick={() => openReplyModal(quote)}
                      >
                        <MessageSquareText className="h-4 w-4" />
                        Responder
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </section>

          <section className="ad-pagination">
            <div className="ad-pagination-text">
              Pagina {pagination.page} de {pagination.totalPages} ·{" "}
              {pagination.totalItems} resultados
            </div>

            <div className="ad-topbar-actions">
              <button
                type="button"
                className="ad-btn-secondary"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page <= 1 || isRefreshing}
              >
                Anterior
              </button>
              <button
                type="button"
                className="ad-btn-secondary"
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages || isRefreshing}
              >
                Proxima
              </button>
            </div>
          </section>
        </div>
      </main>

      <AdminModal
        description="Resumo completo do pedido enviado pelo formulario publico."
        onClose={closeDetailsModal}
        open={isDetailsOpen && !!selectedQuote}
        title="Detalhes do pedido"
      >
        {selectedQuote ? (
          <div className="ad-detail-grid">
            <div className="ad-detail-box">
              <span className="ad-detail-label">Nome</span>
              <div className="ad-detail-value">{selectedQuote.name}</div>
            </div>
            <div className="ad-detail-box">
              <span className="ad-detail-label">E-mail</span>
              <div className="ad-detail-value">{selectedQuote.email}</div>
            </div>
            <div className="ad-detail-box">
              <span className="ad-detail-label">Empresa</span>
              <div className="ad-detail-value">
                {selectedQuote.company || "Nao informada"}
              </div>
            </div>
            <div className="ad-detail-box">
              <span className="ad-detail-label">Status</span>
              <div className="ad-detail-value">
                <span className={`ad-status ${getStatusClass(selectedQuote.status)}`}>
                  {getStatusLabel(selectedQuote.status)}
                </span>
              </div>
            </div>
            <div className="ad-detail-box">
              <span className="ad-detail-label">Tipo de projeto</span>
              <div className="ad-detail-value">
                {getOptionLabel(projectTypes, selectedQuote.project_type_id)}
              </div>
            </div>
            <div className="ad-detail-box">
              <span className="ad-detail-label">Faixa de investimento</span>
              <div className="ad-detail-value">
                {getOptionLabel(budgets, selectedQuote.budget_range_id)}
              </div>
            </div>
            <div className="ad-detail-box">
              <span className="ad-detail-label">Prazo</span>
              <div className="ad-detail-value">
                {getOptionLabel(timelines, selectedQuote.timeline_id)}
              </div>
            </div>
            <div className="ad-detail-box">
              <span className="ad-detail-label">Recebido em</span>
              <div className="ad-detail-value">
                {formatDate(selectedQuote.created_at)}
              </div>
            </div>
            <div className="ad-detail-box full">
              <span className="ad-detail-label">Descricao</span>
              <div className="ad-detail-value">
                {selectedQuote.description?.trim() || "Sem descricao informada."}
              </div>
            </div>
            <div className="ad-detail-box full">
              <span className="ad-detail-label">Historico</span>
              <div className="ad-history">
                {messagesLoading ? (
                  <div className="ad-detail-value">Carregando mensagens...</div>
                ) : messages.length === 0 ? (
                  <div className="ad-detail-value">
                    Este quote ainda nao possui mensagens.
                  </div>
                ) : (
                  messages.map((message) => (
                    <div key={message.id} className="ad-history-item">
                      <div className="ad-history-top">
                        <div className="ad-history-author">
                          {message.user_id === currentUserId ? "Voce" : "Admin"}
                        </div>
                        <div className="ad-history-date">
                          {formatDate(message.created_at)}
                        </div>
                      </div>
                      <div className="ad-history-text">{message.message}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ) : null}
      </AdminModal>

      <AdminModal
        className="ad-modal-panel--reply"
        description="Registre uma resposta interna ou historico de contato na tabela quote_messages."
        onClose={closeReplyModal}
        open={isReplyOpen && !!selectedQuote}
        title="Responder orcamento"
      >
        {selectedQuote ? (
          <div className="ad-detail-grid">
            <div className="ad-detail-box full">
              <span className="ad-detail-label">Pedido selecionado</span>
              <div className="ad-detail-value">
                <strong>{selectedQuote.name}</strong>
                <br />
                {selectedQuote.email}
                <br />
                {getOptionLabel(projectTypes, selectedQuote.project_type_id)}
              </div>
            </div>

            <div className="ad-detail-box full">
              <span className="ad-detail-label">Historico</span>
              <div className="ad-history">
                {messagesLoading ? (
                  <div className="ad-detail-value">Carregando mensagens...</div>
                ) : messages.length === 0 ? (
                  <div className="ad-detail-value">
                    Nenhuma resposta foi registrada ainda.
                  </div>
                ) : (
                  messages.map((message) => (
                    <div key={message.id} className="ad-history-item">
                      <div className="ad-history-top">
                        <div className="ad-history-author">
                          {message.user_id === currentUserId ? "Voce" : "Admin"}
                        </div>
                        <div className="ad-history-date">
                          {formatDate(message.created_at)}
                        </div>
                      </div>
                      <div className="ad-history-text">{message.message}</div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="ad-detail-box full">
              <span className="ad-detail-label">Nova resposta</span>
              <textarea
                value={replyText}
                onChange={(event) => setReplyText(event.target.value)}
                className="ad-textarea"
                placeholder="Escreva sua resposta para este orcamento..."
              />
            </div>

            <div className="ad-detail-box full">
              <div className="ad-modal-actions">
                <button
                  type="button"
                  className="ad-btn-secondary"
                  onClick={closeReplyModal}
                >
                  Fechar
                </button>
                <button
                  type="button"
                  className="ad-btn-primary"
                  onClick={() => void handleReplySubmit()}
                  disabled={isSendingReply || !replyText.trim()}
                >
                  {isSendingReply ? (
                    <>
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Salvar resposta
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </AdminModal>
    </>
  );
}
