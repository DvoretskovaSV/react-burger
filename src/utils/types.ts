export type IngredientType = 'main' | 'bun' | 'sauce';

export enum SectionsType {
    bun = 'bun',
    sauce = 'sauce',
    main = 'main'
}

export enum SectionText {
    bun = 'Булки',
    sauce = 'Соусы',
    main = 'Начинки'
}

export enum OrderStatusesType {
    done = 'done',
    created = 'created',
    pending = 'pending'
}

export enum OrderStatusesText {
    done = 'Готовы',
    created = 'Создан',
    pending = 'В процессе'
}

export enum OrderStatusText {
    done = 'Выполнен',
    created = 'Создан',
    pending = 'В процессе'
}

export enum ConnectionStatus {
    pending = 'pending',
    open = 'open',
    close = 'close'
}

export type TSection = {
    text: SectionText;
    typeId: SectionsType;
}

export type TIngredient =  {
    _id: string;
    name: string;
    type: IngredientType;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    count?: number;
}

export type TConstructorIngredient = {
    uuid: string;
    id?: string;
}

export type TConstructorIngredientItem = TConstructorIngredient & TIngredient


export type TDetails = Pick<TIngredient, 'image_large' | 'name' | 'calories' | 'fat' | 'carbohydrates' | 'proteins'>;

export type TUser = {
    email: string | null;
    name: string | null;
}

export type Form = {
    [props: string]: any
}

export type TToken = {
    accessToken: string;
    refreshToken: string;
}

export type TOrder = {
    number?: string;
    name?: string;
}


export type TMessages = {
    [key: string] : string;
}

export type TFeedOrder = {
    createdAt: Date,
    ingredients: Array<string>,
    name: string,
    number: number,
    status: OrderStatusesType,
    updatedAt: Date,
    _id: string
};