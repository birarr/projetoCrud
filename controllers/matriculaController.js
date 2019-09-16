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

router.get('/matricula/:id', (req, res) => {
    Aluno.find((err, docs) => {
        if (!err) {
            Aluno.find((err, docs) => {
                console.log(docs)
                })
            res.render("matricula/matricula", {
                list: docs
            });
        }
        else {
            console.log('Erro ao procurar o disciplina :' + err);
        }
    });
});


router.get('/:id', (req, res) => {
    Aluno.findById(req.params.id, (err, doc) => {
        if (!err) {
            Disciplina.find((err, docs) => {
            console.log(docs)
            
            res.render("matricula/matricula", {
                viewTitle: "Matricula Aluno",
                viewName: doc.nome,
                disciplina: docs
            });
        })
        }
    });
});

router.get('/registra/:id', (req, res) => {
    Aluno.findById(req.params.id).populate('Disciplina')
    .exec()
});

// function getUserMatriculado(aluno) {
    // return Aluno.findOne({_id: _id)
//     .populate('disciplina').exec((err, disciplina) => {
//         console.log("Populated Aluno" + disciplina)
//         res.render("matricula/matricula")
//     })
    
// }

module.exports = router
