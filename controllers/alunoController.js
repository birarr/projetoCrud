const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Aluno = mongoose.model('Aluno');


router.get('/', (req, res) => {
    res.render("aluno/addOrEdit", {
        viewTitle: "Inserir aluno"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertAluno(req, res);
        else
        updateAluno(req, res);
 
});


function insertAluno(req, res) {
    var aluno = new Aluno();
    aluno.fullName = req.body.fullName;
    aluno.matricula = req.body.matricula;
    aluno.save((err, doc) => {
        if (!err)
            res.redirect('aluno/list');
        else {
            if (err.name == 'ValidationError') {
                validationError(err, req.body);
                res.render("aluno/addOrEdit", {
                    viewTitle: "Inserir aluno",
                    aluno: req.body
                });
            }
            else
            res.render('aluno/addOrEdit', {errors: "Matrícula invalida ou ja existente"})
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateAluno(req, res) {
    Aluno.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('aluno/list'); }
        else {
            if (err.name == 'ValidationError') {
                validationError(err, req.body);
                res.render("aluno/addOrEdit", {
                    viewTitle: 'Atualizar aluno',
                    aluno: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Aluno.find((err, docs) => {
        if (!err) {
            res.render("aluno/list", {
                list: docs
            });
        }
        else {
            console.log('Erro ao procurar o aluno :' + err);
        }
    });
});


function validationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Aluno.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("aluno/addOrEdit", {
                viewTitle: "Atualizar aluno",
                aluno: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Aluno.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/aluno/list');
        }
        else { console.log('Erro ao deletar aluno :' + err); }
    });
});

module.exports = router;