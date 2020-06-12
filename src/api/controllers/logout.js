module.exports = (api) => {
    api.post('/logout', (req, res) => {
        // TODO: eliminar la cookie de refresco
        const { refreshCookie } = req.$.config.authentication
        res.clearCookie(refreshCookie, {
            httpOnly: true,
            sameSite: 'none'
        }).status(204).end();
    });
}