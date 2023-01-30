const sut = require('./index')

/*
// 테스트 내용
test('sut transforms "hello  world" to "hello world"', ()=>{
    // 테스트 케이스
    const actual = sut("hello  world")
    // 테스트 케이스를 사용하여 실행했을 때 기대하는 결과값
    expect(actual).toBe("hello world")
})

test('sut transforms "hello    world" to "hello world"', ()=>{
    const actual = sut("hello    world")
    expect(actual).toBe("hello world")
})

test('sut transforms "hello   world" to "hello world"', ()=>{
    const actual = sut("hello   world")
    expect(actual).toBe("hello world")
})

// 위 내용을 아래와 같이 간소화할 수 있다
test('sut correctly works', ()=>{
    for(const source of ['hello  world', 'hello   world', 'hello    world']){
        const actual = sut(source)
        expect(actual).toBe('hello world')
    }
})
// 테스트 코드 작성 비용은 줄어들었지만, 어떤 케이스가 테스트에 실패했는지 알 수 없고 반복문 실행 중애 실패할 경우 그 뒤의 케이스들은 테스트를 실행하지 않는 문제가 있다.
*/

// jest parameterize 를 사용하여 위 문제 해결 가능
// test data table 작성
test.each`
    source | expected 
    ${"hello  world"} | ${"hello world"}
    ${"hello   world"} | ${"hello world"}
    ${"hello    world"} | ${"hello world"}
    ${"hello     world"} | ${"hello world"}
    ${"hello      world"} | ${"hello world"}
    ${"hello       world"} | ${"hello world"}
`('sut transforms "$source" to "$expected"', ({source, expected})=>{
    const actual = sut(source)
    expect(actual).toBe(expected)
})

test.each`
    source | expected
    ${"hello\t world"} | ${"hello world"}
    ${"hello \tworld"} | ${"hello world"}
`('sut transforms "$source" that contains tab character to "$expected"', ({source, expected})=>{
    const actual = sut(source)
    expect(actual).toBe(expected)
})

// 금지어를 지정하여 마스킹 처리(숨김)
test.each`
    source | bannedWords | expected
    ${"hello mockist"} | ${["mockist", "purist"]} | ${"hello *******"}
    ${"hello purist"} | ${["mockist", "purist"]} | ${"hello ******"}
`('sut transforms "$source" to "$expected"', ({source, bannedWords, expected})=>{
    const actual = sut(source, {bannedWords})

    expect(actual).toBe(expected)
})
const faker = require("faker")
describe('given banned word', ()=>{
    // faker 를 사용하여 금지어 생성
    const bannedWord = faker.lorem.word()
    const source = "hello " + bannedWord
    const expected = "hello " + "*".repeat(bannedWord.length)

    test('${bannedWord} when invoke sut then it returns ${expected}', ()=>{
        const actual = sut(source, {bannedWords: [bannedWord]})
        expect(actual).toBe(expected)
    })
})
