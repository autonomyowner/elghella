# Elghella - Vercel Deployment Guide

This guide will help you deploy the Elghella AgriTech marketplace to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. A [Supabase account](https://supabase.com) with a project set up
3. Git repository access (already configured)

## Quick Deploy

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Click "Add New Project"

2. **Import Git Repository**
   - Select "Import Git Repository"
   - Choose: `https://github.com/autonomyowner/elghella.git`
   - Click "Import"

3. **Configure Project**
   - Framework Preset: **Next.js**
   - Root Directory: `./` (leave as default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

4. **Add Environment Variables**
   
   Click "Environment Variables" and add the following:

   **Required:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

   **Optional but Recommended:**
   ```
   OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
   SENTINEL_HUB_API_KEY=your_sentinel_hub_api_key
   USGS_EROS_TOKEN=your_usgs_eros_token
   NASA_API_KEY=your_nasa_api_key
   RESEND_API_KEY=your_resend_api_key
   FROM_EMAIL=your_sender_email@domain.com
   NODE_ENV=production
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for the build to complete
   - Your site will be live at: `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name? elghella
# - Directory? ./
# - Override settings? N

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY

# Deploy to production
vercel --prod
```

## Get Your Supabase Credentials

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

## Post-Deployment Configuration

### 1. Update Supabase Redirect URLs

In your Supabase Dashboard:
- Go to **Authentication** → **URL Configuration**
- Add your Vercel domain to **Site URL**:
  ```
  https://your-project.vercel.app
  ```
- Add to **Redirect URLs**:
  ```
  https://your-project.vercel.app/auth/callback
  https://your-project.vercel.app/auth/login
  ```

### 2. Configure Custom Domain (Optional)

In Vercel Dashboard:
1. Go to **Project Settings** → **Domains**
2. Add your custom domain
3. Update DNS records as instructed
4. Update Supabase redirect URLs with your custom domain

### 3. Enable Vercel Analytics (Optional)

1. Go to **Analytics** tab in Vercel Dashboard
2. Click "Enable Analytics"
3. Monitor your site performance

## Troubleshooting

### Build Fails

**Issue:** Build fails with module errors
**Solution:** 
```bash
# Clear npm cache locally
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Try building locally first
npm run build
```

### Environment Variables Not Working

**Issue:** Site loads but features don't work
**Solution:**
1. Verify all environment variables are set in Vercel Dashboard
2. Redeploy the project after adding variables
3. Check browser console for specific errors

### Authentication Issues

**Issue:** Login/signup doesn't work
**Solution:**
1. Verify Supabase redirect URLs include your Vercel domain
2. Check that `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
3. Ensure email templates are configured in Supabase

### Database Connection Issues

**Issue:** Can't fetch data from Supabase
**Solution:**
1. Check Row Level Security (RLS) policies in Supabase
2. Verify service role key is correct
3. Check Supabase logs in Dashboard → **Database** → **Logs**

## Performance Optimization

The site is already optimized with:
- ✅ Image optimization
- ✅ Code splitting
- ✅ PWA capabilities
- ✅ Service worker caching
- ✅ Lazy loading components

## Monitoring

### Check Deployment Status
```bash
vercel ls
```

### View Logs
```bash
vercel logs your-deployment-url
```

### Check Build Logs
Visit: Vercel Dashboard → Your Project → Deployments → Click on deployment → View logs

## Support

For issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Check [Next.js Documentation](https://nextjs.org/docs)
- Check [Supabase Documentation](https://supabase.com/docs)

## Production Checklist

Before going live, ensure:
- [ ] All environment variables are set
- [ ] Supabase redirect URLs configured
- [ ] Test authentication flow
- [ ] Test marketplace features (add/view listings)
- [ ] Test on mobile devices
- [ ] Check page load speed
- [ ] Verify images load correctly
- [ ] Test offline functionality (PWA)

---

**Your site is now ready for production! 🚀**

Access your deployment at: `https://your-project.vercel.app`
