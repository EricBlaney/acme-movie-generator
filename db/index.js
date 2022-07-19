const Sequelize = require('sequelize');
const {STRING, INTEGER} = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_movies_db');

const Movie = conn.define('movie', {
    name: {
        type: STRING
    },
    rating: {
        type: INTEGER,
        defaultValue: 3
    }
})

Movie.addHook('beforeValidate', (movie) => {
    if (movie.rating < 1 || movie.rating > 5 ) {
        throw new Error("Rating can only be in the 1 to 5 range!");
    }
  });

Movie.addHook('beforeUpdate', (movie) => {
    if (movie.rating < 1 || movie.rating > 5 ) {
        throw new Error("Rating can only be in the 1 to 5 range!");
    }
});

module.exports = {
    conn,
    Movie
}