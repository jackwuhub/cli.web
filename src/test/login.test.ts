export const replaceLocation = (path:string) => {
    return path.replace(/^(?!\/)|(\/{2,})/g, '/')
}
test('测试重定向地址正则', () => {
    const received = replaceLocation('testPage')
    const expected = '/testPage'
    expect(received).toStrictEqual(expected)
})
