-- Seed AEW Atlas with sample data

-- Insert Wrestlers
INSERT INTO wrestlers (slug, ring_name, full_name, hometown, billed_height, billed_weight, alignment, gender_division, status, image_url, bio) VALUES
('kenny-omega', 'Kenny Omega', 'Tyson Smith', 'Winnipeg, Manitoba, Canada', '6''0"', '229', 'face', 'mens', 'active', 'https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg', 'The Best Bout Machine'),
('jon-moxley', 'Jon Moxley', 'Jonathan Good', 'Cincinnati, Ohio', '6''4"', '234', 'heel', 'mens', 'active', 'https://images.pexels.com/photos/3912952/pexels-photo-3912952.jpeg', 'The Purveyor of Violence'),
('bryan-danielson', 'Bryan Danielson', 'Bryan Lloyd Danielson', 'Aberdeen, Washington', '5''10"', '210', 'face', 'mens', 'active', 'https://images.pexels.com/photos/3764523/pexels-photo-3764523.jpeg', 'The American Dragon'),
('chris-jericho', 'Chris Jericho', 'Christopher Keith Irvine', 'Winnipeg, Manitoba, Canada', '6''0"', '227', 'heel', 'mens', 'active', 'https://images.pexels.com/photos/3764011/pexels-photo-3764011.jpeg', 'Le Champion'),
('mjf', 'MJF', 'Maxwell Jacob Friedman', 'Plainview, New York', '6''0"', '226', 'heel', 'mens', 'active', 'https://images.pexels.com/photos/3912953/pexels-photo-3912953.jpeg', 'The Salt of the Earth'),
('hangman-adam-page', 'Hangman Adam Page', 'Adam Page', 'Halifax, Virginia', '6''1"', '227', 'face', 'mens', 'active', 'https://images.pexels.com/photos/3764521/pexels-photo-3764521.jpeg', 'The Anxious Millennial Cowboy'),
('cm-punk', 'CM Punk', 'Phillip Jack Brooks', 'Chicago, Illinois', '6''2"', '218', 'face', 'mens', 'inactive', 'https://images.pexels.com/photos/3764520/pexels-photo-3764520.jpeg', 'The Voice of the Voiceless'),
('jade-cargill', 'Jade Cargill', 'Jade Cargill', 'Gifford, Florida', '5''10"', '160', 'heel', 'womens', 'alumni', 'https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg', 'That Bitch'),
('britt-baker', 'Britt Baker', 'Brittany Baker', 'Punxsutawney, Pennsylvania', '5''7"', '130', 'heel', 'womens', 'active', 'https://images.pexels.com/photos/3912954/pexels-photo-3912954.jpeg', 'The Role Model'),
('toni-storm', 'Toni Storm', 'Toni Rossall', 'Gold Coast, Australia', '5''5"', '134', 'face', 'womens', 'active', 'https://images.pexels.com/photos/3764522/pexels-photo-3764522.jpeg', 'Timeless Toni Storm'),
('young-bucks-matt', 'Matt Jackson', 'Matthew Massie', 'Hesperia, California', '6''0"', '198', 'heel', 'mens', 'active', 'https://images.pexels.com/photos/3764524/pexels-photo-3764524.jpeg', 'One half of The Young Bucks'),
('young-bucks-nick', 'Nick Jackson', 'Nicholas Massie', 'Hesperia, California', '6''0"', '194', 'heel', 'mens', 'active', 'https://images.pexels.com/photos/3764525/pexels-photo-3764525.jpeg', 'One half of The Young Bucks'),
('ftr-dax', 'Dax Harwood', 'David Harwood', 'Asheville, North Carolina', '5''10"', '227', 'face', 'mens', 'active', 'https://images.pexels.com/photos/3764526/pexels-photo-3764526.jpeg', 'One half of FTR'),
('ftr-cash', 'Cash Wheeler', 'Daniel Wheeler', 'Asheville, North Carolina', '6''1"', '237', 'face', 'mens', 'active', 'https://images.pexels.com/photos/3764527/pexels-photo-3764527.jpeg', 'One half of FTR'),
('will-ospreay', 'Will Ospreay', 'William Ospreay', 'Havering, England', '6''0"', '202', 'face', 'mens', 'active', 'https://images.pexels.com/photos/3764528/pexels-photo-3764528.jpeg', 'The Aerial Assassin'),
('mercedes-mone', 'Mercedes Moné', 'Mercedes Varnado', 'Boston, Massachusetts', '5''5"', '140', 'heel', 'womens', 'active', 'https://images.pexels.com/photos/3764529/pexels-photo-3764529.jpeg', 'The CEO'),
('mariah-may', 'Mariah May', 'Mariah May', 'London, England', '5''4"', '130', 'heel', 'womens', 'active', 'https://images.pexels.com/photos/3764530/pexels-photo-3764530.jpeg', 'The Glamour'),
('kazuchika-okada', 'Kazuchika Okada', 'Kazuchika Okada', 'Tokyo, Japan', '6''3"', '226', 'heel', 'mens', 'active', 'https://images.pexels.com/photos/3764531/pexels-photo-3764531.jpeg', 'The Rainmaker'),
('orange-cassidy', 'Orange Cassidy', 'James Cipperly', 'Wherever', '5''10"', '170', 'face', 'mens', 'active', 'https://images.pexels.com/photos/3764532/pexels-photo-3764532.jpeg', 'Freshly Squeezed'),
('eddie-kingston', 'Eddie Kingston', 'Edward Moore', 'Yonkers, New York', '5''10"', '270', 'face', 'mens', 'active', 'https://images.pexels.com/photos/3764533/pexels-photo-3764533.jpeg', 'The Mad King');

