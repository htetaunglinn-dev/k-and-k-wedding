# K & K wedding invitation — version 3

Editable source for Aung Khine Soe & Htet Thiri Khine's invitation.
Includes the seven selected photos, Canon in D audio and attribution,
opening envelope, scratch-date reveal, RSVP API, and guest-list CSV export.

## Run on your computer

Requires Node.js 22.13 or newer with npm.

1. Unzip this folder and open a terminal inside it.
2. Run `npm ci`.
3. Create `.dev.vars` containing `GUEST_LIST_KEY=your-own-long-random-access-code`.
   This is only for your local guest-list page; use a unique private value.
4. Run `npm run build` to generate the local Worker configuration.
5. Initialize the local RSVP database:

   node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_crazy_rawhide_kid.sql

6. Run `npm run dev` and open the Local URL printed in the terminal.
7. Visit `/admin` and use the local access code to view/download local responses.

The local database is separate from the live invitation. No real guest data
or production access code is included. The development sign-in identity in
this starter is local-only and is not production authentication.

## Main files to edit

- app/page.tsx: invitation wording, photo sections, music player and RSVP form
- app/InvitationExperience.tsx: opening envelope and scratch-date interactions
- app/globals.css: colours, fonts, spacing, animations and responsive layout
- app/api/rsvp/route.ts: RSVP validation and saving
- app/admin/page.tsx and app/api/guests/route.ts: guest management and CSV export
- db/schema.ts and drizzle/: database schema and migration
- public/photos/: optimized photos
- public/music/: recording and license attribution

## Hosting and collaboration

This is a React/Vinext project using Cloudflare Workers and D1, not a single
HTML file. The source package has no live Site identity or credentials.
It can be edited in VS Code or another code editor without Sites editor access.
Sharing this ZIP does not grant access to the live site or its database.

To update the existing hosted invitation, send the changed source files back
to the owner and have them applied through the owner's authorized Sites workflow.
Keep saving a new Sites version for each update.

For a separate deployment, configure that host's Worker/D1 bindings,
database migration, GUEST_LIST_KEY secret, and access controls. Private access
on the current website is provided by Sites and does not automatically transfer
to another host. Do not expose guest-list routes without their authorization.

## Music and photos

The supplied couple photos are included for this invitation. Obtain the
couple's permission before reusing them elsewhere.

Canon in D Major by Kevin MacLeod (incompetech.com).
https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100301
Licensed under Creative Commons Attribution 3.0:
https://creativecommons.org/licenses/by/3.0/
Recording used without modification. Keep the attribution when sharing.
