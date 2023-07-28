export class userDto {
    constructor(user){
        this.name = user.firstname
        this.surname = user.lastname
        this.old = user.age
        this.mail = user.email
        this.type = user.role
    }
}