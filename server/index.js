require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const questionRoutes = require("./routes/questions");
const question2Routes = require("./routes/questions2");
const question3Routes = require("./routes/questions3");
const testRoutes = require("./routes/test");
// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/questions2", question2Routes);
app.use("/api/questions3", question3Routes);
app.use("/api/test", testRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
