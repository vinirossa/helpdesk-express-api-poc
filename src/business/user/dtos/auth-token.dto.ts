export class AuthTokenDto {
    constructor(obj: AuthTokenDto) {
        this.id = obj.id;
        this.exp = obj.exp;
    }

    public id: string;

    public exp: number;
}
