🚀 NITROGEN – Project Management System

Nitrogen is a cloud-native full-stack Project & Task Management System built using Next.js, AWS, Prisma, and PostgreSQL, designed to simulate real-world enterprise workflows.

📘 Frontend – README

client/README.md

🧠 Overview

The Nitrogen Frontend is a modern, responsive web application that allows users to:

Authenticate securely using AWS Cognito

Create and manage Projects

Create, assign, and track Tasks

View tasks by priority, status, and ownership

Interact with a secure, scalable backend API

🛠 Tech Stack
Core

Next.js (App Router)

React

TypeScript

Tailwind CSS

State & API

Redux Toolkit

RTK Query

Authentication

AWS Amplify

AWS Cognito User Pools

UI

MUI DataGrid

Custom Modal Components

Lucide Icons

🔐 Authentication Flow
User Login
 ↓
AWS Cognito
 ↓
JWT Access Token
 ↓
Token attached to API requests
 ↓
Backend validates token

🔁 Frontend Data Flow
UI Event
 ↓
RTK Query (Mutation / Query)
 ↓
API Gateway (HTTPS)
 ↓
Backend Lambda
 ↓
Database
 ↓
Response → UI Update

🌐 Environment Variables
NEXT_PUBLIC_API_URL=https://<api-id>.execute-api.ap-south-1.amazonaws.com/prod
NEXT_PUBLIC_COGNITO_USER_POOL_ID=ap-south-1_xxxxx
NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID=xxxxxxxx


Configured in:

.env.local

AWS Amplify Console

📂 Folder Structure
client/
├── app/
│   ├── redux/
│   ├── auth/
│   └── pages/
├── components/
│   ├── Modal.tsx
│   ├── TaskCard.tsx
│   └── Header.tsx
├── state/
│   └── api.ts
├── public/
└── styles/

✨ Features

✅ Secure authentication

✅ Project CRUD

✅ Task CRUD

✅ Priority & Status filtering

✅ Modal-based UI

✅ Optimized API caching

✅ Fully typed API integration

🚀 Running Locally
npm install
npm run dev

☁️ Deployment

Hosted on AWS Amplify

CI/CD via GitHub

Environment variables managed via Amplify Console

👨‍💻 Author

Harsh Jajaniya
Frontend • UI/UX • Cloud Engineering
