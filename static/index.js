const hashUrl = (url) => {
    let key = 0
    let randomHash = Math.floor(Math.random() * 100)
    
    for (var i = 0; i < url.length; i++) {
        key += url.charCodeAt(i)
    }
    return key%randomHash
}

const isValidUrl = (url) => {
    let Url
    try {
        Url = new URL(url)
    }
    catch(err)
    {
        console.log(err)
        return false
    }
    console.log(Url.protocol)
    return (Url.protocol === "http:" || Url.protocol === "https:")
}

module.exports = {
    hashUrl,
    isValidUrl
}