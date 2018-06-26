var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/blog');

var noticia_schema = new Schema({
    titulo:String,
    descripcion:String,
    categoria:String,
    fecha:String,
    comentarios:[{
        autor:String,
        mensaje:String,
        fecha:String
    }]
},{collection: 'noticias'});

noticia_model = mongoose.model('noticias',noticia_schema,'noticias');

module.exports={
    show: function (req,res) {
        if (req.query._id == null){
            noticia_model.find({},function (err,items) {
                if (!err){
                    if(req.path==='/news_listar'){
                        res.render('noticias',{datos:items});
                    }else{
                        res.render('muestreo',{datos:items});
                    }
                    console.log(req.path);
                } else{
                    return console.log(err);
                }
            });
        } else{
            noticia_model.findOne({_id:req.query._id},function (err,items) {
                if (!err){
                    res.send(items);
                } else{
                    return console.log(err)
                }
            });
        }
    },
    detalle: function (req,res) {
        if (req.params.id != null){
            noticia_model.findOne({titulo:req.params.id},function (err,noticia) {
                if (!err){
                    console.log(noticia);
                    res.render('detalle',{noticia:noticia})
                } else{
                    return console.log(err)
                }
            });
        }
    },
    detalle2: function (req,res) {
        if (req.params.id != null){
            noticia_model.findOne({titulo:req.params.id},function (err,noticia) {
                if (!err){
                    console.log(noticia);
                    res.render('noticia_actualizar',{noticia:noticia})
                } else{
                    return console.log(err)
                }
            });
        }
    },
    update:function (req,res) {
        noticia_model.findOne({titulo:req.params.id},function (err,noticia) {
            noticia.titulo = req.body.titulo,
                noticia.descripcion = req.body.descripcion,
                noticia.categoria = req.body.categoria,
                noticia.fecha = new Date();
            noticia.save();
            res.redirect('/news_listar')
        });
    },
    create: function (req,res) {
        var item = {
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            categoria: req.body.categoria,
            fecha: new Date()
        };
        var nuevo = new noticia_model(item).save();
        res.redirect('/news_listar')
    },
    delete:function (req,res) {
        if (req.params.titulo != null){
        noticia_model.findOne({titulo:req.params.titulo},function (err,noticia) {
            noticia.remove();
            res.redirect('/news_listar')
        });
        }
    },
};
