const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();
const upload = multer();
var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose.connect(db.url + db.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to the database!");
})
.catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});

// simple route
app.post("/test", upload.single("file"), (req, res) => {
    res.json({ message: "Welcome to TSN Test App application." });
    console.log(req.body);
});

const route = require("./app/routes/product.routes");

app.use('/api/products', route);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});