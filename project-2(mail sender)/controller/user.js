const nodemailer = require('nodemailer')
module.exports.sendmail = async (req, res) => {

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: 'tyrique.reynolds49@ethereal.email',
            pass: 'E7qNUdV7guu1ynmEfP'
        },
    });

    let info = await transporter.sendMail({

        from: '"sagar sonaliya" <sagar@example.com>',
        to: "nirmalumarvanshi57@gmail.com",
        subject: "Hello ✔",
        text: "Hello world?",
        html: "<b>Hello world?</b>",

    })

    console.log("Message sent: %s", info.messageId);
    res.json(info)


}