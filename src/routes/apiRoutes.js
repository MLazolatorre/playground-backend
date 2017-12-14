import express from 'express';

const router = express.Router();

/* GET home page. */
router.post('/api/:commandName', (req, res) => {
  const { query } = req;

  console.log(query);

  res.json(query);
});

export default router;
