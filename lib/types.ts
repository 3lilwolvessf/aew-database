export type Wrestler = {
  id: string;
  slug: string;
  ring_name: string;
  full_name?: string;
  image_url?: string;
  hometown?: string;
  billed_height?: string;
  billed_weight?: string;
  debut_date?: string;
  alignment?: 'face' | 'heel' | 'tweener' | 'unknown';
  gender_division?: 'mens' | 'womens' | 'mixed' | 'unknown';
  status?: 'active' | 'inactive' | 'alumni' | 'unknown';
  styles?: string[];
  affiliations?: string[];
  aliases?: string[];
  bio?: string;
  created_at?: string;
  updated_at?: string;
};

export type TagTeam = {
  id: string;
  slug: string;
  name: string;
  image_url?: string;
  official?: boolean;
  active?: boolean;
  debut_date?: string;
  retired_date?: string;
  created_at?: string;
  updated_at?: string;
  members?: Wrestler[];
};

export type Event = {
  id: string;
  slug: string;
  name: string;
  event_type: 'PPV' | 'Dynamite' | 'Collision' | 'Rampage' | 'Special' | 'Other';
  series_name?: string;
  date: string;
  venue?: string;
  city?: string;
  state_or_region?: string;
  country?: string;
  image_url?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
};

export type Match = {
  id: string;
  slug: string;
  event_id: string;
  order_on_card?: number;
  date: string;
  match_type?: string;
  stipulation?: string;
  championship_id?: string | null;
  title_match?: boolean;
  title_changed_hands?: boolean;
  draw?: boolean;
  no_contest?: boolean;
  method?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
};

export type MatchParticipant = {
  id: string;
  match_id: string;
  wrestler_id?: string;
  tag_team_id?: string;
  side: number;
  role?: string;
  winner?: boolean;
  wrestler?: Wrestler;
  tag_team?: TagTeam;
};

export type Championship = {
  id: string;
  slug: string;
  name: string;
  division?: string;
  active: boolean;
  introduced_date?: string;
  retired_date?: string | null;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
};

export type Reign = {
  id: string;
  championship_id: string;
  champion_wrestler_id?: string | null;
  champion_tag_team_id?: string | null;
  start_date: string;
  end_date?: string | null;
  won_at_event_id?: string | null;
  lost_at_event_id?: string | null;
  defenses?: number;
  recognized_days?: number;
  reign_number?: number;
  active: boolean;
  created_at?: string;
  updated_at?: string;
  wrestler?: Wrestler;
  tag_team?: TagTeam;
  championship?: Championship;
};

export type Favorite = {
  id: string;
  entity_type: 'wrestler' | 'event' | 'championship' | 'tag_team' | 'compare_pair';
  entity_id: string;
  created_at: string;
};

export type WrestlerStats = {
  total_matches: number;
  wins: number;
  losses: number;
  draws: number;
  win_rate: number;
  title_reigns: number;
  current_championships: Championship[];
  recent_form: { result: 'W' | 'L' | 'D'; match_id: string }[];
};
