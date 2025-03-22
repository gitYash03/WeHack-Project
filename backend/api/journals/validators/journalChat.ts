import {z} from "zod";

export const journalChatSchema = z.object({
    entry_text: z.string(),
    mode: z.enum(["Stoic", "Sensitive", "Creative", "Analytical"]),
  });