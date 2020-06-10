module.exports = (api) => {
    api.post('/logout', (req, res) => {
// TODO: eliminar la cookie de refresco
        res.clearCookie('refresh', {
            httpOnly: true,
            sameSite: 'none'
                }).status(204).end();
            });
        }