Cast — Phase 1 Implementation Checklist

Goal: establish authenticated multi-user persistence for the core Cast experience.

Phase 1 outcome

By the end of this phase, Cast should support:

user login
user profile creation
saved Catch Ledger entries
saved Journal entries
saved Trip Plans
basic Talk to Papa conversation storage

Papa memory summaries can come after this once real data is flowing.

1. Supabase foundation
1.1 Create / confirm Supabase project
Confirm the active Supabase project for Cast
Save project URL and anon key
Confirm SQL editor access
1.2 Run schema
Paste and run the Cast schema SQL
Confirm these tables exist:
cast_profiles
cast_catch_logs
cast_journal_entries
cast_trip_plans
cast_papa_threads
cast_papa_messages
cast_memory_snapshots
cast_papa_presences
1.3 Verify RLS and seed data
Confirm Row Level Security is enabled
Confirm classic_papa exists in cast_papa_presences
2. Auth layer
2.1 Choose auth method

For Phase 1, use:

Supabase Auth
email/password login
2.2 Add auth UI

Create:

Sign Up page
Log In page
Log Out control
2.3 Add auth session handling
Detect current user on app load
Persist login session
Redirect unauthenticated users to login
Redirect authenticated users into Cast
2.4 Add protected route handling

Protect all app routes that should require login:

Catch Ledger
Journal
Trip Planner
Papa Dock
any future memory views
3. Profile system
3.1 Create profile on first login

On first successful sign-in:

check for existing cast_profiles row
if none exists, create one
3.2 Minimum profile fields for first creation

Use:

user_id
display_name
experience_level = 'beginner'
papa_presence_key = 'classic_papa'
optional blank arrays for favorites and targets
3.3 Build profile read/update flow

Create a simple profile loader and updater so the app can:

fetch current user profile
update favorite fish
update target fish
update home water
update preferred bait
update Papa presence later
3.4 Optional first-pass profile UI

A lightweight “My Profile” page or modal with:

display name
home water
favorite species
target species
preferred baits
experience level
4. Catch Ledger persistence
4.1 Connect Catch Ledger form to Supabase

On submit:

insert a row into cast_catch_logs
attach current auth.uid() as user_id
4.2 Load user catch history
fetch catches for current user only
sort by catch_date desc or created_at desc
4.3 Verify key fields save correctly
species
size_text
location
bait_used
technique_used
catch_date
notes
is_first_catch
4.4 Add edit/delete later if needed

Not required for first pass unless already easy

5. Journal persistence
5.1 Connect Journal form to Supabase

On submit:

insert into cast_journal_entries
attach current user id
5.2 Load user journal history
fetch entries for current user
sort by newest first
5.3 Verify key fields save correctly
title
prompt_text
entry_text
mood
water_teaching
entry_date
6. Trip Planner persistence
6.1 Connect Trip Planner form to Supabase

On submit:

insert into cast_trip_plans
attach current user id
6.2 Load trip plans for current user
fetch by current user
sort by trip date desc or upcoming first
6.3 Verify key fields save correctly
title
location
trip_date
target_species
bait_notes
gear_notes
trip_goal
notes
status
7. Talk to Papa persistence
7.1 Create thread when entering Papa Dock

Decide one of these:

create one new thread per session
or reuse one active thread for now
Recommendation

For Phase 1:

create one thread when the user opens Papa Dock and no active thread is set in local state
7.2 Save each message

For every exchange:

insert user message into cast_papa_messages
insert Papa response into cast_papa_messages
7.3 Load recent thread messages

When Papa Dock opens:

fetch messages for current thread
render prior conversation
7.4 Keep role values simple

Use:

user
papa

Even though schema allows grant, I’d standardize on user for app code going forward.

8. Supabase utility layer
8.1 Create a shared Supabase client

If not already created:

set up one central Supabase client file
8.2 Create a small service layer

Recommended files:

profileService.js
catchLogService.js
journalService.js
tripPlanService.js
papaService.js

This keeps components cleaner and easier to debug later.

9. Basic data loading strategy
9.1 On app load after auth

Fetch:

current profile
optional recent catches
optional recent journal entries
optional recent trip plans
9.2 Keep first pass simple

Avoid building a giant global store unless needed immediately.

A simple pattern is enough:

fetch on page load
save on submit
refresh local list after save
10. Testing checklist
Auth
Can sign up
Can log in
Session persists after refresh
Logged-out users cannot access protected pages
Profile
Profile row is created on first login
Profile updates save correctly
Profile loads correctly after refresh
Catch Ledger
New catch saves
Only signed-in user’s catches appear
Refresh preserves data
Journal
New entry saves
Only signed-in user’s entries appear
Refresh preserves data
Trip Planner
New trip saves
Only signed-in user’s plans appear
Refresh preserves data
Papa Dock
New thread or thread reuse works
User messages save
Papa messages save
Thread reload restores conversation
11. What NOT to build yet

To keep Phase 1 clean, do not build these yet:

memory snapshot generation
Papa prompt injection from memory
advanced profile customization
editable Papa presences from database
achievement systems
species unlock logic
photo uploads
admin tools

These belong after source persistence is working.

12. Best implementation order

If you want the cleanest development flow later tonight, I would do it in this order:

Step 1

Set up Supabase client + env vars

Step 2

Run schema and verify tables

Step 3

Implement auth

Step 4

Create/load profile on sign-in

Step 5

Connect Catch Ledger

Step 6

Connect Journal

Step 7

Connect Trip Planner

Step 8

Connect Papa Dock thread/message storage

That order gives you visible wins quickly and keeps dependencies logical.

13. Definition of “Phase 1 complete”

Phase 1 is complete when:

a user can sign in
Cast creates or loads that user’s profile
catches, journal entries, and trips persist
Papa Dock conversations persist
each user sees only their own data

At that point, Cast will officially have a living memory foundation.

14. Phase 2 preview

After Phase 1, the next natural phase is:

cast_memory_snapshots
prompt memory injection for Papa
profile-driven Papa presence selection
adventure progress persistence
resume / replay logic

That will be the moment Cast stops being just persistent and starts feeling truly relational.