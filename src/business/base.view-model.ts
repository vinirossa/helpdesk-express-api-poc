export interface BaseIdViewModel {
    id: string
}

export interface BaseViewModel extends BaseIdViewModel {
    active: boolean;

    createdAt: Date;

    createdBy: string | null;
}
