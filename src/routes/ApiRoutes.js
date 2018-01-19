import express from 'express';
import CommandsAPIHolder from '../API/CommandsAPIHolder';

const router = express.Router();

/* GET home page. */
router.get('/:commandName', async (req, res, next) => {
  const body = req.params;

  const commandsAPIHolder = CommandsAPIHolder.getInstance();

  let result = 0;

  // check if the command exist
  try {
    result = await commandsAPIHolder.executeCmd(body.commandName, req, { login: 'marc', pwd: 'hoho' });

    res.json({
      error: false,
      response: result,
    });
  } catch (err) {
    err.status = 400;

    next(err);
  }
});

export default router;
