# ✅ RATECOO - DEPLOYMENT CHECKLIST

Use this checklist to deploy RateCoo to Vercel.

---

## PRE-DEPLOYMENT (Today)

### Local Setup
- [ ] pnpm install completes
- [ ] No TypeScript errors: `pnpm type-check`
- [ ] No linting errors: `pnpm lint`
- [ ] Build succeeds: `pnpm build`
- [ ] All 4 apps start: `pnpm dev`
- [ ] Landing loads at http://localhost:3000
- [ ] Member loads at http://localhost:3001
- [ ] Admin loads at http://localhost:3002
- [ ] Widget loads at http://localhost:3003

### GitHub Setup
- [ ] GitHub account ready
- [ ] New repo created
- [ ] Repository cloned locally
- [ ] Code pushed to GitHub main branch

### Turso Database
- [ ] Turso account created
- [ ] Turso CLI installed
- [ ] `turso auth login` completed
- [ ] Production database created: `turso db create ratecoo-prod`
- [ ] Token generated: `turso db tokens create ratecoo-prod`
- [ ] TURSO_DATABASE_URL copied
- [ ] TURSO_AUTH_TOKEN copied

### Secrets Generated
- [ ] AUTH_SECRET generated (random 32 bytes)
- [ ] PAYLOAD_SECRET generated (random 32 bytes)
- [ ] Secrets saved securely

---

## VERCEL SETUP (15 minutes)

### Project 1: Landing
- [ ] Go to https://vercel.com/new
- [ ] Import GitHub repository
- [ ] Root directory: `apps/landing`
- [ ] Project name: `ratecoo-landing`
- [ ] Deploy!
- [ ] Get production URL (e.g., ratecoo-landing-xxx.vercel.app)

### Project 2: Member
- [ ] Create new Vercel project
- [ ] Root directory: `apps/member`
- [ ] Project name: `ratecoo-member`
- [ ] Deploy!
- [ ] Get production URL (e.g., ratecoo-member-xxx.vercel.app)

### Project 3: Admin
- [ ] Create new Vercel project
- [ ] Root directory: `apps/admin`
- [ ] Project name: `ratecoo-admin`
- [ ] Deploy!
- [ ] Get production URL (e.g., ratecoo-admin-xxx.vercel.app)

### Project 4: Widget
- [ ] Create new Vercel project
- [ ] Root directory: `apps/widget`
- [ ] Project name: `ratecoo-widget`
- [ ] Deploy!
- [ ] Get production URL (e.g., ratecoo-widget-xxx.vercel.app)

---

## ENVIRONMENT VARIABLES (For Each Vercel Project)

Use the Vercel dashboard > Settings > Environment Variables

### All Projects Need:
- [ ] `TURSO_DATABASE_URL` = Your Turso URL
- [ ] `TURSO_AUTH_TOKEN` = Your Turso token

### Landing Only:
(No additional variables needed)

### Member Only:
- [ ] `AUTH_SECRET` = Your generated secret
- [ ] `AUTH_URL` = https://ratecoo-member-xxx.vercel.app
- [ ] `NEXT_PUBLIC_PAYLOAD_API_URL` = https://ratecoo-admin-xxx.vercel.app
- [ ] `NEXT_PUBLIC_API_URL` = https://ratecoo-member-xxx.vercel.app
- [ ] `NEXT_PUBLIC_WIDGET_URL` = https://ratecoo-widget-xxx.vercel.app

### Admin Only:
- [ ] `PAYLOAD_SECRET` = Your generated secret
- [ ] Set `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`

### Widget Only:
(No additional variables needed)

---

## DATABASE SETUP (5 minutes)

### Push Schema
- [ ] In your local terminal:
  ```bash
  # Update .env.local with production Turso credentials
  TURSO_DATABASE_URL="libsql://ratecoo-prod-xxx.turso.io"
  TURSO_AUTH_TOKEN="your-token"
  ```
- [ ] Run: `pnpm db:push`
- [ ] Tables created:
  - [ ] users
  - [ ] projects
  - [ ] reviews

### Verify Database
- [ ] Open Drizzle Studio: `pnpm db:studio`
- [ ] Tables are visible
- [ ] Schema matches expectations

---

## VERIFICATION (After All Deploys)

### Landing Page
- [ ] Visit https://ratecoo-landing-xxx.vercel.app
- [ ] Home page loads
- [ ] Pricing section visible
- [ ] Sign In button works
- [ ] Sign Up button works

### Member Dashboard
- [ ] Visit https://ratecoo-member-xxx.vercel.app
- [ ] Redirects to /auth/signin (not authenticated)
- [ ] Sign In page loads
- [ ] Try demo@example.com / password
- [ ] Dashboard loads after sign in
- [ ] Navigation works
- [ ] Create Project button visible

### Admin Panel
- [ ] Visit https://ratecoo-admin-xxx.vercel.app
- [ ] Admin dashboard loads
- [ ] API documentation visible
- [ ] Users/Projects/Reviews links visible

