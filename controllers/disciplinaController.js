const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Disciplina = mongoose.model('Disciplina');
const Aluno = mongoose.model('Aluno')

router.get('/', (req, res) => {
    res.render("disciplina/addOrEdit", {
        viewTitle: "Inserir disciplina"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
    insertDisciplina(req, res);
    else
    updateDisciplina(req, res);
});


function insertDisciplina(req, res) {
    var disciplina = new Disciplina();
    disciplina.nome = req.body.nome;
    disciplina.codigo = req.body.codigo;
    disciplina.horario = req.body.horario;
    disciplina.save((err, doc) => {
        if (!err)
            res.redirect('disciplina/list');
        else {
            if (err.nome == 'ValidationError') {
                validationError(err, req.body);
                res.render("disciplina/addOrEdit", {
                    viewTitle: "Inserir disciplina",
                    disciplina: req.body
                });
            }
            else
            res.render('disciplina/addOrEdit', {errors: "Disciplina invalida ou já existente"})
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateDisciplina(req, res) {
    Disciplina.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('disciplina/list'); }
        else {
            if (err.nome == 'ValidationError') {
                validationError(err, req.body);
                res.render("disciplina/addOrEdit", {
                    viewTitle: 'Atualizar disciplina',
                    disciplina: req.body
                });
            }
            else
            res.render('disciplina/addOrEdit', {errors: "Disciplina invalida ou já existente"})
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Disciplina.find((err, docs) => {
        if (!err) {
            res.render("disciplina/list", {
                list: docs
            });
        }
        else {
            console.log('Erro ao procurar o disciplina :' + err);
        }
    });
});


function validationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Disciplina.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("disciplina/addOrEdit", {
                viewTitle: "Atualizar disciplina",
                disciplina: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Disciplina.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/disciplina/list');
        }
        else { console.log('Erro ao deletar disciplina :' + err); }
    });
});

module.exports = router;