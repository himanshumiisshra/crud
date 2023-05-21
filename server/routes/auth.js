const router = require("express").Router();
const passport = require("passport");
const express = require('express')
const vendorsController = require(  "../controllers/vendorsController" ) ;

const app =express();

app.get('/', (req, res) => res.send('Hello World!'))

router.get("/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});  

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);

router.get("/vendors", vendorsController.fetchVendors);
router.get("/vendors/:id", vendorsController.fetchVendor);
router.post("/vendors", vendorsController.createVendor);
router.put("/vendors/:id", vendorsController.updateVendor);
router.delete("/vendors/:id", vendorsController.deleteVendor);

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});



module.exports = router;

