# 📚 Learn-Lingo

Learn-Lingo is a web application for language learning that allows users to browse language teachers, authenticate, add teachers to favorites, and book trial lessons.

🔗 **Live Demo:** https://learn-lingo-nu-navy.vercel.app/

---

## 🚀 Features

- 🔐 User authentication (sign up / log in / log out)
- 👩‍🏫 Browse a list of language teachers
- 🔍 Filter teachers by:
  - Teaching language
  - Student level
  - Price per hour
- ⭐ Add and remove teachers from favorites
- ❤️ Private Favorites page (available only for authenticated users)
- 📄 Expandable teacher cards (“Read more”)
- 📑 Pagination (Load more — 4 cards per request)
- 📅 Trial lesson booking
- 🧠 Authentication state management with Context API
- 🔥 Firebase integration
- ⚡ Single Page Application (SPA) built with React + TypeScript

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript
- **Routing:** React Router
- **State Management:** Context API
- **Forms & Validation:** react-hook-form, yup
- **Styling:** CSS / CSS Modules
- **Backend / Auth:** Firebase Authentication
- **Database:** Firebase Realtime Database
- **Build Tool:** Vite

---

## 📂 Project Structure
```txt
src/
├── assets/                 # Static assets
├── auth/                   # Authentication logic
│   ├── auth.types.ts
│   ├── AuthContext.tsx
│   └── useAuth.ts
├── components/             # Reusable components
│   ├── AuthForm/
│   ├── LoginForm/
│   ├── BookForm/
│   ├── Modal/
│   ├── Loader/
│   ├── Header/
│   └── Teacher/
├── firebase/               # Firebase configuration
├── layouts/                # Layout components
├── pages/                  # Application pages
│   ├── home/
│   ├── teachers/
│   └── favourites/
├── services/               # API / Firebase services
│   ├── auth.ts
│   ├── teachers.ts
│   └── favoriteTeachers.ts
├── types/                  # Shared TypeScript types
├── App.tsx
├── main.tsx
└── index.css

---

## 🔐 Authentication & Database

- User registration, login, and logout via Firebase Authentication
- Protected (private) routes доступні лише авторизованим користувачам
- Teachers data is stored in Firebase Realtime Database
- User favorites are stored per authenticated user
- Favorites persist after page reload

---

## 🎨 Design

- The user interface is implemented according to the provided Figma design
- Fully matches layout, spacing, and visual requirements

🔗 https://www.figma.com/file/dewf5jVviSTuWMMyU3d8Mc

---

## 📋 Technical Requirements

- The project fully follows the provided technical specification
- All functional and technical requirements are implemented

🔗 https://docs.google.com/document/d/1ZB_MFgnnJj7t7OXtv5hESSwY6xRgVoACZKzgZczWc3Y
