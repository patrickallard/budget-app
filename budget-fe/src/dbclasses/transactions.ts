export class Transactions {
    constructor (
        public id: number,
        public date: Date,
        public account: string,
        public budget: string | null,
        public source: string | null, // this refers to the ID of an account
        public desintaion: string | null, // this refers to the ID of an account
        // either sourceId or destId must exist
        public withdrawlDebits: number
    ) { }
}