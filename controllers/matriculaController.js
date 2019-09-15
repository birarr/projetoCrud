const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Disciplina = mongoose.model('Disciplina');
const Aluno = mongoose.model('Aluno')


router.get('/', (req, res) => {
    res.render("matricula/matricula", {
        viewTitle: "CRUD DSO2"
    });
});

module.exports = router
