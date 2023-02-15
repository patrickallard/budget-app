export class Budget {
    constructor (
        public id: number,
        public name: string,
        public associate: number[] = [],
        public total: number
    ) { }
}