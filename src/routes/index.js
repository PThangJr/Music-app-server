const songsRouter = require('./songsRouter');
const authorsRouter = require('./authorsRouter');
const singersRouter = require('./singersRouter');
const categoriesRouter = require('./categoriesRouter');
const playlistsRouter = require('./playlistsRouter');
const albumsRouter = require('./albumsRouter');
const authsRouter = require('./authsRouter');

const route = (app) => {
  app.use('/api/v1/songs', songsRouter);
  app.use('/api/v1/authors', authorsRouter);
  app.use('/api/v1/singers', singersRouter);
  app.use('/api/v1/categories', categoriesRouter);
  app.use('/api/v1/playlists', playlistsRouter);
  app.use('/api/v1/albums', albumsRouter);
  app.use('/api/v1/auths', authsRouter);
};
module.exports = route;
