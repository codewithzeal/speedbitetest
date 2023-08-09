function validateRequest(req, res, next) {
    if(req.body.email==null&&req.body.phoneNumber==null)
    {
      return res.status(400).json({ error: 'please provide correct values' });
    }
    next();
  }

module.exports = validateRequest