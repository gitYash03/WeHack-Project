import {z} from "zod";

export const journalChatSchema = z.object({
    user_uuid: z.string(),
    conversation_id: z.string(),
    entry_text: z.string(),
    mode: z.enum(["Stoic", "Sensitive", "Creative", "Analytical"]),
  });