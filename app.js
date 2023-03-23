import express from 'express';
const app = express();
import bd from "body-parser";
import ejs from 'ejs';

const PORT = process.env.PORT || 8080;

let numberOfCars;

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(bd.urlencoded({ extended: true }));
app.use(express.static("public", "views"));


app.get("/", function (req, res) {
    numberOfCars = 100;
    res.render("index", {
        number: numberOfCars,
        numbertwo: true
    });
})

app.get("/your_number_of_cars", function (req, res) {
    res.render("index", {
        number: numberOfCars,
        numbertwo: false
    });
})

app.post("/", function (req, res) {
    numberOfCars = Number(req.body.number);
    let check = req.body.check;
    if (numberOfCars === 100 || isNaN(numberOfCars) === true || check === 'false') {
        res.redirect("/");
    } else {
        res.redirect("/your_number_of_cars");
    }
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`)
  });