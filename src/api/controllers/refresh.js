module.exports = (api) => {
    api.post('/refresh', async (req, res) => {
// TODO: comprobar que el token de refresco sea valido
// TODO: emitir un nuevo token de auth

const token = req.cookies.refresh;
    if(!token){
        res.status(401).end();
            return;
    }
                
const authToken = await req.$.authManager.refresh(token);
    if(!authToken){
        res.status(401).end();
            return;
    }
        res.status(200).json({token:authToken});
        })
}