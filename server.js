if(process.env.NODE_ENV !== 'production')
{   require('dotenv').config({path: __dirname + '/.env'})
    

}
const express=require('express')
const app=express()
const ejs=require("ejs");
const expressLayouts=require('express-ejs-layouts')
const indexRouter=require('./routes/index')
const authorRouter=require('./routes/author')


const mongoose=require('mongoose')
const { Logger } = require('mongodb')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db=mongoose.connection
db.on('error',error => console.error(error))
db.once('open', () => console.log('Connected to mongoose !!!!'))
console.log("hi i reached")

app.set('view engine','ejs')
app.set('views',__dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({limit: '10mb', extended:false}))
app.use(express.json());
app.use('/',indexRouter)
app.use('/authors',authorRouter)




app.listen(process.env.PORT || 4000)