# Discord Clone

A full-stack Discord clone application built with modern web technologies including **Next.js**, **TailwindCSS**, **Prisma**, and **Clerk** for authentication. The project features real-time chat, user authentication, server and channel creation, and a responsive UI similar to Discord.

## 🚀 Features

- **User Authentication** with Clerk (OAuth and Email/Password)
- **Real-time Messaging** using WebSockets
- **Server and Channel Creation** like Discord's UI
- **Responsive Design** using TailwindCSS
- **Dark Mode Support** with Next Themes
- **File Uploads** using Multer
- **Form Validation** with React Hook Form and Zod
- **State Management** with Zustand

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TailwindCSS, Radix UI
- **Backend**: Next.js API Routes, WebSockets
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **Styling**: TailwindCSS, Radix UI components
- **Real-time Communication**: WebSockets
- **File Handling**: Multer

## 📦 Dependencies

Key dependencies from `package.json`:

```json
"dependencies": {
  "@clerk/nextjs": "^5.7.2",
  "@prisma/client": "^5.20.0",
  "next": "14.2.15",
  "react": "18.3.1",
  "react-dom": "18.3.1",
  "tailwindcss": "3.4.13",
  "typescript": "5.6.3",
  "zustand": "^5.0.0",
  "zod": "^3.23.8"
}
```

## ⚙️ Installation
Follow these steps to run the project locally:

### Prerequisites
Ensure you have the following installed:

- Node.js (version 18 or higher)

### Setup
  - Clone the repository:

```bash
git clone https://github.com/EduardoHoths/discord-clone.git
cd discord-clone
```

### Install the dependencies:

```bash
npm install
```

### Configure environment variables:

- Create a .env file in the root directory with the following content:

```env
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_frontend_api
  CLERK_SECRET_KEY=your_clerk_api_key
  NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
  NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```
### Set up the database with Prisma:

```bash
npx prisma migrate dev
```
### Run the development server:

```bash
npm run dev`
```

- The application will be available at http://localhost:3000.

## 📧 Contact
If you have any questions or feedback, please contact:

GitHub: https://github.com/EduardoHoths </br>
Email: eduardo.hoths@gmail.com
Linkedin: https://www.linkedin.com/in/eduardohoths/

