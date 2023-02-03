const express = require('express')
const app = express()
const hbs = require('hbs');
const path = require('path')
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/nirmaldb1')
var bodyParser = require('body-parser');
var cookies = require('cookie-parser');
var bycrypt = require('bcryptjs');
const Product = require('./Model/product');
const User = require('./Model/user')
const jwt = require('jsonwebtoken')
const { findByIdAndDelete } = require('./Model/product');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT= 8000

app.set('view engine','hbs')
app.set('views',path.join(__dirname, 'Template/views'))

const usePartialPath = path.join(__dirname, 'Template/partial')
hbs.registerPartials(usePartialPath)

app.use(express.static('Template/public'));

app.get('/', async (req, res) => {

    res.render('Home')
})

app.get('/Product', async (req, res) => {
    const currentUser = req;
    const products = await Product.find()

    res.render('product', { product: products})
   
    
})
app.post('/addproduct', async function (req, res) {
    
    const product2 = await new Product(req.body)
    product2.save()
   
    res.redirect('/product')
    
})

app.get('/addproduct', async (req, res) => {

    res.render('addproducts')
})

app.get('/deleteid/:id', async  function(req,res){

const id= req.path.split('/')
const _id= id[2]
const product2 = await Product.findByIdAndDelete({_id : _id})
res.redirect('/product')

})

app.post('/editid', async  function(req,res){

    const _id = req.query.eid

    const product2 = await Product.findByIdAndUpdate(_id, req.body)
  
    res.redirect('product')
     
    })


app.get('/editid', async (req, res) => {

    const _id = req.query.eid
    const product = await Product.findById({_id : _id})
    res.render('addproducts', { product: product })

})

app.get('/contact', function (req, res) {
    res.render('Contact')})


app.get('/About',function(req,res){
    res.render('about')
})
app.listen(PORT,()=>{
console.log("Lets go for the project......")

})
app.get('/signup',function(req,res){

    res.render('signup')
})
app.get('/login',function(req,res){

    res.render('login')
})



app.post('/signup', async function (req, res) {
    console.log(req.body)
    const user = await new User(req.body)
    user.save().then((user) => {
        const token = jwt.sign({ _id: user._id }, 'secretekey', { expiresIn: '60 days' });
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
    
    res.redirect('/login')
    
})
})

app.post('/login',async function(req,res){
const {email,password} = req.body
User.findOne({ email }, 'email password').then((user) => {

    if(req.body.password===user.password){

        const token = jwt.sign({ _id: user._id, name: user.name }, 'secretekey', {
            expiresIn: '60 days',
        });

        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
        res.render('home')
    }
        else{
            console.log("user is not match...")
        }
        

       

    }).catch((err) => {

})

})




