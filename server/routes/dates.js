const express = require('express');
const { body, query, validationResult } = require('express-validator');

const { User } = require('../models');
const { authorize } = require('../middleware/auth');
const EmailSender = require('../utils/EmailSender');

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
                /*const idx = user.dates.findIndex(d => d.date.toLocaleDateString() === date.date.toLocaleDateString());*/
                const idx = getDateIdx(user.dates, date.date.toLocaleDateString());
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
 *  email: '',
 *  token: '',
 *  date: {
 *   date: 2022-01-23,
 *   hours: {
      from: '12',
      until: '13',
     }
    }
 * }
 * */
router.delete('/',
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
            const dateIdx = getDateIdx(user.dates, date.date.toLocaleDateString());
            const userDateObj = user.dates[dateIdx];
            if (userDateObj.hours.length <= 1) {
                // unsets the date object
                await User.findOneAndUpdate(
                    { email },
                    { $unset: { [`dates.${dateIdx}`]: 1 } }
                );
                // deletes the null object
                await User.findOneAndUpdate(
                    { email },
                    { $pull: { 'dates': null } }
                );
            } else {
                const { from, until } = date.hours;
                const hoursIdx = getHoursIdx(user.dates[dateIdx].hours, from, until);
                // unsets the hours object
                await User.findOneAndUpdate(
                    { email },
                    { $unset: { [`dates.${dateIdx}.hours.${hoursIdx}`]: 1 } }
                );
                // deletes the null object
                await User.findOneAndUpdate(
                    { email },
                    { $pull: { [`dates.${dateIdx}.hours`]: null } }
                );
            }
            return res.status(200).json({ success: 'This date or time has been deleted successfully' });
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

        const { email, date, company, contact_name, contact_email, description } = req.body;
        date.date = new Date(date.date);

        const user = await User.findOne({ email });
        if (user) {
            /*const dateIdx = user.dates.findIndex(d => d.date.toLocaleDateString() === date.date.toLocaleDateString());*/
            const dateIdx = getDateIdx(user.dates, date.date.toLocaleDateString());

            const { from, until } = date.hours;
            /*const hoursIdx = user.dates[dateIdx].hours.findIndex(h => h.from === from && h.until === until);*/
            const hoursIdx = getHoursIdx(user.dates[dateIdx].hours, from, until);
            if (dateIdx >= 0 && hoursIdx >= 0) {
                await User.findOneAndUpdate(
                    { email },
                    { $set: { [`dates.${dateIdx}.hours.${hoursIdx}.available`]: false } }
                );

                // send email to me
                const textToUser = `Dear reader,\nthe company ${company} is interested in your profile. ` +
                `You got a meeting with them for this job offering: ${description}. ` +
                    `The meeting is on ${date.date} from ${date.hours.from} until ${date.hours.until}. ` +
                    `If you are not interested please write ${contact_name} an email to this address: ${contact_email}` +
                    `\n\nBest Regards\nThe My-CV Team!`;
                // on click on button / <a> send GET to url which sends email to cancel meeting with company -> future
                const emailSender = new EmailSender();
                emailSender.setOptions(email, 'You got a meeting!', textToUser);
                emailSender.send();

                // send email to company to confirm meeting
                const textToCompany = `Dear ${contact_name},\n` +
                    `Your meeting on ${date.date} from ${date.hours.from} until ${date.hours.until} is confirmed.` +
                    `If the user is not interested in this job offering, you will get a cancel email from us.` +
                    `\n\nBest regards\nThe My-CV Team!`;
                emailSender.setOptions(contact_email, 'You got a meeting!', textToCompany);
                emailSender.send();

                return res.status(200).json({ success: 'This date has now been taken' });
            }
            return res.status(404).json({ errors: 'There is an error with the date Object' });
        }
        return res.status(404).json({ errors: 'User not found' });
    },
);

module.exports = router;


const getDateIdx = (arr, dateString) => arr.findIndex(d => d.date.toLocaleDateString() === dateString);
const getHoursIdx = (arr, from, until) => arr.findIndex(h => h.from === from && h.until === until);
