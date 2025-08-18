# 📚 Library Management System  

A simple **Library Management System** built with **Node.js, Express, TypeScript, and MongoDB**.  
It allows managing books, borrowing books, and tracking availability with validation and error handling.  

---

## 🚀 Features  

### 📖 Book Management  
- Add new books with details (title, author, genre, ISBN, copies, etc.)  
- Retrieve all books with filtering, sorting, and pagination  
- Fetch details of a single book by ID  
- Update book details (title, author, genre, copies, etc.)  
- Delete books from the system  
- Automatic **availability check** based on book copies  

### 📦 Borrow Management  
- Borrow books with quantity and due date  
- Ensures only available copies can be borrowed  
- Automatically updates book availability after borrowing  
- Retrieve **summary of borrowed books** with total quantities  

### ⚙️ System Features  
- Built with **TypeScript** for type safety  
- **MongoDB (Mongoose)** integration  
- Centralized **error handling** middleware  
- Organized project structure with **modular routes, controllers, and models**  
- Environment-based configuration using **dotenv**  

---

## 🛠️ Tech Stack  
- **Backend:** Node.js, Express.js, TypeScript  
- **Database:** MongoDB, Mongoose  
- **Development Tools:** ts-node-dev, dotenv, cors  

---

## 📂 Project Structure  

```yaml
├── src
│   ├── config/        # Environment configuration
│   ├── middleware/    # Error handling middleware
│   ├── modules/
│   │   ├── book/      # Book management (CRUD)
│   │   └── borrow/    # Borrow management
│   ├── routes/        # API routes
│   └── server.ts      # Main server file
├── package.json
└── tsconfig.json
```
##⚡ Getting Started
### 1️⃣ Clone the Repository
git clone https://github.com/your-username/library-management.git
cd library-management

### 2️⃣ Install Dependencies
npm install

### 3️⃣ Setup Environment Variables

Create a .env file in the project root and configure:

NODE_ENV=development
PORT=5000
DATABASE_URL=mongodb://localhost:27017/libraryDB

### 4️⃣ Run the Application
Development Mode
npm run dev

Build Project
npm run build

## 📡 API Endpoints
### 📖 Books

POST /api/books → Add new book

GET /api/books → Get all books (with filter & sort options)

GET /api/books/:bookId → Get book by ID

PATCH /api/books/:bookId → Update book

DELETE /api/books/:bookId → Delete book

### 📦 Borrow

POST /api/borrow → Borrow a book

GET /api/borrow → Get borrowed books summary

## ✅ Example Requests

### Create Book:

POST /api/books
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "genre": "NON_FICTION",
  "isbn": "1234567890",
  "copies": 5
}


### Borrow Book:

POST /api/borrow
{
  "book": "64f7c2d5b1234567890abcd1",
  "quantity": 2,
  "dueDate": "2024-12-31"
}

##🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.
