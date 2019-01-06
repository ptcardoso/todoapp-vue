export enum TodoState {
    DONE = 'done',
    DOING = 'doing',
    IDLE = 'idle'
}
export interface ITodo {
    id?: string|number;
    title: string;
    state?: TodoState;
}
export class Todo implements ITodo {
    id: string|number;
    title: string;
    state: TodoState;

    constructor(props: ITodo) {
        this.id = props.id || ++Todo.globalId;
        this.title = props.title;
        this.state = props.state || TodoState.IDLE;
    }

    get isDone(): boolean {
        return this.state === TodoState.DONE;
    }

    set isDone(done: boolean) {
        this.state = done ? TodoState.DONE : TodoState.IDLE;
    }

    static globalId : number = 0;
}
