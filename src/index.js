import app from './app'
import './database'
import './auth/passport'

//ARRANQUE DE SERVIDOR
app.set('port', process.env.PORT || 3001)
app.listen(app.get('port'), err => {
    if (err) throw err;
    console.log("Server conectado, puerto:", app.get('port'))
})


