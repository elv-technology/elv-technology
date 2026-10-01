# Security update — deployment checklist

These steps go with the security update in this folder. Do them **in this order**.
Steps 1–4 must be done **before** you deploy, or the admin login will not work.

## 1. Back up the production database
Run this on a computer with PostgreSQL tools installed, using the `POSTGRES_URL` value from Vercel:

```bash
pg_dump "<POSTGRES_URL value>" --no-owner --format=custom --file=etssmart-backup.dump
```

Keep the file somewhere safe, outside this project folder.

## 2. Create the admin login values
From this folder:

```bash
npm run hash-password -- "Choose-A-Long-Password-Here"
```

This prints `ADMIN_PASSWORD_HASH=...` and `SESSION_SECRET=...`. The password must be at least 12 characters.

## 3. Add the new variables in Vercel
Vercel → Project → Settings → Environment Variables. Add each one as **Sensitive**, for **Production and Preview**:

| Name | Value |
|---|---|
| `ADMIN_USERNAME` | the admin username you want (not `admin`) |
| `ADMIN_PASSWORD_HASH` | from step 2 |
| `SESSION_SECRET` | from step 2 |
| `NEXT_PUBLIC_GA_ID` | your GA4 Measurement ID (`G-XXXXXXX`). It's missing today, so Google Analytics isn't running |

Optional, recommended: add **Upstash Redis** from the Vercel Marketplace (Storage tab). It creates
`UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`, so rate limits are shared across all server instances.
Without it, the limits still work, but only per instance.

## 4. Sync the database migration history (one time) — before testing the Preview
The build no longer runs `prisma db push`, which could drop data. Schema changes are now applied deliberately.
The production tables already exist, so the migration history only needs to be marked as applied.

**Do this before step 5.** The new code reads new columns (SEO title / description), and Preview
deployments use the production database, so the columns must exist first. The migration only *adds*
things, so the old live site keeps working. After running it, do not redeploy the old code: its build
runs `prisma db push`, which would remove the new columns again.

Run these from the `elv-technology-main` folder (it reads the production database URL from `.env`).
In PowerShell, use `npx.cmd` / `npm.cmd` instead of `npx` / `npm`:

```bash
npx prisma migrate status
```

- If it says the database has **no migration history** or lists `0_init` as not applied, run:

```bash
npx prisma migrate resolve --applied 0_init
```

```bash
npx prisma migrate resolve --applied 20260412230452_add_knowledge_base
```

```bash
npx prisma migrate deploy
```

  The last command applies `20261001000000_sync_db_push_changes`. It only adds what is missing
  (the `vector` extension, the chatbot `embedding` column, the SEO title/description columns) and is safe to run.
- Run `npx prisma migrate status` again. It should say the database schema is up to date.

## 5. Deploy to a Preview first, then test
Upload or push the code so that Vercel creates a **Preview** deployment, and check:

- [ ] `/admin` redirects to `/admin/login` when logged out.
- [ ] You can log in with the new username and password, and log out.
- [ ] After 5 wrong passwords, login is blocked for 15 minutes.
- [ ] In the browser console, a fake cookie (`document.cookie = "admin_session=true"`) does **not** give access.
- [ ] Creating, editing and deleting a blog, case study, career, FAQ, partner and client all work, including image upload.
- [ ] The contact form, careers form (with a CV) and chatbot lead form deliver their emails.
- [ ] Blog posts and case studies display correctly, including formatting and images.

**SEO checks** (compare with the live site):
- [ ] `/sitemap.xml` lists the same URLs as before, plus any newer blog posts.
- [ ] `/robots.txt` now also has `Disallow: /admin` and `Disallow: /api/`.
- [ ] The old `.html` URLs (e.g. `/about-us.html`) still redirect to the same pages.
- [ ] Page titles are no longer doubled ("| ETS Smart | ETS Smart") and blog/case-study titles are 60 characters or less,
      unless no automatic shortening was possible (see the SEO title field below).
- [ ] The old broken links now redirect: `/services.html`, `/networking-communication-solutions.html`,
      `/iptv-solutions.html`, `/cctv-supplier-installation-service-abu-dhabi.html`.
- [ ] Editing a blog post or case study in the admin shows the new **SEO Title / Meta Description** fields
      with a Google preview, and saving updates the live page title.
- [ ] Google Rich Results Test passes for the home page and a blog post.
- [ ] Sharing a page link on WhatsApp or LinkedIn shows the new preview image.

Then promote the deployment to Production.

**Right after promoting:** Google Search Console → URL Inspection → `https://www.etssmart.com/` → **Request indexing**
(replaces the old "Something went wrong" snippet), then Sitemaps → resubmit `sitemap.xml`.

**Database connections:** in Vercel → Storage → your database, if a **pooled** connection string is offered,
use it for `DATABASE_URL`. Otherwise add `&connection_limit=1` to the end of `DATABASE_URL`. This stops traffic
spikes (such as Google crawling many pages at once) from using up the database's connections.

## 6. Rotate all keys (they have been stored in local files and in Credentials.xlsx)
Do this right after the production deploy. After each step, redeploy so the new value is used.

1. **Resend**: create a new API key, update `RESEND_API_KEY` in Vercel, then delete the old key in Resend.
2. **Google Gemini**: create a new key in Google AI Studio, update `GOOGLE_GENERATIVE_AI_API_KEY`, then delete the old one.
3. **UploadThing**: create a new token, update `UPLOADTHING_TOKEN`, then delete the old one.
4. **Database**: Vercel → Storage → your database → reset credentials. Vercel updates the `*_URL` variables automatically.
5. Delete the passwords and keys from `Credentials.xlsx`, and delete the local `.env` files (or replace them with values for a separate development database).

## 7. Rebuild the chatbot knowledge base
The chatbot now uses current Gemini models. The old stored embeddings come from a retired model and must be regenerated:

```bash
npm run seed:knowledge
```

Run it with `DATABASE_URL` and `GOOGLE_GENERATIVE_AI_API_KEY` available, either in `.env` or with `ENV_FILE=.env.local`.
Run it again whenever solutions, services or FAQs change.

## 8. Vercel account and project settings
- [ ] Turn on two-factor authentication for every Vercel team member, and remove anyone who no longer needs access.
- [ ] Settings → Deployment Protection: protect **Preview** deployments.
- [ ] Give Preview and Development their own database instead of the production one, and limit the production
      database variables to the **Production** environment. Mark them Sensitive if Vercel allows it.
- [ ] Optional: Firewall → add a rate-limit rule for `/api/admin/login`, `/api/contact` and `/api/careers`.

## 9. One week after release
- [ ] Google Search Console → Pages: no new "Not found (404)" or "Blocked" errors.
- [ ] Open the site with the browser console open. If there are no `Content-Security-Policy` violation messages,
      change `Content-Security-Policy-Report-Only` to `Content-Security-Policy` in `next.config.mjs` to enforce it.
