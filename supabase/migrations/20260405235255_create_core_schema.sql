/*
  # Create AEW Atlas Core Schema

  1. New Tables
    - `wrestlers`
      - `id` (uuid, primary key)
      - `slug` (text, unique)
      - `ring_name` (text)
      - `full_name` (text, optional)
      - `image_url` (text, optional)
      - `hometown` (text, optional)
      - `billed_height` (text, optional)
      - `billed_weight` (text, optional)
      - `debut_date` (date, optional)
      - `alignment` (text, optional)
      - `gender_division` (text, optional)
      - `status` (text, optional)
      - `styles` (text[], optional)
      - `affiliations` (text[], optional)
      - `aliases` (text[], optional)
      - `bio` (text, optional)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `tag_teams`
      - `id` (uuid, primary key)
      - `slug` (text, unique)
      - `name` (text)
      - `image_url` (text, optional)
      - `official` (boolean)
      - `active` (boolean)
      - `debut_date` (date, optional)
      - `retired_date` (date, optional)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `tag_team_members`
      - `id` (uuid, primary key)
      - `tag_team_id` (uuid, foreign key)
      - `wrestler_id` (uuid, foreign key)
      - `joined_date` (date, optional)
      - `left_date` (date, optional)

    - `events`
      - `id` (uuid, primary key)
      - `slug` (text, unique)
      - `name` (text)
      - `event_type` (text)
      - `series_name` (text, optional)
      - `date` (date)
      - `venue` (text, optional)
      - `city` (text, optional)
      - `state_or_region` (text, optional)
      - `country` (text, optional)
      - `image_url` (text, optional)
      - `description` (text, optional)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `championships`
      - `id` (uuid, primary key)
      - `slug` (text, unique)
      - `name` (text)
      - `division` (text, optional)
      - `active` (boolean)
      - `introduced_date` (date, optional)
      - `retired_date` (date, optional)
      - `image_url` (text, optional)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `matches`
      - `id` (uuid, primary key)
      - `slug` (text, unique)
      - `event_id` (uuid, foreign key)
      - `order_on_card` (integer, optional)
      - `date` (date)
      - `match_type` (text, optional)
      - `stipulation` (text, optional)
      - `championship_id` (uuid, foreign key, optional)
      - `title_match` (boolean)
      - `title_changed_hands` (boolean)
      - `draw` (boolean)
      - `no_contest` (boolean)
      - `method` (text, optional)
      - `notes` (text, optional)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `match_participants`
      - `id` (uuid, primary key)
      - `match_id` (uuid, foreign key)
      - `wrestler_id` (uuid, foreign key, optional)
      - `tag_team_id` (uuid, foreign key, optional)
      - `side` (integer)
      - `role` (text)
      - `winner` (boolean)

    - `reigns`
      - `id` (uuid, primary key)
      - `championship_id` (uuid, foreign key)
      - `champion_wrestler_id` (uuid, foreign key, optional)
      - `champion_tag_team_id` (uuid, foreign key, optional)
      - `start_date` (date)
      - `end_date` (date, optional)
      - `won_at_event_id` (uuid, foreign key, optional)
      - `lost_at_event_id` (uuid, foreign key, optional)
      - `defenses` (integer)
      - `recognized_days` (integer, optional)
      - `reign_number` (integer, optional)
      - `active` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `favorites`
      - `id` (uuid, primary key)
      - `entity_type` (text)
      - `entity_id` (uuid)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (app is read-only for now)
*/

-- Create wrestlers table
CREATE TABLE IF NOT EXISTS wrestlers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  ring_name text NOT NULL,
  full_name text,
  image_url text,
  hometown text,
  billed_height text,
  billed_weight text,
  debut_date date,
  alignment text DEFAULT 'unknown',
  gender_division text DEFAULT 'unknown',
  status text DEFAULT 'active',
  styles text[],
  affiliations text[],
  aliases text[],
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tag_teams table
CREATE TABLE IF NOT EXISTS tag_teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  image_url text,
  official boolean DEFAULT false,
  active boolean DEFAULT true,
  debut_date date,
  retired_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tag_team_members table
CREATE TABLE IF NOT EXISTS tag_team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tag_team_id uuid NOT NULL REFERENCES tag_teams(id) ON DELETE CASCADE,
  wrestler_id uuid NOT NULL REFERENCES wrestlers(id) ON DELETE CASCADE,
  joined_date date,
  left_date date,
  UNIQUE(tag_team_id, wrestler_id)
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  event_type text NOT NULL,
  series_name text,
  date date NOT NULL,
  venue text,
  city text,
  state_or_region text,
  country text,
  image_url text,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create championships table
