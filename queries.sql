-- create the table with the following SQL:
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    cover_image TEXT,
    rating DECIMAL(2, 1),
    comment TEXT,
    username VARCHAR(100)
);

-- Inserting sample data into the books table
INSERT INTO books (isbn, title, cover_image, rating, comment, username)
VALUES 
    ('9780134685991', 'Effective Java', 'https://covers.openlibrary.org/b/id/8739934-L.jpg', 4.5, 'A great book for Java developers.', 'john_doe'),
    ('9780596009205', 'Head First Java', 'https://covers.openlibrary.org/b/id/8149335-L.jpg', 4.3, 'Great for beginners in Java.', 'jane_smith'),
    ('9780321356680', 'Clean Code', 'https://covers.openlibrary.org/b/id/9357014-L.jpg', 4.7, 'A must-read for any programmer.', 'alice_williams'),
    ('9780132350884', 'The Pragmatic Programmer', 'https://covers.openlibrary.org/b/id/8511267-L.jpg', 4.6, 'Excellent advice for software developers.', 'bob_brown'),
    ('9780201616224', 'Refactoring', 'https://covers.openlibrary.org/b/id/9284434-L.jpg', 4.8, 'Essential for writing clean code.', 'carol_jones');
	
-- you can check if the data is successfully inserted by running
select * from books;
