export type QuoteOption = {
  id: string;
  label: string;
  value?: string | null;
  icon?: string | null;
};

export type QuoteRecord = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  project_type_id: string | null;
  budget_range_id: string | null;
  timeline_id: string | null;
  description: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type QuoteMessage = {
  id: string;
  quote_id: string | null;
  user_id: string | null;
  message: string;
  created_at: string | null;
};

export type QuoteStatusFilter = "all" | "pending" | "answered";

export type QuoteFilters = {
  status: QuoteStatusFilter;
  from: string;
  to: string;
};

export type QuoteSummary = {
  total: number;
  pending: number;
  answered: number;
};

export type QuotePagination = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};
