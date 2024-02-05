const {JSDOM} = require('jsdom')

function getUrlsFromHtml(htmlBody,baseUrl){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    
    for(const link of linkElements){
            urls.push(link.href)
            console.log("current arr",urls)
    }
    return urls
}


function normalizeUrl(urlString){
    const urlObj = new URL(urlString.toLowerCase())
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    
    if(hostPath.length > 0 && hostPath.slice(-1) === "/"){
    return hostPath.slice(0,-1)
    }
    return hostPath

}

module.exports = {
normalizeUrl,
getUrlsFromHtml
}
