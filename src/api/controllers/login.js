const bcrypt = require('bcrypt');
module.exports = (api) => {
    api.post('/login',async (req, res) => {
        const {dbManager, jwt, config} = req.$;
        const { email, password } = req.body;


// TODO: comprobar que user y pass son correctos
        const user = await dbManager.get('users', {find:{email}});
        if (!user) {
            res.status(401).end();
            return;
        } 
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            res.status(401).end();
            return;
        }
// TODO: crear tokens de refresco y de auth y devolverlos
        const userModel = {
            ...user,
            password: undefined
        };
        const authToken = await jwt.sign({user:userModel},config.authentication.authSecret,{algorithm:'HS512',expiresIn: config.authentication.authTTL})
        
        const refreshToken = await jwt.sign({user:userModel},config.authentication.refreshSecret,{algorithm:'HS512',expiresIn: config.authentication.refreshTTL})
            res.cookie('refresh', refreshToken, {
                    maxAge: config.authentication.refreshTTL * 1000,
                    httpOnly: true,
                    sameSite: 'none'
            })
                .json({token: authToken});   
        });     
        
}
    
