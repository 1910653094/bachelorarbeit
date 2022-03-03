const express = require('express');
const { body, query, validationResult } = require('express-validator');

const { User } = require('../models');
const { authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/',
    query('email')
        .isEmail()
        .normalizeEmail(),
    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email } = req.query;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(200).json({ dates: user.dates });
        }
        return res.status(404).json({ errors: 'User not found' });
    },
);

/**
 * {
 *  email: '',
 *  token: '',
 *  date: {
 *   date: 2022-01-23,
 *   hours: [{
      from: '12',
      until: '13',
     }]  -> [] optional
    }
 * }
 * */
router.post('/',
    authorize,
    body('email')
        .isEmail()
        .normalizeEmail(),
    body('date')
        .isObject(),
    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let { email, date } = req.body;
        date.date = new Date(date.date);

        const user = await User.findOne({ email });
        if (user) {
            const dates = user.dates.map(d => d.date.toLocaleDateString());
            if (!dates.includes(date.date.toLocaleDateString())) {
                await User.findOneAndUpdate(
                    { email },
                    { $push: { dates: date } }
                );
                return res.status(200).json({ success: 'dates added to successfully' });
            } else {
                const idx = user.dates.findIndex(d => d.date.toLocaleDateString() === date.date.toLocaleDateString());
                await User.findOneAndUpdate(
                    { email },
                    { $push: { [`dates.${idx}.hours`]: date.hours } }
                );
                return res.status(200).json({ success: 'hours added to successfully' });
            }
        }
        return res.status(404).json({ errors: 'User not found' });
    },
);

/**
 * {
 *  email: '',  // person to contact
 *  company: '',
 *  contact_name: '',
 *  contact_email: '',
 *  description: '',
 *  date: {
 *   date: 2022-01-23,
 *   hours: {
      from: '12',
      until: '13',
     }
    }
 * }
* */
router.post('/check',
    body('email')
        .isEmail()
        .normalizeEmail(),
    body('date')
        .isObject(),
    body('company')
        .not().isEmpty(),
    body('contact_name')
        .not().isEmpty(),
    body('contact_email')
        .not().isEmpty(),
    body('description')
        .not().isEmpty(),
    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, date } = req.body;
        date.date = new Date(date.date);

        const user = await User.findOne({ email });
        if (user) {
            const dateIdx = user.dates.findIndex(d => d.date.toLocaleDateString() === date.date.toLocaleDateString());

            const { from, until } = date.hours;
            const hoursIdx = user.dates[dateIdx].hours.findIndex(h => h.from === from && h.until === until);
            if (dateIdx >= 0 && hoursIdx >= 0) {
                await User.findOneAndUpdate(
                    { email },
                    { $set: { [`dates.${dateIdx}.hours.${hoursIdx}.available`]: false } }
                );
                return res.status(200).json({ success: 'This date has now been taken' });
            }
            return res.status(404).json({ errors: 'There is an error with the date Object' });
        }
        return res.status(404).json({ errors: 'User not found' });
    },
);

module.exports = router;
