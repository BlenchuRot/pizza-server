
module.exports = (api) => {
    api.post('/refresh', async (req, res) => {
        const { jwt, config } = req.$;
        
            // comprobar que el token de refresco existe
        const token = req.cookies.refresh;
        if (!token) {
            res.status(401).end();
            return;
        }
        // verificamos que el token de refresco es válido
        const {
            authSecret,
            refreshSecret,
            authTTL,
        } = config.authentication;
        let decoded;
        try {
            decoded = await jwt.verify(token, refreshSecret);
        } catch (err) {
            res.status(401).end();
            console.error(err)
        }
        // creamos un nuevo token de autenticación
        const authToken = await jwt.sign({ user: decoded.user }, authSecret, { algorithm: 'HS512', expiresIn: authTTL })
               res.json({ token: authToken });
    })
}