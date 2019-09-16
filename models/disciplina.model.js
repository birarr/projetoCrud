const mongoose = require('mongoose')

var disciplinaSchema = new mongoose.Schema({
  nome: {
    type: String
  },
  codigo: {
    type: String,
    unique:true
  },
  horario: Number,
  aluno: [{type: mongoose.Schema.Types.ObjectId, ref: 'Aluno'}]
})


mongoose.model('Disciplina', disciplinaSchema)
