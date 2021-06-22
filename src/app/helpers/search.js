const songsModel = require('../models/songsModel');
const albumsModel = require('../models/albumsModel');
const singersModel = require('../models/singersModel');
const search = (req, res, next) => {
  let keyword = req.body.keyword || req.query.keyword || '';
  const keywordLength = keyword.split(' ').length;
  let queryParams = {};
  if (keywordLength === 1) {
    queryParams = {
      // $text: { $search: keyword },
      name: { $regex: keyword, $options: 'iu' },
    };
  } else {
    queryParams = {
      $text: { $search: keyword },
    };
  }
  // console.log(`queryParams`, queryParams);
  const songsMatched = songsModel
    .find(queryParams)
    // .limit(3)
    .paginate(req)
    .populate('singers')
    .populate('authors')
    .populate('categories');
  const singersMatched = singersModel.find(queryParams);
  const albumsMatched = albumsModel.find(queryParams);

  Promise.all([songsMatched, singersMatched, albumsMatched])
    .then((results) => {
      const [songs, singers, albums] = results;
      // res.status(200).json({ search: { songs, singers, albums } });

      if (singers.length) {
        const singersId = singers.map((singer) => singer._id);
        songsModel
          .find({ singers: { $in: singersId } })
          .populate('singers')
          .paginate(req)
          .then((songsOfSingers) => {
            // console.log(songsOfSingers);
            res.status(200).json({ search: { songs, singers, albums, songsOfSingers } });
          });
      } else {
        res.status(200).json({ search: { songs, singers, albums } });
      }
    })
    .catch(next);
};

module.exports = search;
