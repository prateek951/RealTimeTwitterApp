const express = require('express');
const router = express.Router();

/*@route GET request for the '/' route*/ 
/*@desc To render the main handlebars template as the view*/ 
/*@access Public*/

router.get('/',(req, res) => res.json('test 123'));
 


module.exports = router;