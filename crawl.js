const {JSDOM} = require('jsdom')

async function crawlPage(currentUrl){
    console.log("crawling...")
    try{
    const resp = await fetch(currentUrl)

    if(resp.status > 399){
        console.log(`error in fetch with status code ${resp.status}`)
        return
    }

    const contentType = resp.headers.get("content-type")
    if(!contentType.includes("text/html")){
        console.log(`error non html response in content type ${contentType}`)
        return
    }

    console.log(await resp.text())
    } catch(err) {
    console.log(`error in fetch ${err.message}`)
    }
}

function getUrlsFromHtml(htmlBody,baseUrl){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    
    for(const link of linkElements){
        if(link.href.slice(0,1) === "/"){
            try{
            const urlObj = new URL(`${baseUrl}${link.href}`)
            urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with relative url ${err.message}`)
            }
            }else{
                try{
                    const urlObj = new URL(link.href)
                    urls.push(urlObj.href)
                } catch (err) {
                    console.log(`error with relative url ${err.message}`)
                }
            }
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
getUrlsFromHtml,
crawlPage
}
