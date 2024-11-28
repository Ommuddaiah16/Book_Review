import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";

// Initialize express app
const app = express();
const port = 3000;

// Connect to PostgreSQL
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "book_management",
  password: "Omprakash@94", // Replace with your password
  port: 5432,
});
db.connect();

// Setup body parser to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Set up EJS for templating
app.set("view engine", "ejs");

// Set up the public folder for static assets (CSS, images, etc.)
app.use(express.static("public"));

// 1. Route for the homepage (display all books)
app.get("/", async (req, res) => {
  const { sort } = req.query;  // Get sort parameter from query string (e.g., /?sort=rating_desc)

  let query = "SELECT * FROM books";
  if (sort) {
    // Sort based on the rating, either ascending or descending
    if (sort === "rating_asc") {
      query += " ORDER BY rating ASC";
    } else if (sort === "rating_desc") {
      query += " ORDER BY rating DESC";
    }
  }

  try {
    // Fetch all books from the database
    const result = await db.query(query);
    const books = result.rows;

    // Render the homepage with book data and sort option
    res.render("index", { books, sort });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).send("Error fetching books.");
  }
});

// 2. Route for adding a new book (new post form submission)
app.post("/add-book", async (req, res) => {
  const { isbn, rating, comment, username } = req.body;

  try {
    // Fetch book details from Open Library API
    const apiUrl = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;
    const response = await axios.get(apiUrl);

    // Extract book details
    const bookData = response.data[`ISBN:${isbn}`];
    const title = bookData ? bookData.title : "Unknown Title";
    const coverImage = bookData && bookData.cover ? bookData.cover.large : "https://via.placeholder.com/150";

    // Insert new book data into the PostgreSQL database
    const query = `
      INSERT INTO books (isbn, title, cover_image, rating, comment, username)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const values = [isbn, title, coverImage, rating, comment, username];
    await db.query(query, values);

    // Redirect back to the homepage to see the updated list of books
    res.redirect("/");
  } catch (error) {
    console.error("Error adding new book:", error);
    res.status(500).send("Error adding new book.");
  }
});

// 3. Route for deleting a book (by ISBN)
// Route to delete a book
app.post("/delete-book/:id", async (req, res) => {
    if (req.body._method === "DELETE") {
      const { id } = req.params;
  
      try {
        // Delete the book from the database
        const query = "DELETE FROM books WHERE id = $1";
        await db.query(query, [id]);
  
        // Redirect back to the homepage to see the updated list of books
        res.redirect("/");
      } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).send("Error deleting book.");
      }
    }
  });

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
