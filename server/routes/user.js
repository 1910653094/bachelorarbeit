const express = require('express');
const bcrypt = require('bcrypt');
const { body, query, validationResult } = require('express-validator');

const { createToken, authorize } = require('../middleware/auth');
const { cleanUser } = require('../utils/cleanUser');
const { User } = require('../models');

const router = express.Router();

router.get('/',
    authorize,
    query('email')
        .isEmail()
        .normalizeEmail(),
    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email } = req.query;

        let user = await User.findOne({ email });
        if (user) {
            user = cleanUser(user);
            return res.status(200).json(user);
        }
        return res.status(404).json({ errors: 'User not found' });
    },
);

router.post('/',
    body('email')
        .isEmail()
        .normalizeEmail(),
    body('password')
        .not().isEmpty(),
    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const oldUser = await User.findOne({ email: email });

        if (oldUser) {
            return res.status(409).json({ error: 'User Already Exist. Please Login' });
        }

        // Encrypt user password
        const encryptedPassword = bcrypt.hashSync(password, 10);

        let user = await User.create({
            email: email,
            password: encryptedPassword,
            dates: [],
        });
        console.log(user);

        user.token = createToken(user._id, email);
        user = cleanUser(user);

        return res.status(201).json(user);
    },
);

router.post('/login',
    body('email')
        .isEmail()
        .normalizeEmail(),
    body('password')
        .not().isEmpty(),
    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            user.token = createToken(user._id, email);
            user = cleanUser(user);
            return res.status(200).json(user);
        }
        return res.status(400).json({ error: 'Invalid Credentials: email or password incorrect.' });
    },
);

module.exports = router;
