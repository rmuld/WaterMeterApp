// import express from 'express';
// import cors from 'cors';
// import querySql from './src/database';


// const app = express();
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }));

// //Enable CORS security headers
// app.use(cors())

// //Add a home page route
// app.get('/', (req, res) => {
//     res.send('Hi There')
// });
  
// //add a route that will process a Select MySQL query to retrieve all the books from the database
// app.get('/get', (req, res) => {
//     const SelectQuery = " SELECT * FROM User";
//     querySql.query(SelectQuery, (err, result) => {
//       res.send(result)
//     })
// })
  
// //And an endpoint to process and INSERT SQL command
// app.post("/users", (req, res) => {
//     const firstName = req.body.firstName;
//     const lasteName = req.body.lasteName;
//     const personalNumber = req.body.personalNumber;
//     const email = req.body.email;
//     const password = req.body.password;
//     const insertQuery = "INSERT INTO User (firstName, lasteName, personalNumber, email, password) VALUES (?, ?, ?, ?, ?)";
//     querySql.query(insertQuery, [firstName, lasteName, personalNumber, email, password], (err, result) => {
//       console.log('insert new User', result)
//     })
// })
  
// //Add a route that will allow us to delete a book record. This includes a bookId (unique ID for a book) to be deleted.
// // delete a book from the database
// app.delete("/delete/:bookId", (req, res) => {
//     const bookId = req.params.bookId;
//     const DeleteQuery = "DELETE FROM books_reviews WHERE id = ?";
//     querySql.query(DeleteQuery, bookId, (err, result) => {
//       if (err) console.log(err);
//     })
// })
  
// // update a book review
// app.put("/update/:bookId", (req, res) => {
//     const bookReview = req.body.reviewUpdate;
//     const bookId = req.params.bookId;
//     const UpdateQuery = "UPDATE books_reviews SET book_review = ? WHERE id = ?";
//     pool.query(UpdateQuery, [bookReview, bookId], (err, result) => {
//       if (err) console.log(err)
//     })
// })
  
// //And add a port the will expose the API when the server is running. Here, we expose it to port 3001.
// app.listen('3001', () => { })