### Widget
- [ ] Visit https://ratecoo-widget-xxx.vercel.app
- [ ] Should see Vite app or 404 (that's ok)
- [ ] Check Network tab - widget.js downloads
- [ ] File size < 20KB

---

## CUSTOM DOMAIN (Optional)

### Landing Domain
- [ ] In Vercel: Settings → Domains
- [ ] Add your domain (e.g., ratecoo.com)
- [ ] Update DNS records as shown
- [ ] Verify DNS
- [ ] Domain active

### Member Domain
- [ ] In Vercel: Settings → Domains
- [ ] Add subdomain (e.g., app.ratecoo.com)
- [ ] Update DNS
- [ ] Verify

### Admin Domain
- [ ] In Vercel: Settings → Domains
- [ ] Add subdomain (e.g., admin.ratecoo.com)
- [ ] Update DNS
- [ ] Verify

### Widget Domain
- [ ] In Vercel: Settings → Domains
- [ ] Add subdomain (e.g., widget.ratecoo.com)
- [ ] Update DNS
- [ ] Verify

---

## API TESTING

### Test Widget Config Endpoint
```bash
curl https://ratecoo-admin-xxx.vercel.app/api/custom/widget/demo-project
```
- [ ] Returns JSON with widget config
- [ ] Status 200
- [ ] Contains settings.color, show_branding, etc.

### Test Reviews Endpoint
```bash
curl -X POST https://ratecoo-admin-xxx.vercel.app/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "project_id": "demo",
    "customer_name": "Test",
    "rating": 5,
    "comment": "Works!"
  }'
```
- [ ] Returns JSON response
- [ ] Status 201 (created)

---

## FINAL VERIFICATION CHECKLIST

### All Apps Deployed
- [ ] Landing live ✅
- [ ] Member live ✅
- [ ] Admin live ✅
- [ ] Widget live ✅

### All Integrations Working
- [ ] Landing links point to Member
- [ ] Member authenticates
- [ ] Member connects to Admin API
- [ ] Widget loads from correct URL
- [ ] APIs respond

### Database Connected
- [ ] Can read from database
- [ ] Can write to database
- [ ] Data persists across deployments

### Security Verified
- [ ] No secrets in code ✅
- [ ] Env vars set in Vercel ✅
- [ ] CORS working ✅
- [ ] HTTPS everywhere ✅

---

## POST-DEPLOYMENT (After Going Live)

### Monitoring
- [ ] Setup monitoring (Sentry, LogRocket, etc)
- [ ] Setup error tracking
- [ ] Setup performance monitoring
- [ ] Setup uptime monitoring

### Analytics
- [ ] Setup Google Analytics
- [ ] Setup product analytics
- [ ] Monitor user behavior

### Backups
- [ ] Enable Turso backups
- [ ] Test backup restoration
- [ ] Document backup procedure

### Team Access
- [ ] Add team members to Vercel
- [ ] Add team members to Turso
- [ ] Add team members to GitHub
- [ ] Setup access controls

### Documentation
- [ ] Update README with live URLs
- [ ] Document deployment process
- [ ] Create runbook for common tasks
- [ ] Setup incident response plan

---

## TROUBLESHOOTING

### Build Fails
- [ ] Check Vercel logs
- [ ] Verify environment variables set
- [ ] Check branch is `main`
- [ ] Run locally: `pnpm build`

### Database Connection Error
- [ ] Verify TURSO_DATABASE_URL
- [ ] Verify TURSO_AUTH_TOKEN
- [ ] Check database exists: `turso db list`
- [ ] Regenerate token: `turso db tokens create ratecoo-prod`

### Auth Not Working
- [ ] Verify AUTH_SECRET is set
- [ ] Verify AUTH_URL is correct
- [ ] Clear browser cookies
- [ ] Check NextAuth logs

### Widget Not Loading
- [ ] Check NEXT_PUBLIC_WIDGET_URL
- [ ] Check CORS headers
- [ ] Verify widget.js exists
- [ ] Check browser console for errors

### API Timeout
- [ ] Check database connection
- [ ] Check Turso status page
- [ ] Verify AUTH_TOKEN validity
- [ ] Check API response times

---

## SUCCESS CRITERIA

When all these are checked, you're live:

- [x] All 4 apps deployed
- [x] All apps accessible
- [x] Database connected
- [x] APIs working
- [x] Auth functional
- [x] Widget embeddable
- [x] No errors in Vercel logs
- [x] No errors in production
- [x] Monitoring setup
- [x] Team access configured

---

## TIME ESTIMATES

- [ ] Vercel project setup: 5 min
- [ ] Environment variables: 5 min
- [ ] Database setup: 5 min
- [ ] Verification: 10 min
- [ ] **Total: ~25 minutes**

---

## SUPPORT

If anything fails:
1. Check `DEPLOYMENT.md` troubleshooting section
2. Check Vercel logs
3. Check application logs
4. Review `SETUP_GUIDE.md` for comparison
5. Check technology documentation links

---

## FINAL CHECKLIST

- [ ] All steps completed
- [ ] All apps deployed
- [ ] All tests passing
- [ ] Ready for users
- [ ] Team notified
- [ ] Backups configured
- [ ] Monitoring active

---

**Status**: Ready to Deploy ✅

**Time Remaining**: ~20 minutes to live

**You've got this!** 🚀

---

*Last Updated: 2025-12-06*
*Deployment Template for RateCoo*
