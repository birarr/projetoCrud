require('./models/db')

const express = require('express')
const alunoController = require('./controllers/alunoController')
const disciplinaController = require('./controllers/disciplinaController')
const matriculaController = require('./controllers/matriculaController')
const homeController = require('./controllers/homeController')
const path = require('path')
const exphbs = require('express-handlebars')
const bodyparser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')

var app = express()
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())
app.use(flash())
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true, cookie: {secure:true, maxAge: 6*60*60*1000}}));
app.use(cookieParser('secret'))

app.set('views', path.join(__dirname, '/views/'))
app.engine('hbs', exphbs({extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts'}))
app.set('view engine', 'hbs')

app.listen(3000, () => {
  console.log("Express server started at port : 3000");
})

app.use('/aluno', alunoController)
app.use('/disciplina', disciplinaController)
app.use('/matricula', matriculaController)
app.use('/home', homeController)