CREATE TABLE IF NOT EXISTS championships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  division text,
  active boolean DEFAULT true,
  introduced_date date,
  retired_date date,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create matches table
CREATE TABLE IF NOT EXISTS matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  order_on_card integer,
  date date NOT NULL,
  match_type text,
  stipulation text,
  championship_id uuid REFERENCES championships(id) ON DELETE SET NULL,
  title_match boolean DEFAULT false,
  title_changed_hands boolean DEFAULT false,
  draw boolean DEFAULT false,
  no_contest boolean DEFAULT false,
  method text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create match_participants table
CREATE TABLE IF NOT EXISTS match_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id uuid NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
  wrestler_id uuid REFERENCES wrestlers(id) ON DELETE CASCADE,
  tag_team_id uuid REFERENCES tag_teams(id) ON DELETE CASCADE,
  side integer NOT NULL,
  role text DEFAULT 'competitor',
  winner boolean DEFAULT false,
  CHECK (
    (wrestler_id IS NOT NULL AND tag_team_id IS NULL) OR
    (wrestler_id IS NULL AND tag_team_id IS NOT NULL)
  )
);

-- Create reigns table
CREATE TABLE IF NOT EXISTS reigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  championship_id uuid NOT NULL REFERENCES championships(id) ON DELETE CASCADE,
  champion_wrestler_id uuid REFERENCES wrestlers(id) ON DELETE CASCADE,
  champion_tag_team_id uuid REFERENCES tag_teams(id) ON DELETE CASCADE,
  start_date date NOT NULL,
  end_date date,
  won_at_event_id uuid REFERENCES events(id) ON DELETE SET NULL,
  lost_at_event_id uuid REFERENCES events(id) ON DELETE SET NULL,
  defenses integer DEFAULT 0,
  recognized_days integer,
  reign_number integer,
  active boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CHECK (
    (champion_wrestler_id IS NOT NULL AND champion_tag_team_id IS NULL) OR
    (champion_wrestler_id IS NULL AND champion_tag_team_id IS NOT NULL)
  )
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text NOT NULL,
  entity_id uuid NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_wrestlers_slug ON wrestlers(slug);
CREATE INDEX IF NOT EXISTS idx_wrestlers_status ON wrestlers(status);
CREATE INDEX IF NOT EXISTS idx_tag_teams_slug ON tag_teams(slug);
CREATE INDEX IF NOT EXISTS idx_tag_team_members_team ON tag_team_members(tag_team_id);
CREATE INDEX IF NOT EXISTS idx_tag_team_members_wrestler ON tag_team_members(wrestler_id);
CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date DESC);
CREATE INDEX IF NOT EXISTS idx_events_type ON events(event_type);
CREATE INDEX IF NOT EXISTS idx_championships_slug ON championships(slug);
CREATE INDEX IF NOT EXISTS idx_championships_active ON championships(active);
CREATE INDEX IF NOT EXISTS idx_matches_event ON matches(event_id);
CREATE INDEX IF NOT EXISTS idx_matches_championship ON matches(championship_id);
CREATE INDEX IF NOT EXISTS idx_match_participants_match ON match_participants(match_id);
CREATE INDEX IF NOT EXISTS idx_match_participants_wrestler ON match_participants(wrestler_id);
CREATE INDEX IF NOT EXISTS idx_match_participants_team ON match_participants(tag_team_id);
CREATE INDEX IF NOT EXISTS idx_reigns_championship ON reigns(championship_id);
CREATE INDEX IF NOT EXISTS idx_reigns_wrestler ON reigns(champion_wrestler_id);
CREATE INDEX IF NOT EXISTS idx_reigns_team ON reigns(champion_tag_team_id);
CREATE INDEX IF NOT EXISTS idx_reigns_active ON reigns(active);

-- Enable Row Level Security
ALTER TABLE wrestlers ENABLE ROW LEVEL SECURITY;
ALTER TABLE tag_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE tag_team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE championships ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE reigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can view wrestlers"
  ON wrestlers FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view tag teams"
  ON tag_teams FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view tag team members"
  ON tag_team_members FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view events"
  ON events FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view championships"
  ON championships FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view matches"
  ON matches FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view match participants"
  ON match_participants FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view reigns"
  ON reigns FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view favorites"
  ON favorites FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can manage favorites"
  ON favorites FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can delete favorites"
  ON favorites FOR DELETE
  TO anon, authenticated
  USING (true);