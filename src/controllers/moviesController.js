const db = require('../database/models');
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
        res.render('moviesAdd');
    },
    create: function (req, res) {
        let { 
            title, 
            rating, 
            awards, 
            release_date, 
            length
        } = req.body;

        db.Movie.create({
            title,
            rating,
            awards,
            release_date,
            length
        })
        .then(() => {
            db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', { movies });
            })   
        });
    },
    edit: function(req, res) {
        db.Movie.findOne({
            where: {
                id: req.params.id
            },
        })
        .then(movie => {
            res.render("moviesEdit", { movie });
        });
    },
    update: function (req,res) {
        let { 
            title, 
            rating, 
            awards, 
            release_date, 
            length
        } = req.body;

        db.Movie.update({
            title,
            rating,
            awards,
            release_date,
            length
        },
        {
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', { movies });
            })
        });
    },
    delete: function (req, res) {
        db.Movie.findOne({
            where: {
                id: req.params.id
            },
        })
        .then(movie => {
            res.render("moviesDelete", { movie });
        });
    },
    destroy: function (req, res) {
        db.Movie.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', { movies });
            })   
        });
    }

}

module.exports = moviesController;