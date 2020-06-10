
const config = require('./../../../config');
const jwt = require('./../../api/jwt');
module.exports = (api) => {
    api.post('/refresh', async (req, res) => {
        const { dbManager, jwt, config } = req.$;
        const { email, password } = req.body;

        // comprobar que el token de refresco existe
        const token = req.cookies.refresh;
        if (!token) {
            res.status(401).end();
            return;
        }
        // verificamos que el token de refresco es válido
        try {
            var decoded = await jwt.verify(token, config.authentication.refreshSecret);
            // creamos un nuevo token de autenticación
            const authToken = await jwt.sign({ user: decoded.user }, config.authentication.authSecret, { algorithm: 'HS512', expiresIn: config.authentication.authTTL })
               res.json({ token: authToken });
        } catch (err) {
            res.status(401).end();
            console.error(err)
        }
    })
}