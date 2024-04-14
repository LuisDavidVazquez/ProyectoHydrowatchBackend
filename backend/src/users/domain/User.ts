export class User {
    constructor(
        readonly email : string,
        readonly password : string,
        readonly data : {
            name : string,
            lastname : string,
            role : string
        }
    ){}
}