-- Insert Tag Teams
INSERT INTO tag_teams (slug, name, official, active) VALUES
('young-bucks', 'The Young Bucks', true, true),
('ftr', 'FTR', true, true),
('jurassic-express', 'Jurassic Express', true, false);

-- Link wrestlers to tag teams
INSERT INTO tag_team_members (tag_team_id, wrestler_id)
SELECT tt.id, w.id FROM tag_teams tt, wrestlers w
WHERE tt.slug = 'young-bucks' AND w.slug IN ('young-bucks-matt', 'young-bucks-nick');

INSERT INTO tag_team_members (tag_team_id, wrestler_id)
SELECT tt.id, w.id FROM tag_teams tt, wrestlers w
WHERE tt.slug = 'ftr' AND w.slug IN ('ftr-dax', 'ftr-cash');

-- Insert Championships
INSERT INTO championships (slug, name, division, active, introduced_date, image_url) VALUES
('aew-world-championship', 'AEW World Championship', 'mens', true, '2019-08-31', 'https://images.pexels.com/photos/3764534/pexels-photo-3764534.jpeg'),
('aew-womens-world-championship', 'AEW Women''s World Championship', 'womens', true, '2019-10-02', 'https://images.pexels.com/photos/3764535/pexels-photo-3764535.jpeg'),
('aew-tbs-championship', 'AEW TBS Championship', 'womens', true, '2022-01-05', 'https://images.pexels.com/photos/3764536/pexels-photo-3764536.jpeg'),
('aew-world-tag-team-championship', 'AEW World Tag Team Championship', 'tag', true, '2019-10-30', 'https://images.pexels.com/photos/3764537/pexels-photo-3764537.jpeg'),
('aew-tnt-championship', 'AEW TNT Championship', 'mens', true, '2020-05-23', 'https://images.pexels.com/photos/3764538/pexels-photo-3764538.jpeg'),
('aew-international-championship', 'AEW International Championship', 'mens', true, '2022-10-18', 'https://images.pexels.com/photos/3764539/pexels-photo-3764539.jpeg'),
('aew-continental-championship', 'AEW Continental Championship', 'mens', true, '2023-10-21', 'https://images.pexels.com/photos/3764540/pexels-photo-3764540.jpeg'),
('aew-world-trios-championship', 'AEW World Trios Championship', 'trios', true, '2022-09-04', 'https://images.pexels.com/photos/3764541/pexels-photo-3764541.jpeg');

