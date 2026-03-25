import { redirect } from "next/navigation";

import AdminDashboard from "@/app/components/admin/AdminDashboard";
import type {
  QuoteFilters,
  QuoteOption,
  QuotePagination,
  QuoteRecord,
  QuoteStatusFilter,
  QuoteSummary,
} from "@/app/lib/quote-types";
import { createSupabaseServerClient } from "@/app/lib/supabase/server";

const PAGE_SIZE = 10;

type AdminPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeStatus(value: string | undefined): QuoteStatusFilter {
  return value === "pending" || value === "answered" ? value : "all";
}

function normalizeDate(value: string | undefined) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value ?? "") ? value ?? "" : "";
}

function normalizePage(value: string | undefined) {
  const parsedPage = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const supabase = await createSupabaseServerClient();
  const resolvedSearchParams = await searchParams;

  const filters: QuoteFilters = {
    from: normalizeDate(getSingleParam(resolvedSearchParams.from)),
    status: normalizeStatus(getSingleParam(resolvedSearchParams.status)),
    to: normalizeDate(getSingleParam(resolvedSearchParams.to)),
  };

  const requestedPage = normalizePage(getSingleParam(resolvedSearchParams.page));

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let totalCountQuery = supabase.from("quotes").select("id", {
    count: "exact",
    head: true,
  });

  if (filters.from) {
    totalCountQuery = totalCountQuery.gte("created_at", `${filters.from}T00:00:00`);
  }

  if (filters.to) {
    totalCountQuery = totalCountQuery.lte("created_at", `${filters.to}T23:59:59.999999`);
  }

  if (filters.status !== "all") {
    totalCountQuery = totalCountQuery.eq("status", filters.status);
  }

  let pendingCountQuery = supabase.from("quotes").select("id", {
    count: "exact",
    head: true,
  });

  let answeredCountQuery = supabase.from("quotes").select("id", {
    count: "exact",
    head: true,
  });

  if (filters.from) {
    pendingCountQuery = pendingCountQuery.gte("created_at", `${filters.from}T00:00:00`);
    answeredCountQuery = answeredCountQuery.gte("created_at", `${filters.from}T00:00:00`);
  }

  if (filters.to) {
    pendingCountQuery = pendingCountQuery.lte(
      "created_at",
      `${filters.to}T23:59:59.999999`,
    );
    answeredCountQuery = answeredCountQuery.lte(
      "created_at",
      `${filters.to}T23:59:59.999999`,
    );
  }

  pendingCountQuery = pendingCountQuery.eq("status", "pending");
  answeredCountQuery = answeredCountQuery.eq("status", "answered");

  const [
    totalCountResponse,
    pendingCountResponse,
    answeredCountResponse,
    projectTypesResponse,
    budgetsResponse,
    timelinesResponse,
  ] = await Promise.all([
    totalCountQuery,
    pendingCountQuery,
    answeredCountQuery,
    supabase.from("project_types").select("id, label"),
    supabase.from("budget_ranges").select("id, label"),
    supabase.from("timelines").select("id, label"),
  ]);

  const totalItems = totalCountResponse.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);
  const rangeFrom = (currentPage - 1) * PAGE_SIZE;
  const rangeTo = rangeFrom + PAGE_SIZE - 1;

  let quotesQuery = supabase
    .from("quotes")
    .select(
      "id, name, email, company, project_type_id, budget_range_id, timeline_id, description, status, created_at, updated_at",
    )
    .order("created_at", { ascending: false })
    .range(rangeFrom, rangeTo);

  if (filters.from) {
    quotesQuery = quotesQuery.gte("created_at", `${filters.from}T00:00:00`);
  }

  if (filters.to) {
    quotesQuery = quotesQuery.lte("created_at", `${filters.to}T23:59:59.999999`);
  }

  if (filters.status !== "all") {
    quotesQuery = quotesQuery.eq("status", filters.status);
  }

  const quotesResponse = await quotesQuery;

  const loadError =
    quotesResponse.error?.message ??
    totalCountResponse.error?.message ??
    pendingCountResponse.error?.message ??
    answeredCountResponse.error?.message ??
    projectTypesResponse.error?.message ??
    budgetsResponse.error?.message ??
    timelinesResponse.error?.message ??
    null;

  const pagination: QuotePagination = {
    page: currentPage,
    pageSize: PAGE_SIZE,
    totalItems,
    totalPages,
  };

  const summary: QuoteSummary = {
    answered: answeredCountResponse.count ?? 0,
    pending: pendingCountResponse.count ?? 0,
    total: totalItems,
  };

  return (
    <AdminDashboard
      budgets={(budgetsResponse.data ?? []) as QuoteOption[]}
      currentUserEmail={user.email ?? ""}
      currentUserId={user.id}
      filters={filters}
      initialQuotes={(quotesResponse.data ?? []) as QuoteRecord[]}
      loadError={loadError}
      pagination={pagination}
      projectTypes={(projectTypesResponse.data ?? []) as QuoteOption[]}
      summary={summary}
      timelines={(timelinesResponse.data ?? []) as QuoteOption[]}
    />
  );
}
