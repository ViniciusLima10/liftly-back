// em src/middleware/authMiddleware.js
const { expressjwt: jwt } = require('express-jwt');

const inner = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});

module.exports = (req, res, next) => {
  inner(req, res, err => {
    if (err) return next(err);
    // copia o payload para req.user
    req.user = req.auth;
    next();
  });
};