-- Insert Events
INSERT INTO events (slug, name, event_type, date, city, venue, image_url) VALUES
('double-or-nothing-2019', 'Double or Nothing 2019', 'PPV', '2019-05-25', 'Las Vegas, NV', 'MGM Grand Garden Arena', 'https://images.pexels.com/photos/3764542/pexels-photo-3764542.jpeg'),
('all-out-2019', 'All Out 2019', 'PPV', '2019-08-31', 'Chicago, IL', 'Now Arena', 'https://images.pexels.com/photos/3764543/pexels-photo-3764543.jpeg'),
('full-gear-2019', 'Full Gear 2019', 'PPV', '2019-11-09', 'Baltimore, MD', 'Royal Farms Arena', 'https://images.pexels.com/photos/3764544/pexels-photo-3764544.jpeg'),
('revolution-2020', 'Revolution 2020', 'PPV', '2020-02-29', 'Chicago, IL', 'Wintrust Arena', 'https://images.pexels.com/photos/3764545/pexels-photo-3764545.jpeg'),
('double-or-nothing-2020', 'Double or Nothing 2020', 'PPV', '2020-05-23', 'Jacksonville, FL', 'Daily''s Place', 'https://images.pexels.com/photos/3764546/pexels-photo-3764546.jpeg'),
('all-out-2020', 'All Out 2020', 'PPV', '2020-09-05', 'Chicago, IL', 'Now Arena', 'https://images.pexels.com/photos/3764547/pexels-photo-3764547.jpeg'),
('full-gear-2020', 'Full Gear 2020', 'PPV', '2020-11-07', 'Jacksonville, FL', 'Daily''s Place', 'https://images.pexels.com/photos/3764548/pexels-photo-3764548.jpeg'),
('revolution-2021', 'Revolution 2021', 'PPV', '2021-03-07', 'Orlando, FL', 'Daily''s Place', 'https://images.pexels.com/photos/3764549/pexels-photo-3764549.jpeg'),
('double-or-nothing-2021', 'Double or Nothing 2021', 'PPV', '2021-05-30', 'Jacksonville, FL', 'Daily''s Place', 'https://images.pexels.com/photos/3764550/pexels-photo-3764550.jpeg'),
('all-out-2021', 'All Out 2021', 'PPV', '2021-09-05', 'Chicago, IL', 'Now Arena', 'https://images.pexels.com/photos/3764551/pexels-photo-3764551.jpeg'),
('full-gear-2021', 'Full Gear 2021', 'PPV', '2021-11-13', 'Minneapolis, MN', 'Target Center', 'https://images.pexels.com/photos/3764552/pexels-photo-3764552.jpeg'),
('revolution-2022', 'Revolution 2022', 'PPV', '2022-03-06', 'Orlando, FL', 'Addition Financial Arena', 'https://images.pexels.com/photos/3764553/pexels-photo-3764553.jpeg'),
('forbidden-door-2022', 'Forbidden Door 2022', 'PPV', '2022-06-26', 'Chicago, IL', 'United Center', 'https://images.pexels.com/photos/3764554/pexels-photo-3764554.jpeg'),
('all-out-2022', 'All Out 2022', 'PPV', '2022-09-04', 'Chicago, IL', 'Now Arena', 'https://images.pexels.com/photos/3764555/pexels-photo-3764555.jpeg'),
('full-gear-2022', 'Full Gear 2022', 'PPV', '2022-11-19', 'Newark, NJ', 'Prudential Center', 'https://images.pexels.com/photos/3764556/pexels-photo-3764556.jpeg'),
('revolution-2023', 'Revolution 2023', 'PPV', '2023-03-05', 'San Francisco, CA', 'Chase Center', 'https://images.pexels.com/photos/3764557/pexels-photo-3764557.jpeg'),
('all-in-2023', 'All In 2023', 'PPV', '2023-08-27', 'London, England', 'Wembley Stadium', 'https://images.pexels.com/photos/3764558/pexels-photo-3764558.jpeg'),
('full-gear-2023', 'Full Gear 2023', 'PPV', '2023-11-18', 'Los Angeles, CA', 'Inglewood Forum', 'https://images.pexels.com/photos/3764559/pexels-photo-3764559.jpeg'),
('revolution-2024', 'Revolution 2024', 'PPV', '2024-03-03', 'Greensboro, NC', 'Greensboro Coliseum', 'https://images.pexels.com/photos/3764560/pexels-photo-3764560.jpeg'),
('forbidden-door-2024', 'Forbidden Door 2024', 'PPV', '2024-06-30', 'Elmont, NY', 'UBS Arena', 'https://images.pexels.com/photos/3764561/pexels-photo-3764561.jpeg'),
('all-in-2024', 'All In 2024', 'PPV', '2024-08-25', 'London, England', 'Wembley Stadium', 'https://images.pexels.com/photos/3764562/pexels-photo-3764562.jpeg'),
('all-out-2024', 'All Out 2024', 'PPV', '2024-09-07', 'Chicago, IL', 'Now Arena', 'https://images.pexels.com/photos/3764563/pexels-photo-3764563.jpeg'),
('dynamite-premiere', 'Dynamite Premiere', 'Dynamite', '2019-10-02', 'Washington, DC', 'Capital One Arena', null),
('dynamite-2024-11-20', 'Dynamite: Full Gear Fallout', 'Dynamite', '2024-11-20', 'Salt Lake City, UT', 'Maverik Center', null),
('dynamite-2024-12-11', 'Dynamite: Holiday Bash', 'Dynamite', '2024-12-11', 'Dallas, TX', 'American Airlines Center', null);

