CREATE TABLE journal_messages (
    id SERIAL PRIMARY KEY,
    conversation_id TEXT DEFAULT gen_random_uuid()::text,
    sender VARCHAR(10) NOT NULL,    -- 'user' or 'ai'
    message_text TEXT NOT NULL,     -- The actual message text
    mode VARCHAR(50) NOT NULL,        -- The chat mode (Stoic, Supportive, etc.)
    created_at TIMESTAMPTZ DEFAULT NOW()
);
