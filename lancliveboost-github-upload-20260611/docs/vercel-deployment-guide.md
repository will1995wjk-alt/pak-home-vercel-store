# Vercel Deployment Guide

## Upload to GitHub

1. Create a GitHub repository.
2. Commit the `pak-home-vercel-store` project.
3. Push to GitHub.

## Connect Vercel

1. Log in to Vercel.
2. Click Add New Project.
3. Import the GitHub repository.
4. Choose Next.js as the framework.
5. Set the root directory to `pak-home-vercel-store` if the repo contains multiple folders.

## Set environment variables

In Vercel Project Settings > Environment Variables, add all values from `.env.example`.

Important values:

1. `SHOPIFY_STORE_DOMAIN`
2. `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
3. `NEXT_PUBLIC_SITE_URL`
4. `NEXT_PUBLIC_WHATSAPP_NUMBER`

Use the Vercel generated URL for `NEXT_PUBLIC_SITE_URL` at first. After binding a custom domain, update this value.

## Deploy

1. Click Deploy.
2. Wait for the build to finish.
3. Open the generated `vercel.app` preview domain.
4. Test homepage, product page, cart, checkout, search, and WhatsApp.

## Bind custom domain later

1. Open Vercel Project > Settings > Domains.
2. Add your purchased domain.
3. Follow DNS instructions.
4. Update `NEXT_PUBLIC_SITE_URL`.
5. Redeploy.
