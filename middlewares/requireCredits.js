module.exports = (req, res, next) => {
    if (req.user.credits < 1) {
        return res.status(403).send({ error: 'No posee los suficientes créditos para realizar una encuesta' });
    }
    next();
};