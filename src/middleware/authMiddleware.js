const { expressjwt: jwt } = require('express-jwt');

const authMiddleware = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
}).unless({ path: ['/login', '/cadastro/:role', '/forgotPassword', '/reset-password/:token'] });  // Excluindo as rotas públicas

module.exports = (req, res, next) => {
  console.log('Authorization header:', req.headers['authorization']);  // Log para depuração
  authMiddleware(req, res, next);  // Aplica o middleware de autenticação
};
