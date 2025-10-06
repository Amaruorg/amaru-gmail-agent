export function formatDate(dateStr?: string | null): string {
    if (!dateStr) return "(no date)";
    try {
        return new Date(dateStr).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
    } catch {
        return String(dateStr);
    }
}

export function formatSummariesMarkdown(actions: any[]): string {
    return actions
        .filter((a) => a?.type === "summarize")
        .map((action: any) => {
            return [
                (action.emailSummary || "").trim(),
            ].join("\n\n");
        })
        .join("\n\n---\n\n");
}

export function formatActionsMarkdown(actions: any[]): string {
    return actions
        .map((action: any, index: number) => {
            if (action.type === "summarize") {
                return [
                    `### Email ${index + 1} — Summary (emailId: ${action.emailId})`,
                    "",
                    `- Category: **${action.category || "Unspecified"}**`,
                    "",
                    (action.emailSummary || "").trim(),
                ].join("\n");
            } else if (action.type === "schedule_google_calendar") {
                const ev = action.event || {};
                return [
                    `### Email ${index + 1} — Calendar Event (emailId: ${action.emailId})`,
                    "",
                    `- Title: **${ev.eventTitle || "(no title)"}**`,
                    `- When: ${formatDate(ev.start)} — ${formatDate(ev.end)}`,
                    `- Location: ${ev.location || "(none)"}`,
                    "",
                    (ev.description || "").trim(),
                ].join("\n");
            } else {
                return `### Email ${index + 1} — Unknown action type (${action.type})`;
            }
        })
        .join("\n\n---\n\n");
}
