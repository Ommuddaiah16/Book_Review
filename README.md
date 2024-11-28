Book Review Application
This is a simple Book Review application built using Node.js, Express, and PostgreSQL. Users can view, add, and delete book reviews. The application interacts with a PostgreSQL database to store the details of books, including ISBN, title, cover image, rating, comments, and the reviewer's username.
Features:

View a list of books with their reviews.
Add new books with details.
Delete books from the database.
Uses PostgreSQL as the database.

Getting Started
Follow the steps below to set up and run this project locally.
1. Clone the Repository
To clone the repository, use the following command in your terminal:
bashCopygit clone https://github.com/Ommuddaiah16/Book_Review.git
2. Navigate to Project Directory
Once you've cloned the repository, navigate into the project folder:
bashCopycd Book_Review
3. Initialize npm and Install Dependencies
Run the following commands to initialize the project and install the required dependencies:
bashCopynpm init -y
npm install express pg

express: A fast, unopinionated, minimalist web framework for Node.js
pg: A PostgreSQL client for Node.js

4. Set Up PostgreSQL Database

Open your PostgreSQL client (e.g., pgAdmin or psql)
Create a new database for the project:

sqlCopyCREATE DATABASE book_review;

Create the books table using the following SQL query:

sqlCopyCREATE TABLE books (
    id SERIAL PRIMARY KEY,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    cover_image TEXT,
    rating DECIMAL(2, 1),
    comment TEXT,
    username VARCHAR(100)
);

Insert sample data into the books table:

sqlCopyINSERT INTO books (isbn, title, cover_image, rating, comment, username) VALUES 
('9780134685991', 'Effective Java', 'https://covers.openlibrary.org/b/id/8739934-L.jpg', 4.5, 'A great book for Java developers.', 'john_doe'),
('9780596009205', 'Head First Java', 'https://covers.openlibrary.org/b/id/8149335-L.jpg', 4.3, 'Great for beginners in Java.', 'jane_smith'),
('9780321356680', 'Clean Code', 'https://covers.openlibrary.org/b/id/9357014-L.jpg', 4.7, 'A must-read for any programmer.', 'alice_williams'),
('9780132350884', 'The Pragmatic Programmer', 'https://covers.openlibrary.org/b/id/8511267-L.jpg', 4.6, 'Excellent advice for software developers.', 'bob_brown'),
('9780201616224', 'Refactoring', 'https://covers.openlibrary.org/b/id/9284434-L.jpg', 4.8, 'Essential for writing clean code.', 'carol_jones');

Verify the data has been inserted successfully by running:

sqlCopySELECT * FROM books;
5. Running the Application
To run the application locally:

Open the terminal and make sure you are in the project folder
Start the server by running:

bashCopynode index.js

Open your browser and navigate to http://localhost:3000 to view the application

6. Endpoints

GET /: Displays a list of books with their reviews
POST /add-book: Adds a new book to the database
POST /delete-book/:id: Deletes a book from the database based on the provided book ID

Dependencies

express: Web framework for Node.js
pg: PostgreSQL client for Node.js