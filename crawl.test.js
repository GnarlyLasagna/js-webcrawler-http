const {normalizeUrl, getUrlsFromHtml} = require('./crawl.js')
const {test, expect} = require('@jest/globals')

test('normalizeUrl strip protocol', ()=>{
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'

    expect(actual).toEqual(expected)
}) 

test('normalizeUrl trailing slash', ()=>{
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'

    expect(actual).toEqual(expected)
}) 

test('normalizeUrl capitals', ()=>{
    const input = 'https://BLOG.BOOT.dev/PATH/'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'

    expect(actual).toEqual(expected)
}) 

test('normalizeUrl strip http', ()=>{
    const input = 'http://BLOG.BOOT.dev/PATH/'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'

    expect(actual).toEqual(expected)
}) 


test('getUrlsFromHtml absolute', ()=>{
    const inputHtmlBody = `
<html>
        <body>
        <a href="https://blog.boot.dev/">
        Boot.dev Blog
        </a>
        </body>
</html>
    `
    const inputBaseUrl = "https://blog.boot.dev"
    const actual = getUrlsFromHtml(inputHtmlBody,inputBaseUrl)
    const expected = ["https://blog.boot.dev/"]

    expect(actual).toEqual(expected)
}) 

test('getUrlsFromHtml relative', ()=>{
    const inputHtmlBody = `
<html>
        <body>
        <a href="/path/">
        Boot.dev Blog
        </a>
        </body>
</html>
    `
    const inputBaseUrl = "https://blog.boot.dev"
    const actual = getUrlsFromHtml(inputHtmlBody,inputBaseUrl)
    const expected = ["https://blog.boot.dev/path/"]

    expect(actual).toEqual(expected)
}) 

test('getUrlsFromHtml relative and absolute', ()=>{
    const inputHtmlBody = `
<html>
        <body>
        <a href="/path1/">
        Boot.dev Blog
        </a>
         <a href="https://blog.boot.dev/path2/">
        Boot.dev Blog
        </a>

        </body>
</html>
    `
    const inputBaseUrl = "https://blog.boot.dev"
    const actual = getUrlsFromHtml(inputHtmlBody,inputBaseUrl)
    const expected = ["https://blog.boot.dev/path1/","https://blog.boot.dev/path2/"]

    expect(actual).toEqual(expected)
}) 

test('getUrlsFromHtml bad path', ()=>{
    const inputHtmlBody = `
<html>
        <body>
        <a href="invalid">
        Boot.dev Blog
        </a>
         <a href="bad path">
        Boot.dev Blog
        </a>

        </body>
</html>
    `
    const inputBaseUrl = "https://blog.boot.dev"
    const actual = getUrlsFromHtml(inputHtmlBody,inputBaseUrl)
    const expected = []

    expect(actual).toEqual(expected)
}) 

