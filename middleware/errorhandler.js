const {  logEvents } = require("./logEvents")

function errorhandle(err,req,res,next){
   logEvents(`${err.name}:${err.message}`,'errlog.txt') 
   console.error(err.stack)
   res.status(500).send(err.message);
   next()
}

module.exports = errorhandle