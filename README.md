# Atom Tasks App 🚀

Welcome to AtomTasks! This is a task management application built with **Angular 17** (Standalone Components). It allows users to register, log in, create, view, update, and delete their personal tasks.

---

## 🌟 Features

* **User Authentication**: Easy registration and login using email.
* **JWT Token Handling**: Manages session tokens to keep the user authenticated.
* **Route Protection (Guards)**:
    * `AuthGuard`: Protects routes that require authentication (e.g., the task list).
    * `NoAuthGuard`: Prevents already authenticated users from accessing login page.
* **Task Listing**: View your tasks with filtering options (all, completed, active).
* **Task Creation/Editing**: Dedicated forms to add new tasks or modify existing ones.
* **Task Deletion**: Delete tasks individually.
* **Task Status**: Mark tasks as completed or active.
* **Error Handling**: Provides visual feedback for API errors and form validation.
* **Modern Styling**: Integration with **Bootstrap 5** for a responsive and appealing design.

---

## 🛠️ Technologies Used

* **Frontend**:
    * **Angular 17**: Main framework (with Standalone Components).
    * **TypeScript**: Programming language.
    * **RxJS**: For handling asynchronous operations and reactivity.
    * **Bootstrap 5**: CSS framework for UI styles and components.
* **Backend / Database**:
    * Github Repository: https://github.com/luedlo/atom-tasks-api
    * **Firebase Firestore**: Cloud NoSQL database for storing tasks and users.

---

## 🚀 Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

* **Node.js**: Version 18.x or higher.
* **npm**: Comes with Node.js.
* **Angular CLI**: Install it globally if you don't have it:
    ```bash
    npm install -g @angular/cli
    ```
* **Firebase Project**: You'll need a Firebase project with Firestore and Authentication configured.

### 1. Clone the Repository

```bash
git clone https://github.com/luedlo/atom-tasks-app
cd atom-tasks-app
````

### 2\. Install Dependencies

```bash
npm install
```

### 3\. Start the Application

```bash
ng serve
```

The application will be available at `http://localhost:4200/`.

-----

## 📂 Project Structure

```
src/
├── app/
│   ├── app.config.ts           # Main application configuration (Standalone)
│   ├── app.component.ts        # Root component
│   ├── app.routes.ts           # Main application routes
│   ├── core/
│   │   ├── api.service.ts      # Generic service for API calls
│   │   ├── auth.service.ts     # Handles authentication (login, logout, token)
│   │   └── guards/             # Route guards
│   │       ├── auth.guard.ts   # Protects routes requiring authentication
│   │       └── no-auth.guard.ts# Prevents access to login/register if already logged in
│   ├── environments/           # Environment configurations (Firebase keys)
│   └── features/               # Application features/modules
│       ├── auth/
│       │   ├── auth.module.ts  # Feature module for authentication
│       │   ├── auth-routing.module.ts # Authentication routes
│       │   └── pages/
│       │       └── login/      # Login page component
│       └── tasks/
│           ├── task.service.ts # Service for task CRUD operations
│           ├── tasks.module.ts # Feature module for tasks
│           ├── tasks-routing.module.ts # Task routes
│           └── pages/
│               ├── task-form/  # Component for creating/editing tasks
│               └── task-list/  # Component for listing tasks
├── assets/                     # Static assets
└── styles.scss                 # Global application styles
```

-----

## 📝 Usage

1.  **Register**: Navigate to `/auth/login` and try to login with your email then the system question you for create a new account.
2.  **Login**: After registration (or if you already have an account), navigate to `/auth/login` and enter your credentials.
3.  **Tasks**: Once logged in, you'll be redirected to the `/tasks` page, where you can view, add, edit, and delete your tasks.
4.  **Logout**: Click the "Logout" button to end your session.

-----

## 🤝 Contributions

Contributions are welcome. If you find a bug or have a suggestion for improvement, please open an *issue* or submit a *pull request*.

-----

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

-----

```
```