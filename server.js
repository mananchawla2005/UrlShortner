const express = require('express')
const mongoose = require('mongoose')
const shortUrl = require('./models/shortUrl')
var bodyParser = require('body-parser')
const dotenv = require('dotenv')
const result = dotenv.config()

const app = express()
mongoose.connect('mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@urlshortner.fyd7p.gcp.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Connected to db!')
})

app.set('view engine', 'ejs')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', urlencodedParser, async (req, res)=>{
    var passedVariable = req.query.url;
    const shortened = await shortUrl.findOne({full: passedVariable})
    if(shortened!=null){
        res.render('index', {shortened: shortened.short})
    }
    else{
        res.render('index', {shortened: 'Not_Found'})
    }

})

app.get('/:shortUrl', (req, res)=>{
    shortUrl.findOne({short: req.params.shortUrl}).then((url)=>{
        if(url==null){
            return res.sendStatus(404)
        }
        res.redirect(url.full)
    })
})

app.post('/shortUrls', urlencodedParser, async (req, res)=>{
    await shortUrl.create({full: req.body.fullUrl})
    res.redirect('/?url=' + req.body.fullUrl)
})

app.listen(process.env.PORT || 5000, ()=>{console.log('Listening on port 5000....')})