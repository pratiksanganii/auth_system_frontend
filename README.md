# Auth System – Full Stack Project

A robust authentication system featuring a modern frontend and secure backend, designed for user registration, login, and session management with JWT tokens.

---

## Live Demo

- **Frontend:** [https://authsystem.pratiksangani.com/](https://authsystem.pratiksangani.com/)
- **Backend API:** [https://apiauthsystem.pratiksangani.com/](https://apiauthsystem.pratiksangani.com/)

---

## Features

- **User Registration** with email and password
- **User Login** with email and password
- **Session Management** using access and refresh tokens
- **Protected Route:** `/user/me` (accessible only with valid authentication)
- **Token Expiry:**
  - Access Token: 8 hours
  - Refresh Token: 48 hours

---

## Tech Stack

- **Frontend:** Next.js, React, TypeScript
- **Backend:** (Hosted separately, see API URL)
- **Authentication:** JWT (JSON Web Tokens)

---

## Project Structure

```
src/
  api/           # API utilities
  app/           # Next.js app directory (pages, layouts)
  components/    # Reusable React components
  context/       # React Context for authentication
  globals.ts     # Global types or constants
public/          # Static assets
```

---

## Getting Started (Frontend)

### 1. Clone the Repository

```bash
git clone https://github.com/pratiksanganii/auth_system_frontend.git
cd auth_system_frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file
NEXT_PUBLIC_API_URL=https://apiauthsystem.pratiksangani.com

### 4. Run Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Docker Deployment

### Build and Run with Docker

```bash
docker build -t auth-frontend .
docker run -d --build-arg NEXT_PUBLIC_API_URL=https://apiauthsystem.pratiksangani.com -p 3000:3000 --name auth-frontend auth-frontend
```

---

## Authentication & Session Management

- On login/register, the backend issues an **access token** (expires in 8h) and a **refresh token** (expires in 48h).
- Tokens are securely stored and used for authenticating API requests.
- The `/user/me` endpoint is protected and requires a valid access token.
- When the access token expires, the refresh token is used to obtain a new access token (session remains active until refresh token expires).

---

## Contact

For any questions, please contact:
Pratik Sangani
pratikpsangani2003@gmail.com

---
