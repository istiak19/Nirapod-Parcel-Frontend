# 📦 Nirapod Parcel

Nirapod Parcel is a robust, role-based React application built with TypeScript, Redux Toolkit, and RTK Query, designed to provide a seamless and secure parcel management experience. It features dynamic dashboards, visual analytics, and responsive UI tailored for **Senders, Receivers, and Admins**. Users can track parcels, manage deliveries, update statuses, and view detailed logs in real time. With role-specific navigation, API integration, and accessibility-focused design, Nirapod delivers a professional, user-friendly, and performant solution for modern parcel delivery operations.

🔗 **Live Demo**: [nirapod-parcel.netlify.app](https://nirapod-parcel.netlify.app/)
🔗 **Backend API**: [nirapod-parcel-backend.vercel.app](https://nirapod-parcel-backend.vercel.app/)
🔗 **Frontend Repo**: [Nirapod-Parcel-Frontend](https://github.com/istiak19/Nirapod-Parcel-Frontend)
🔗 **Backend Repo**: [Nirapod-Parcel-Backend](https://github.com/istiak19/Nirapod-Parcel-Backend)

---

## 📑 Table of Contents

* [Introduction](#-introduction)
* [Features](#-features)
* [Project Structure](#-project-structure)
* [Tech Stack](#-tech-stack)
* [Installation](#-installation)
* [Usage](#-usage)
* [Configuration](#-configuration)
* [Examples](#-examples)
* [Troubleshooting](#-troubleshooting)
* [Contributors](#-contributors)
* [License](#-license)

---

## 🚀 Introduction

**Nirapod Parcel** is a modern parcel delivery management system with:

* Role-based dashboards (Sender, Receiver, Admin)
* Real-time parcel tracking
* Status updates & delivery logs
* Secure authentication & team switching
* Analytics & reporting with visual charts
* Accessibility-focused, mobile-friendly UI

---

## ✨ Features

* 🔐 **Role-based access**: Separate features for users and admins
* 📊 **Dynamic dashboards**: Analytics and parcel history visualization with **Recharts**
* 🌓 **Dark/Light mode toggle** for accessibility
* 🔄 **Real-time updates** using RTK Query
* 📂 **File & image upload support**
* 🧩 **Reusable UI components** powered by Radix UI + TailwindCSS
* ⚡ **Optimized performance** with React 19 and Vite

---

## 📂 Project Structure

```bash
src/
├── assets/         # Static files (images, icons, fonts)
├── components/     # Reusable UI components
│   ├── common/     # Shared components
│   ├── layout/     # Layout (header, footer, sidebar)
│   ├── modules/    # Feature-specific components
│   ├── ui/         # Styled UI components
│   ├── app-sidebar.tsx
│   ├── Loading.tsx
│   ├── Mode-toggle.tsx
│   ├── nav-main.tsx
│   ├── nav-projects.tsx
│   ├── nav-user.tsx
│   ├── SectionHeading.tsx
│   ├── singleImageUpload.tsx
│   └── team-switcher.tsx
├── config/         # Environment & API configs
├── constants/      # App-wide constants
├── context/        # React context providers
├── hooks/          # Custom hooks
├── lib/            # Utilities & helper functions
├── pages/          # Pages / routes
├── redux/          # Redux store, slices, reducers
├── routes/         # Centralized routes
├── types/          # TypeScript types/interfaces
├── utils/          # Helper functions
├── App.tsx         # Root component
├── main.tsx        # App entry (Vite)
└── index.css       # Global styles
```

---

## 🛠️ Tech Stack

* **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) + [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
* **UI & Styling:** [TailwindCSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Framer Motion](https://www.framer.com/motion/)
* **Forms & Validation:** [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/), [@hookform/resolvers](https://github.com/react-hook-form/resolvers)
* **Charts & Analytics:** [Recharts](https://recharts.org/)
* **API Requests:** [Axios](https://axios-http.com/)
* **Notifications & Alerts:** [React Toastify](https://fkhadra.github.io/react-toastify/), [SweetAlert2](https://sweetalert2.github.io/)

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/istiak19/Nirapod-Parcel-Frontend.git

# Navigate to the project
cd Nirapod-Parcel-Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## ▶️ Usage

* Visit `http://localhost:5173` after running `npm run dev`.
* Login as a **Sender, Receiver, or Admin** (credentials configured in backend).
* Access role-based features like:

  * Parcel creation & tracking
  * Delivery management & updates
  * Analytics dashboard

---

## 🔧 Configuration

Create a `.env` file at the project root with:

```env
VITE_API_BASE_URL=https://nirapod-parcel-backend.vercel.app/api
```

Adjust the URL based on your backend environment (local / staging / production).

---

## 💡 Examples

* **Sender**: Create and track parcels in real-time.
* **Receiver**: Get notified when parcels are in transit or delivered.
* **Admin**: Manage all parcels, update statuses, and view analytics.

---

## 🛠 Troubleshooting

* If Tailwind styles don’t apply, ensure `tailwind.config.js` is properly set up.
* Check API connectivity by verifying the `VITE_API_BASE_URL`.
* For type issues, run:

  ```bash
  npm run lint
  npm run build
  ```

---

## 👨‍💻 Contributors

* [**Istiak Ahmed**](https://github.com/istiak19) – Developer & Maintainer