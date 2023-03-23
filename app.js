import express from 'express';
const app = express();
import bd from "body-parser";
import path from "path";
import { fileURLToPath } from 'url';
import ejs from 'ejs';

const PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bd.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


let numberOfCars;


app.get("/", function (req, res) {
    numberOfCars = 100;
    res.render(path.join(__dirname, "views", "index"), {
        number: numberOfCars,
        numbertwo: true
    });
})

app.get("/your_number_of_cars", function (req, res) {
    res.render(path.join(__dirname, "views", "index"), {
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