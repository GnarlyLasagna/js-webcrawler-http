const {sortPages} = require('./report.js')
const {test, expect} = require('@jest/globals')

test('sortPages', ()=>{
    const input = {
        "https://testagain.com":2,
        "https://test.com":3,
        "https://test/33.com":9,
    }
    const actual = sortPages(input)
    const expected = [
        ["https://test/33.com", 9],
        ["https://test.com", 3],
        ["https://testagain.com", 2],
    ]

    expect(actual).toEqual(expected)
}) 


