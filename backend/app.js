// import the  express module
const express = require("express");
// Import the mysql module 
const mysql = require("mysql2");
// create express app
const app = express();
// Define the connection parameters for the database 
const dbConfig = {
  connectionLimit: 10,
  host: "localhost", 
  user: "demoapp", 
  password: "Mesi@123456", 
  database: "demoapp", 
  
};
// Create the connection to the database 
const connection = mysql.createConnection(dbConfig);
//  Connect to the database 
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
  
});
// use express.json() midleware to parse the request body
app.use(express.json());
// create simple get request handler to send a response back
app.get("/", (req, res) => {
  res.send("Testing!");
});
// Allow CORS to all 
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE" // what matters here is that OPTIONS is present
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.post("/add-Employee", (req, res) => {
  console.log(req.body);

  // write  the sql query to add to database table named employee_test
  const sql = `INSERT INTO \`employee-test\` (first_name, last_name, email, password) VALUES ('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${req.body.password}')`;
  // Execute the query
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  // Send a response back to the client
  const response = {
    status: "success",
    message: "Employee added succesfully",
  };
  res.status(200).json(response);
});
// Post request handler to login an employee which comes to this route /login 
app.post('/login', (req, res) => {
  console.log(req.body);
  // Write the sql query to retrieve the employee with the email and password provided by the user and compare it with the data in the database
  const sql = `SELECT * FROM \`employee-test\`  WHERE email = '${req.body.email}' AND password = '${req.body.password}'`;
  // Execute the query
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    // Check if the result is empty or not
    if (result.length > 0) {
      // Send a response back to the client
      const response = {
        status: "success",
        message: "Login successful",
      };
      res.status(200).json(response);
    } else {
      // Send a response back to the client
      const response = {
        status: "failure",
        message: "Login failed",
      };
      res.status(200).json(response);
    }
  });
})
// setup the port to listen to
const port = 4000
// setup the listener
app.listen(port, () => 
  console.log(`Server is running on port ${port}`));