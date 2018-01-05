import express from 'express';
import CommandsAPIHolder from '../API/CommandsAPIHolder';

const router = express.Router();

/* GET home page. */
router.get('/:commandName', (req, res, next) => {
  const body = req.params;

  console.log(body);

  const commandsAPIHolder = CommandsAPIHolder.getInstance();

  // check if the command exist
  try {
    commandsAPIHolder.executeCmd(body.commandName, {});
  } catch (err) {
    err.status = 400;

    next(err);
  }

  res.json({
    error: false,
    response: body,
  });
});

export default router;
