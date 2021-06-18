const songsRouter = require('./songsRouter');
const authorsRouter = require('./authorsRouter');
const singersRouter = require('./singersRouter');
const categoriesRouter = require('./categoriesRouter');
const playlistsRouter = require('./playlistsRouter');
const albumsRouter = require('./albumsRouter');
const authsRouter = require('./authsRouter');
<<<<<<< HEAD
const searchRouter = require('./searchRouter');
=======
>>>>>>> 2ce6598d3fe2317b687e8360f000b2ad085da272

const route = (app) => {
  app.use('/api/v1/songs', songsRouter);
  app.use('/api/v1/authors', authorsRouter);
  app.use('/api/v1/singers', singersRouter);
  app.use('/api/v1/categories', categoriesRouter);
  app.use('/api/v1/playlists', playlistsRouter);
  app.use('/api/v1/albums', albumsRouter);
  app.use('/api/v1/auths', authsRouter);
<<<<<<< HEAD
  app.use('/api/v1/search', searchRouter);
=======
>>>>>>> 2ce6598d3fe2317b687e8360f000b2ad085da272
};
module.exports = route;
