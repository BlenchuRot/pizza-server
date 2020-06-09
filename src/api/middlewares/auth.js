  // TODO: comprobar si el token de auth es valido
  // si no es valido 401
  // si es valido grabar el usuario en req.$ y next

module.exports = async (req, res, next) => {
  const auth = req.get('Authorization');
  if (!auth || !auth.includes('Bearer ')) {
      res.status(401).end();
      return;
  }
  const token = auth.split(' ')[1];
  const user = await req.$.authManager.verify(token);
  if(!user){
      res.status(401).end();
      return;
  }
  req.$.user = user;
  next();
}