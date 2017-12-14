import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Curl',
    funs: [
      {
        name: '',
        func: () => {

        },
      }, {
        name: '',
        func: () => {},
      },
    ],
  });
});

export default router;
