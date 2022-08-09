export interface BaseModel {
    id: string;

    createdAt: Date;

    createdBy: string | null;

    updatedAt: Date | null;

    updatedBy: string | null;
}

export interface BaseActiveModel extends BaseModel {
    active: boolean;
}
