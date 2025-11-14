-- Create blogs table
CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INT DEFAULT 0,
);

-- Add two blogs to table
INSERT INTO blogs (author, url, title, likes) VALUES
('John Doe', 'http://example.com/blog1', 'First Blog Post', 10),
('Jane Smith', 'http://example.com/blog2', 'Second Blog Post', 20),

-- Add a third blog without specifying likes (should default to 0)
INSERT INTO blogs (author, url, title) VALUES
('Alice Johnson', 'http://example.com/blog3', 'Third Blog Post');