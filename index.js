const express = require('express');
const bodyParser = require('body-parser');
const qr = require('qrcode');

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended : false
}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    const url = req.query.data;

    if(!url) {
        res.status(400);
    }

    qr.toDataURL(url, (err, src) => {
        if(err) {
            res.status(400);
        }

        res.status(200).send(src);
    })
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
