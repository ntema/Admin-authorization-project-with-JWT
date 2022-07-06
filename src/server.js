const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.urlencoded({ limit: "1000000mb", extended: true }));
app.use(express.json({ limit: "1000000mb", extended: true }));

const db = require("./configs/constants").mongoDB_URI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//routes
// app.use("/users", require("./routes/api/users.js"));
// app.use("/auth", require("./routes/api/auth"));
// app.use("/products", require("./routes/api/products"));
// app.use("/vendors", require("./routes/api/vendors"));
// app.use("/saved-items", require("./routes/api/saved-items"));
// app.use("/babies", require("./routes/api/babies"));

//for testing of file uploads in base64
// app.use((req, res, next) => {
//   const error = new Error("Not Found");
//   error.status = 404;
//   next(error);
// });

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       status: error.status || 500,
//       message: error.message,
//     },
//   });
// });

//routes
app.use('/api/auth', require('./controllers/admin/adminAuth'))
app.use('/api/admin', require('./Routes/admin'))

const PORT = process.env.PORT || 5005;
app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("Server Running on port " + PORT);
});
