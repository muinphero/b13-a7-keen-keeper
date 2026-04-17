# KeenKeeper - Keep Your Friendships Alive

KeenKeeper is a responsive friendship tracker built with Next.js. It helps users stay intentional about relationships by showing who needs attention, logging check-ins, and visualizing interaction history.

## Technologies Used

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- DaisyUI
- React Icons
- React Toastify
- Recharts

## Features

- Responsive home dashboard with banner, summary cards, and friend cards loaded from JSON data.
- Friend details page with profile info, relationship stats, and one-click Call, Text, and Video check-ins.
- Timeline and analytics pages with persistent interaction history, filtering, and a Recharts pie chart.

## Routes

- `/` - Home
- `/friend/[id]` - Friend Details
- `/timeline` - Timeline
- `/stats` - Friendship Analytics

## Project Data

- Friend profiles live in `data/friends.json`
- Seed timeline entries live in `data/timeline-seed.json`
- Browser-saved timeline entries use localStorage key `keenkeeper_timeline_entries`

## Run Locally

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run start
```
