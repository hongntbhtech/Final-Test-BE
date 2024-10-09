const Routes = require('./routes/routers');
const express = require('express');
const path = require('path');
const cors = require('cors');

const PORT = 4001
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'src/routes')));

new Routes(app);

app.use((req, res) => {
    res.status(404).send({
        status: 404,
        message: 'Error, Page was not found.'
    });
});


app.listen(PORT, () => {
    console.log(`Connecting Server http://localhost:${PORT}`);
});
