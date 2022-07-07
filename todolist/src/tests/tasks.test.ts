import { ActionType, salaryReducer, StateType, sum } from './tasks'
import { sub } from './tasks'
import { div } from './tasks'
import { mult } from './tasks'




test.skip('sum', () => {
    //1. Тестовые данные
    const salary: number = 800
    const n: number = 200
    //2. Выполнение тестирования кода:
    const result = sum(salary, n)
    //3. проверка результата
    expect(result).toBe(1000)

})
test.skip('sub', () => {

    expect(sub(1200, 200)).toBe(1000)
    expect(sub(200, 200)).toBe(0)

})
test.skip('div', () => {

    expect(div(1200, 2)).toBe(600)
    expect(div(100, 2)).toBe(50)

})
test.skip('mult', () => {

    expect(mult(1200, 2)).toBe(2400)
    expect(mult(100, 2)).toBe(200)
})
test.skip('case SUM of salaryReducer', ()=>{
    const salary: StateType =800
    const action: ActionType ={
        type: "SUM",
        n: 200
    }
    const result = salaryReducer(salary, action)


    expect(result).toBe(1000)
})
test.skip('case SUB of salaryReducer', ()=>{
    const salary: StateType =800
    const action: ActionType ={
        type: "SUB",
        n: 200
    }
    const result = salaryReducer(salary, action)


    expect(result).toBe(600)
})
test.skip('case DIV of salaryReducer', ()=>{
    const salary: StateType =800
    const action: ActionType ={
        type: "DIV",
        n: 200
    }
    const result = salaryReducer(salary, action)


    expect(result).toBe(4)
})
test('case MULT of salaryReducer', ()=>{
    const salary: StateType =800
    const action: ActionType ={
        type: "MULT",
        n: 2
    }
    const result = salaryReducer(salary, action)


    expect(result).toBe(1600)
})
