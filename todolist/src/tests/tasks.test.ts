import {sum} from './tasks'


test('sum', ()=>{
    //1. Тестовые данные
    const salary: number =800
    const n: number =200
    //2. Выполнение тестирования кода:
    const result =sum(salary,n)
    //3. проверка результата
expect(result).toBe(1000)

})
