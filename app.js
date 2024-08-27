const express = require('express');
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./db/conn");
const Register = require("./models/register");
const { json } = require("express");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partial_path);

app.get("", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/home", (req, res) => {
    res.render("home");
});

app.get("/add-homework", (req, res) => {
    res.render("add-homework");
});

app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if (password === cpassword) {
            const registerUser = new Register({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                phoneno: req.body.phoneno,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword
            });

            const registered = await registerUser.save();
            res.status(201).render("home");
        } else {
            res.send("Passwords are not matching");
        }

    } catch (error) {
        res.status(400).send(error);
    }
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userEmail = await Register.findOne({ email: email });

        if (userEmail) {
            if (userEmail.password === password) {
                res.status(201).render("home");
            } else {
                res.render("login", { error: "Invalid password" });
            }
        } else {
            res.render("login", { error: "Invalid email" });
        }
    } catch (error) {
        res.status(400).send("Invalid email");
    }
});

app.listen(port, () => {
    console.log(`Server is running at port no ${port}`);
});