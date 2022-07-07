import { sum } from './tasks'
import { sub } from './tasks'
import { div } from './tasks'
import { mult } from './tasks'




test('sum', () => {
    //1. Тестовые данные
    const salary: number = 800
    const n: number = 200
    //2. Выполнение тестирования кода:
    const result = sum(salary, n)
    //3. проверка результата
    expect(result).toBe(1000)

})

test('sub', () => {

    expect(sub(1200, 200)).toBe(1000)
    expect(sub(200, 200)).toBe(0)

})

test('div', () => {

    expect(div(1200, 2)).toBe(600)
    expect(div(100, 2)).toBe(50)

})

test('mult', () => {

    expect(mult(1200, 2)).toBe(2400)
    expect(mult(100, 2)).toBe(200)
})

