// TODO: comprobar si el token de auth es valido
// si no es valido 401

module.exports = async (req, res, next) => {
  const { jwt, config } = req.$;
  const auth = req.get('Authorization');
  if (!auth || !auth.startsWith('Bearer ')) {
    res.status(401).end();
    return;
  }
  // si es valido grabar el usuario en req.$ y next
  const { authSecret,
  } = config.authentication;
  try {
    const token = auth.split(' ')[1];
    const user = await jwt.verify(token, authSecret);
    req.$.user = user;
    next();

  } catch (err) {
    res.status(401).end();
    console.error(err)    
  }
}