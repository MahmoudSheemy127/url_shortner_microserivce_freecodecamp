const express = require("express")
let bodyParser = require("body-parser")
const cors = require("cors")
var dns = require('dns')
const myApp = require("./static/index.js")

const app = express()

//Url Hash map
urlHash = {}


//configure body-parser library
bodyParser = bodyParser.urlencoded({extended:false})

//use middleware body parser to parse form body
app.use(bodyParser)

//use middleware cors to allow secure navigations from different sources
app.use(cors())


//load html file
app.get('/',(req,res) => {
    res.sendFile(__dirname + "/public/index.html")
})

//form post request
app.post('/api/shorturl',(req,res) => {
    
    if(myApp.isValidUrl(req.body.url))
    {
        const url = new URL(req.body.url)

        dns.lookup(url.hostname,(data) => {

            if(!data)
            {
                let key = myApp.hashUrl(url.hostname) 
                urlHash[key] = url
                res.json({
                    original_url:url,
                    short_url: key
                })
            }
            else
            {
                res.json({
                    error:'invalid hostname'
                })
            }
    })
}
    else
    {
    res.json({
            error:'invalid url'
    })
    }
    // try{
    //     const url = new URL(req.body.url)

    //     dns.lookup(url.hostname,options,(data) => {

    //         if(!data)
    //         {
    //             let key = myApp.hashUrl(url.hostname) 
    //             urlHash[key] = url
    //             res.json({
    //                 original_url:url,
    //                 short_url: key
    //             })
    //         }
    //         else
    //         {
    //             res.json({
    //                 error:'invalid hostname'
    //             })
    //         }
    //     })

    // }catch(err)
    // {
    //     console.log("Not valid")
    //     res.json({
    //             error:'invalid url'
    //     })

    // }
})


app.get('/api/shorturl/:key',(req,res) => {
    if(urlHash[req.params.key])
    {
        res.redirect(urlHash[req.params.key])
    }
})

app.listen(3000,() => {
    console.log("Server is running at 3000")
})