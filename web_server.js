const express = require('express')
const app = express()
const path = require('path')
const {logger} = require('./middleware/logEvents')
const errorhandle =require('./middleware/errorhandler')
const PORT = process.env.PORT || 3500;
const cors = require('cors')
const whitelist = ['http://localhost:3500','https://www.googl.com']
const corOptions ={
    origin:(origin,callback)=>{
        if(whitelist.indexOf(origin) !== -1 || !origin){
            callback(null,true)
        } else{
            callback(new Error('Not allowed by cors'));
        }
    },
    optionsSuccessStatus:200
}

app.use(logger)
app.use(cors(corOptions))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/',require('./routes/root'))
app.use('/subdir',require('./routes/subdir'))
app.use('/',express.static(path.join(__dirname,'./public')))
app.use('/subdir',express.static(path.join(__dirname,'./public')))
app.use('/employees',require('./routes/api/employee'))


// app.get('^/$|/index(.html)?',(req,res)=>{
//     res.sendFile(path.join(__dirname,'views','index.html'));
// })
// app.get('/new-page(.html)?',(req,res)=>{
//     res.sendFile(path.join(__dirname,'views','new-page.html'));
// })
// app.get('/old-page',(req,res)=>{
//     res.redirect(301,'new-page');
// })


// app.get('/chain(.html)?',(req,res, next)=>{
//     console.log('trying to print')
//     next()
// },(req,res)=>{

//     res.send('hai')
// })

// const one = (req,res,next)=>{
//     console.log('one')
//     next()
// }
// const two = (req,res,next)=>{
//     console.log('two')
//     next()
// }
// const three = (req,res)=>{
//     console.log('three')
//     res.send('fineshed')
// }

// app.get('/detail',[one,two,three])

app.get('/*',(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
})

app.use(errorhandle)

app.listen(PORT ,()=> console.log(`app is running in port ${PORT}`))