-- Insert some championship reigns
INSERT INTO reigns (championship_id, champion_wrestler_id, start_date, end_date, won_at_event_id, lost_at_event_id, defenses, recognized_days, reign_number, active)
SELECT
  c.id,
  w.id,
  '2019-08-31',
  '2021-11-13',
  e1.id,
  e2.id,
  12,
  804,
  1,
  false
FROM championships c
CROSS JOIN wrestlers w
CROSS JOIN events e1
CROSS JOIN events e2
WHERE c.slug = 'aew-world-championship'
  AND w.slug = 'chris-jericho'
  AND e1.slug = 'all-out-2019'
  AND e2.slug = 'full-gear-2021'
LIMIT 1;

INSERT INTO reigns (championship_id, champion_wrestler_id, start_date, active, defenses, reign_number)
SELECT
  c.id,
  w.id,
  '2024-08-25',
  true,
  3,
  1
FROM championships c
CROSS JOIN wrestlers w
WHERE c.slug = 'aew-world-championship'
  AND w.slug = 'bryan-danielson'
LIMIT 1;

INSERT INTO reigns (championship_id, champion_wrestler_id, start_date, active, defenses, reign_number)
SELECT
  c.id,
  w.id,
  '2024-08-25',
  true,
  5,
  1
FROM championships c
CROSS JOIN wrestlers w
WHERE c.slug = 'aew-womens-world-championship'
  AND w.slug = 'mariah-may'
LIMIT 1;

INSERT INTO reigns (championship_id, champion_wrestler_id, start_date, active, defenses, reign_number)
SELECT
  c.id,
  w.id,
  '2024-06-30',
  true,
  8,
  1
FROM championships c
CROSS JOIN wrestlers w
WHERE c.slug = 'aew-tbs-championship'
  AND w.slug = 'mercedes-mone'
LIMIT 1;

INSERT INTO reigns (championship_id, champion_tag_team_id, start_date, active, defenses, reign_number)
SELECT
  c.id,
  tt.id,
  '2024-03-03',
  true,
  7,
  2
FROM championships c
CROSS JOIN tag_teams tt
WHERE c.slug = 'aew-world-tag-team-championship'
  AND tt.slug = 'young-bucks'
LIMIT 1;

INSERT INTO reigns (championship_id, champion_wrestler_id, start_date, active, defenses, reign_number)
SELECT
  c.id,
  w.id,
  '2024-09-07',
  true,
  2,
  1
FROM championships c
CROSS JOIN wrestlers w
WHERE c.slug = 'aew-international-championship'
  AND w.slug = 'will-ospreay'
LIMIT 1;
