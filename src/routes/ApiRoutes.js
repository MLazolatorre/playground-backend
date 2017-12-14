import express from 'express';
import CommandsAPIHolder from '../API/CommandsAPIHolder';

const router = express.Router();

/* GET home page. */
router.post('/api/:commandName', (req, res) => {
  const { query } = req;

  console.log(query);

  const commandsAPIHolder = CommandsAPIHolder.getInstance();

  // check if the command exist
  if (!commandsAPIHolder.isCommandExist(query.commandName)) {
    res.json({
      error: true,
      response: `function ${query.commandName} doesn't exist`,
    });
  }

  // here the command exist so we can execute it


  res.json(query);
});

export default router;
