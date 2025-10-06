<p align="center">
  <img src="./assets/amaru-logo.png" alt="Amaru Logo" width="200"/>
</p>

<h1 align="center">Amaru</h1>

<p align="center">
  <a href="README.md">🇬🇧 English</a> | 
  <a href="./docs/es/README.es.md">🇪🇸 Español</a>
</p>

**Amaru** is a smart email assistant that helps you stay on top of your Gmail inbox. Named after the Andean serpent deity, it reads your emails, summarizes what matters, and suggests actions you can review before they happen.

---

## What it does

Amaru connects to your Gmail account and analyzes your unread messages. It gives you:

- **Quick summaries** of each email with automatic categorization
- **Smart suggestions** like creating calendar events when it detects meeting info
- **A simple dashboard** where you can review everything before taking action

<p align="center">
  <img src="./assets/dashboard.png" alt="Dashboard" width="600"/>
</p>

## Features

- **Gmail OAuth 2.0** – Secure authentication with Google
- **Email analysis** – AI-powered summaries and categorization (Work, Personal, Events, Finance, etc.)
- **Calendar integration** – Automatically detect events and offer to add them to Google Calendar
- **Action logs** – Track what Amaru suggests and what you approve
- **Custom prompts** – Add your own instructions to influence how emails are analyzed
- **Collections & whitelists** – Organize emails and manage trusted senders

## Tech Stack

| Component       | Technology                     |
| --------------- | ------------------------------ |
| Framework       | Next.js 15 + TypeScript        |
| UI              | Tailwind CSS + Motion          |
| Database        | PostgreSQL + Prisma ORM        |
| Authentication  | Better Auth (OAuth 2.0)        |
| AI              | OpenRouter + AI SDK            |
| Email Parsing   | googleapis + mailparser        |
| Tables          | @tanstack/react-table          |
