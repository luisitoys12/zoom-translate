-- ZoomTranslate — Initial Database Schema
-- Project: woqkueabensezxjvlzjr

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  host_id TEXT,
  title TEXT,
  source_lang TEXT NOT NULL DEFAULT 'es-MX',
  target_lang TEXT NOT NULL DEFAULT 'en',
  is_public BOOLEAN DEFAULT TRUE,
  slug TEXT UNIQUE
);

-- Utterances table (each translated line)
CREATE TABLE IF NOT EXISTS utterances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  original_text TEXT NOT NULL,
  translated_text TEXT,
  source_lang TEXT NOT NULL,
  target_lang TEXT NOT NULL,
  confidence FLOAT,
  speaker TEXT
);

-- Enable Realtime for live shared sessions
ALTER PUBLICATION supabase_realtime ADD TABLE utterances;

-- RLS Policies
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE utterances ENABLE ROW LEVEL SECURITY;

-- Anyone can read public sessions
CREATE POLICY "Public sessions readable" ON sessions
  FOR SELECT USING (is_public = TRUE);

-- Anyone can read utterances of public sessions
CREATE POLICY "Public utterances readable" ON utterances
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM sessions s WHERE s.id = utterances.session_id AND s.is_public = TRUE)
  );

-- Authenticated users can insert
CREATE POLICY "Auth insert sessions" ON sessions
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Auth insert utterances" ON utterances
  FOR INSERT WITH CHECK (TRUE);

-- Indexes for performance
CREATE INDEX idx_utterances_session ON utterances(session_id, created_at DESC);
CREATE INDEX idx_sessions_slug ON sessions(slug);
