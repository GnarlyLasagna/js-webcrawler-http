const {normalizeUrl} = require('./crawl.js')
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
