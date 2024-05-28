const express = require('express');
const bodyParser = require('body-parser');
const fluentd = require('fluent-logger');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

fluentd.configure('app', {
    host: 'fluentd',
    port: 24224,
    timeout: 3.0,
    reconnectInterval: 60000
});


app.post('/signup', async (req, res) => {
    const {username, email, password, confirmPassword} = req.body;

    if (!username || !email || !password || password !== confirmPassword) {
        fluentd.emit('access', {
            message: 'Invalid input',
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        });
        return res.status(400).send('Invalid input');
    } else {
        fluentd.emit('access', {
            message: 'Successful sign up',
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        });
        res.send('Sign up successful');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
