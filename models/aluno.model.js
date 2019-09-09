const mongoose = require('mongoose')

var alunoSchema = new mongoose.Schema({
  fullName: {
    type: String
  },
  matricula: {
    type: String
  }
})

mongoose.model('Aluno', alunoSchema)
