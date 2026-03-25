// hooks/useQuoteOptions.ts
import { useEffect, useState } from "react";
import { getQuoteOptions } from "../services/quoteService";

type Option = {
    id: string;
    value: string;
    label: string;
    icon?: string;
};

export const useQuoteOptions = () => {
    const [data, setData] = useState<{
        projectTypes: Option[];
        budgets: Option[];
        timelines: Option[];
    }>({
        projectTypes: [],
        budgets: [],
        timelines: [],
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getQuoteOptions()
            .then(setData)
            .finally(() => setLoading(false));
    }, []);
    return { ...data, loading };
};