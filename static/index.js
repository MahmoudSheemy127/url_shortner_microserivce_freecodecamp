const hashUrl = (url) => {
    let key = 0
    let randomHash = Math.floor(Math.random() * 100)
    
    for (var i = 0; i < url.length; i++) {
        key += url.charCodeAt(i)
    }
    return key%randomHash
}


module.exports = {
    hashUrl
}