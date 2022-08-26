type IngredientType = 'main' | 'bun' | 'sauce';

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