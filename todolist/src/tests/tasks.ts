



export const sum = (salary: number, n: number) => salary + n
export const sub = (salary: number, n: number) => salary - n
export const div = (salary: number, n: number) => salary / n
export const mult = (salary: number, n: number) => salary * n


export type ActionType = {
    type: "SUM",
    n: number
}

export type StateType = number

export const salaryReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case "SUM":
            return state + action.n
        default:
            return state
    }
}
