# My Website

A polished personal portfolio built with Next.js, Tailwind CSS, and a custom AI assistant. The site showcases projects, supports theme switching, and includes an interactive contact flow backed by server-side email delivery.

## Overview

This repository contains a modern personal portfolio website for a software engineer. It uses the Next.js App Router with reusable UI components, a responsive project showcase, and interactive features like an on-site chat assistant and a contact form.

The site is designed to demonstrate both frontend polish and backend architecture:
- `app/page.tsx` powers the homepage sections and layout
- `components/AIChat.tsx` implements the client-side chat widget
- `app/api/chat/route.ts` proxies chat requests to OpenAI with streaming
- `components/ContactForm.tsx` and `app/actions.ts` handle secure email delivery via Resend
- `lib/projects.ts` stores portfolio project metadata for consistent detail pages

## Features

- Responsive Next.js portfolio layout
- Interactive AI assistant with streamed responses
- Contact form with server-side email delivery
- Dark/light theme toggle using `next-themes`
- Reusable glass-panel UI components and accessible forms
- Static project brief pages generated from structured metadata

## Tech stack

- Next.js 16
- React 19
- Tailwind CSS 4
- TypeScript
- Resend email API
- OpenAI chat integration
- lucide-react icons

## Local development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` in your browser.

If you are not using pnpm, you can use npm:

```bash
npm install
npm run dev
```

## Environment variables

Create a `.env.local` file at the project root with the following values:

```env
OPENAI_API_KEY=your_openai_api_key
RESEND_API_KEY=your_resend_api_key
OPENAI_MODEL=gpt-4o-mini
```

- `OPENAI_API_KEY` is required for the AI assistant.
- `RESEND_API_KEY` is required for the contact form email delivery.
- `OPENAI_MODEL` is optional and can be used to override the default model.

## Build and production

```bash
pnpm build
pnpm start
```

This builds the site and starts it in production mode. Ensure the required environment variables are available before starting.

## Deployment

This site can be deployed on platforms that support Next.js, such as Vercel.

1. Connect the repository.
2. Set the environment variables in the deployment dashboard.
3. Use the default build command:

```bash
pnpm build
```

4. Set the start command if needed:

```bash
pnpm start
```

## Notes

- Keep secret keys out of source control.
- Update `bio.ts` and `lib/projects.ts` to keep the portfolio content current.
- The AI assistant is designed to answer user questions based only on the public bio content.
