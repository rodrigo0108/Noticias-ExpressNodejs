var express = require('express'),
    app= express(),
    bodyParser = require('body-parser'),
    noticia = require('./models/noticia');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine','jade');

app.get('/',function (req,res) {
    res.send('Hola Mundo');
});

app.get('/login',function (req,res) {
    res.render('login');
});
app.get('/news_crear',function (req,res) {
    res.render('noticia_crear');
});
app.post('/news_crear',noticia.create);

app.get('/news_update/:id', noticia.detalle2);
app.post('/news_update/:id', noticia.update);

app.post('/news_remove/:titulo',noticia.delete);

app.get('/news_listar',noticia.show);

app.get('/news',noticia.show);
app.get('/news_detail/:id', noticia.detalle);

app.listen(9090,function () {
    console.log('Iniciando en el puerto 9090!...')
});