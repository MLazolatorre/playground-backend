export default function clearNeo4jSession(req, res, next) {
  req.on('finish', () => {
    console.log('entred in the listener');
    if (req.neo4jSession) {
      req.neo4jSession.close();
      delete req.neo4jSession;
    }
  });

  next();
}
