export class Station {
    constructor (
        readonly name : string,
        readonly plants : [{
            name : string
            amount: number
        }],
        readonly seedtime : Date,
        readonly description : string
    ) {}
}