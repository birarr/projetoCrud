const mongoose = require('mongoose')

var alunoSchema = new mongoose.Schema({
  fullName: {
    type: String
  },
  matricula: {
    type: String,
    unique:true
  }
})

mongoose.model('Aluno', alunoSchema)
