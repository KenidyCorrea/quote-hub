// services/quoteService.ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const getQuoteOptions = async () => {
    const [projectTypes, budgets, timelines] = await Promise.all([
        supabase.from("project_types").select("*").order("label"),
        supabase.from("budget_ranges").select("*").order("label"),
        supabase.from("timelines").select("*").order("label"),
    ]);

    if (projectTypes.error) throw projectTypes.error;
    if (budgets.error) throw budgets.error;
    if (timelines.error) throw timelines.error;

    return {
        projectTypes: projectTypes.data,
        budgets: budgets.data,
        timelines: timelines.data,
    };
};

export const createQuote = async (formData: any) => {
    const { error } = await supabase.from("quotes").insert({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        project_type_id: formData.projectType,
        budget_range_id: formData.budget,
        timeline_id: formData.timeline,
        description: formData.description,
    });

    if (error) throw error;
};