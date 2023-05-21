if (process.env.NODE_ENV != "production") {
	require("dotenv").config();
  }
  
  // Import dependencies
  const express = require("express");
  const cors = require("cors");
  const cookieParser = require("cookie-parser");
  const connectToDb = require("./config/connectToDb");
  const vendorsController = require("./controllers/vendorsController");
  const usersController = require("./controllers/usersController");
  const requireAuth = require("./middleware/requireAuth");
const passport = require("passport");
const authRoute = require("./routes/auth");
const cookieSession = require("cookie-session");
 const passportStrategy = require("./passport");

  
  // Create an express app
  const app = express();
  
  // Configure express app
  app.use(express.json());
  app.use(cookieParser());
  app.use(
	cors({
	  origin: true,
	  credentials: true,
	})
  );
  
  // Connect to database
  connectToDb();
  
  // Routing
  app.post("/signup", usersController.signup);
  app.post("/login", usersController.login);
  app.get("/logout", usersController.logout);
  app.get("/check-auth", requireAuth, usersController.checkAuth);
  app.get("/vendors", vendorsController.fetchVendors);
  app.get("/vendors/:id", vendorsController.fetchVendor);
  app.post("/vendors", vendorsController.createVendor);
  app.put("/vendors/:id", vendorsController.updateVendor);
  app.delete("/vendors/:id", vendorsController.deleteVendor);
  

app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);
app.use(passport.initialize());
app.use(passport.session());


app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

app.use("/auth", authRoute);
app.get("/", (req,res)=>{
  res.send({message:'yup'})
});





const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));