const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://projeto1:projeto1@cluster0-enoaa.mongodb.net/AlunoDB?retryWrites=true&w=majority',
 {useNewUrlParser: true}, (err) => {
  if(!err) {console.log("Connection succesfull");}
  else {console.log("Error connection:" + err);}
})

require('./aluno.model')
require('./disciplina.model')