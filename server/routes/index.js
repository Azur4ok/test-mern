const router = require('express').Router();
const CALLS = require('../models/calls.js');
const bodyParser = require('body-parser').json();

router.post('/getCalls', bodyParser, async (req, res) => {
  const status = req.body.STATUS;
  const sort = req.body.SORT;
  try {
    const check = await CALLS.find()
      .where({
        ...(!!status && { STATUS: status }),
      })
      .sort({ ...(!!sort && { START_DATE: sort }) });
    res.json(check);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
