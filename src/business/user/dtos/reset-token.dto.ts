export class ResetTokenDto {
    constructor(obj: ResetTokenDto) {
        this.id = obj.id;
        this.exp = obj.exp;
    }

    public id: string;

    public exp: number;
}
