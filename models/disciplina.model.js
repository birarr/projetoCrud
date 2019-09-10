const mongoose = require('mongoose')

var disciplinaSchema = new mongoose.Schema({
  name: {
    type: String
  },
  codigo: {
    type: String,
    unique:true
  },
  horario: Number
})

mongoose.model('Disciplina', disciplinaSchema)
