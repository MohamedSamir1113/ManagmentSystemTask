A simple User Management Dashboard built with React.js, featuring user CRUD operations, search, and responsive design.
This project integrates with the DummyJSON API
 for user data.

🚀 Setup Instructions
1. Clone the repo
git clone https://github.com/MohamedSamir1113/ManagmentSystemTask.git

cd ManagmentSystemTask

2. Install dependencies
npm install

3. Start the development server
npm run dev

The app should now be running at http://localhost:5173
 (Vite default).


✨ Features:

User List View

Fetches users from the API

Search functionality (by name, email, phone, birthdate)

Responsive table display

CRUD Operations

➕ Add New User

✏️ Update Existing User

🗑 Delete User

Search & Filtering

Navbar search bar filters users in real time

Responsive Design

Collapsible sidebar for desktop

Clean search bar on mobile

Error Handling & Edge Cases

Loading state with spinner

API error handling with toasts

Empty state messages

🔗 API Endpoints Used (DummyJSON)

Get all users:
GET https://dummyjson.com/users


Get single user (by ID):
GET https://dummyjson.com/users/:id


Add new user:
POST https://dummyjson.com/users/add


Update user:
PUT https://dummyjson.com/users/:id


Delete user:
DELETE https://dummyjson.com/users/:id

🧩 Tech Stack

Frontend: React.js, React Router, Context API, React Responsive, React Toastify
Styling: Bootstrap + CSS Modules
API: DummyJSON

