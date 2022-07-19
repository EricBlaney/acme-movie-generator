const express = require('express');
const app = express();
const path = require('path');
const { conn, Movie } = require('./db');

app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ err });
});

app.post('/api/movies', async(req,res,next) => {
  try{
    res.status(201).send(await Movie.create(req.body));
  }
  catch(ex) {
    next(ex);
  }
})

app.put('/api/movies/:id', async(req, res, next) => {
  try{
    const movie = await Movie.findByPk(req.params.id);
    await movie.update(req.body);
    res.send(movie);
  }
  catch(ex){
    next(ex);
  }
})

app.delete('/api/movies/:id', async(req,res,next) => {
  try{
    const movie = await Movie.findByPk(req.params.id);
    await movie.destroy();
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
})

app.get('/api/movies', async(req,res,next) => {
  try{
    res.send(await Movie.findAll({
      order: [['rating', 'DESC'], ['name']]
    }));
  }
  catch(ex) {
    next(ex);
  }
})


const init = async()=> {
  try {
    await conn.sync({ force: true});
    const [walle, the_avengers, knives_out] = await Promise.all(
      [['Wall-e', 5], ['The Avengers', 3], ['Knives Out', 4]].map( (sub_arr) => {
        Movie.create({name: sub_arr[0], rating: sub_arr[1]})
      })
    )
    
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
}

init();
