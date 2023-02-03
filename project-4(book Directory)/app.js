const express = require('express')
const app = express()
const path = require('path')
const bcryptjs = require('bcryptjs')
PORT = 3000
const hbs = require('hbs')
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, './Template/views'))
const partialpath = path.join(__dirname, 'Template/partials')
const jwt = require('jsonwebtoken');
hbs.registerPartials(partialpath)
const connection = require('./Models/connection')
const User = require('./Models/user')
const csspath = path.join(__dirname, './public/style.css')
app.use(express.static(csspath))
const cookieparser = require('cookie-parser')
const multer = require('multer')
const publicpath = path.join(__dirname, './uploads')
console.log(publicpath);
app.use(express.static(publicpath))
app.use(cookieparser())
const storage = multer.diskStorage({

    destination: function (req, file, callback) {
        callback(null, './uploads')
    },

    filename: function (req, file, callback) {
        callback(null, file.fieldname + "-" + Date.now() + ".jpg")
    }
})

var upload = multer({ storage: storage }).single('image')

const bodyparser = require('body-parser')
const { auth } = require('./middleware/authentication')
const { json } = require('body-parser')
app.use(bodyparser.json());
app.use(express.json())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/home', auth, async function (req, res) {
    const data = await connection.find()
    res.render('home', { products: data })
})

app.get('/viewproducts', auth, async function (req, res) {
    const data = await connection.find()
    res.render('views_products', { products: data })
})

app.post('/viewproducts', async function (req, res) {
    const enteredname = req.body
    const findbook1 = await connection.find(enteredname)
    res.render('views_products', { findbook: findbook1 })
})


app.get('/editone', async function (req, res) {
    res.render('addproducts')
})

app.get('/about', function (req, res) {

    res.render("")
})


app.get('/addnewone', async function (req, res) {
    const currentuser = req;

    res.render('addproducts', { currentuser })
})


app.post('/addnewone', async function (req, res) {

    upload(req, res, async function (err) {
        const filename = req.body.image
        const Title = req.body.Title
        const Author = req.body.Author
        const description = req.body.Description

        const data = { Title: Title, Author: Author, Description: description, image: filename }

        const data2 = await new connection(data)
        data2.save()
        res.redirect('/viewproducts')
    })
})

app.get('/deleteone/:id', async function (req, res) {
    const id = req.path.split('/')
    const _id = id[2]
    const data2 = await connection.findByIdAndDelete({ _id: _id })
    res.redirect('/viewproducts')
})


app.get('/editone', async function (req, res) {
    const _id = req.query.eid
    const product = await connection.findById({ _id: _id })
    res.render('Editproduct', { product: product })
})

app.post('/editone', async function (req, res) {
    const _id = req.query.eid
    const product = await connection.findByIdAndUpdate(_id, req.body)
    res.redirect('/viewproducts')
})

app.get('/', function (req, res) {

    res.render('signuppage')
})

app.post('/', async function (req, res) {
    const data = req.body
    console.log(req.body);
    const user = await new User(data)
    user.save()
    res.redirect('/login')
})

app.get('/login', function (req, res) {
    res.render('loginpage')
})

app.post('/login', async function (req, res) {

    try {
        const enteredpassword = req.body.password
        const enteredemail = req.body.email
        const storedpassword = await User.findOne({ email: enteredemail })
        const storedpassword1 = storedpassword.password
        console.log(enteredpassword);
        console.log(storedpassword.password);
        const token = jwt.sign({ _id: this._id }, 'nirmalumarvanshi57')
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 6000),
            httpOnly: true
        });
        const ismatchv = await bcryptjs.compare(enteredpassword, storedpassword1)
        console.log(ismatchv);

        if (ismatchv) {
            console.log(token);
            res.redirect('/home')
        }

        else {
            res.send('password is not match')
        }
    }
    catch (error) {
        res.send("invalid login details")
    }

})

app.get('/register', function (req, res) {

    res.render('register')
})

app.listen(PORT, () => {

    console.log('server is running.........');

})