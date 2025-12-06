# RateCoo Deployment Guide - Vercel Ready

This guide will help you deploy RateCoo to Vercel. The entire project is configured and ready to go!

## Prerequisites

- GitHub account with repository
- Vercel account (free tier works)
- Turso account for database
- Domain (optional)

## Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: RateCoo monorepo"
git branch -M main
git remote add origin https://github.com/yourusername/ratecoo.git
git push -u origin main
```

## Step 2: Create Turso Database

```bash
# Login to Turso
turso auth login

# Create production database
turso db create ratecoo-prod

# Create token
turso db tokens create ratecoo-prod

# Save the credentials:
# TURSO_DATABASE_URL: libsql://...turso.io
# TURSO_AUTH_TOKEN: eyJr...
```

## Step 3: Deploy to Vercel

### Option A: Use Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy each app
cd apps/landing
vercel --prod

cd ../member
vercel --prod

cd ../admin
vercel --prod

cd ../widget
vercel --prod
```

### Option B: GitHub Integration (Best Practice)

1. Go to https://vercel.com/new
2. Import GitHub repository
3. For each app folder, create a project:
   - **Landing**: `apps/landing`
   - **Member**: `apps/member`
   - **Admin**: `apps/admin`
   - **Widget**: `apps/widget`

## Step 4: Configure Environment Variables

For **each** Vercel project, add these environment variables:

```
TURSO_DATABASE_URL=libsql://ratecoo-prod-xxx.turso.io
TURSO_AUTH_TOKEN=eyJr...your-token...
AUTH_SECRET=generate-with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
PAYLOAD_SECRET=generate-another-random-secret
NEXT_PUBLIC_PAYLOAD_API_URL=https://your-admin-domain.vercel.app
NEXT_PUBLIC_API_URL=https://your-member-domain.vercel.app
NEXT_PUBLIC_WIDGET_URL=https://your-widget-domain.vercel.app
```

### Generate Secrets:

```bash
# Generate AUTH_SECRET
node -e "console.log('AUTH_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"

# Generate PAYLOAD_SECRET
node -e "console.log('PAYLOAD_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"
```

## Step 5: Push Database Schema

Once your Turso credentials are set, push the schema:

```bash
# Update .env.local with production Turso credentials
pnpm db:push
```

## Step 6: Domain Setup (Optional)

In Vercel project settings:
1. Go to Settings → Domains
2. Add your custom domain
3. Update DNS records as directed

Suggested structure:
- Landing: `ratecoo.com`
- Member: `app.ratecoo.com`
- Admin: `admin.ratecoo.com`
- Widget: `widget.ratecoo.com`

## Step 7: Test Deployment

1. **Landing**: Visit your landing domain
   - Should show homepage
   - Links should work to sign in/register

2. **Member**: Visit `app.your-domain.com`
   - Should redirect to sign in
   - Use demo creds: demo@example.com / password

3. **Admin**: Visit `admin.your-domain.com`
   - Payload CMS dashboard
   - Create users and manage data

4. **Widget**: Embed code test
   - ```html
     <div id="ratecoo-widget"></div>
     <script src="https://widget.your-domain.com/widget.js?project=demo"></script>
     ```

## Deployment Checklist

- [ ] GitHub repository created
- [ ] Turso database created
- [ ] Vercel projects created (4 apps)
- [ ] Environment variables added to all 4 projects
- [ ] Database schema pushed (`pnpm db:push`)
- [ ] All apps deployed successfully
- [ ] Landing page accessible
- [ ] Member area authenticates
- [ ] Admin panel loads
- [ ] Widget embeds correctly

## Monitoring & Logs

### View Deployment Logs

```bash
# Using Vercel CLI
vercel logs [project-name]

# Or check via Vercel dashboard
# https://vercel.com/dashboard
```

### Check Database

```bash
# Open Drizzle Studio
pnpm db:studio
```

## Troubleshooting

### Build Fails with "Cannot find module"
- Check environment variables are set
- Verify `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`
- Clear Vercel cache: Settings → Environment → Clear Cache

### Auth not working
- Verify `AUTH_SECRET` is set in member app
- Check `AUTH_URL` matches your domain
- Clear browser cookies

### Widget doesn't load
- Check CORS headers in admin API
- Verify `NEXT_PUBLIC_WIDGET_URL` is correct
- Check browser console for errors

### Database connection timeout
- Verify Turso token is valid
- Check database exists: `turso db list`
- Regenerate token: `turso db tokens create ratecoo-prod`

## Post-Deployment

1. **Create first admin user**
   ```bash
   # Go to admin dashboard
   # Sign up or create via Payload UI
   ```

2. **Update NEXT_PUBLIC URLs**
   - Once you have live URLs, update in Vercel environment variables
   - Redeploy all projects

3. **Set up custom domain**
   - Update Vercel domains
   - Configure DNS

4. **Monitor uptime**
   - Use uptimerobot.com for free monitoring
   - Set up alerts

## Production Security

- [ ] Change default auth secrets
- [ ] Enable Vercel protection (if available on your plan)
- [ ] Regular database backups via Turso
- [ ] Monitor API usage
- [ ] Set CORS properly
- [ ] Use custom domains (not *.vercel.app in production)

## Support

- Vercel Issues: https://vercel.com/support
- Turso Issues: https://discord.gg/turso
- Next.js: https://github.com/vercel/next.js/discussions
- Payload CMS: https://github.com/payloadcms/payload/discussions

## Next Steps

After deployment, you can:
1. Add more users via admin panel
2. Create projects in member dashboard
3. Customize widget styling
4. Set up email notifications
5. Add custom domain
6. Enable white-labeling for Pro tier
