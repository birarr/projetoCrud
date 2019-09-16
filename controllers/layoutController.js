const express = require('express');
var router = express.Router();



router.get('/', (req, res) => {
    res.render("home/home", {
        viewTitle: "CRUD DSO2"
    });
});

router.get('/', (req, res) => {
    res.render("aluno/addOrEdit", {
        viewTitle: "Inserir aluno"
    });
});


router.get('/', (req, res) => {
    res.render("disciplina/addOrEdit", {
        viewTitle: "Inserir disciplina"
    });
});

module.exports = router;