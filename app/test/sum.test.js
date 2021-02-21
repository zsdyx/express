/*
 * @Descripttion: 自动化测试
 * @version: v1.0.0
 * @Author: zhaoshidong
 * @Date: 2021-02-21 16:33:36
 * @LastEditTime: 2021-02-21 16:35:23
 */
function sum(a, b) {
    return a + b;
}

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });