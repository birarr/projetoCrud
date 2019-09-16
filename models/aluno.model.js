const mongoose = require('mongoose')

var alunoSchema = new mongoose.Schema({
  nome: {
    type: String
  },
  matricula: {
    type: String,
    unique:true
  },
  disciplina: [{type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina'}]
})


Aluno: mongoose.model('Aluno', alunoSchema)
