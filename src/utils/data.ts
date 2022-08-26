import {TSection, SectionsType, SectionText, OrderStatusesText, OrderStatusesType} from "./types";

export const sections: Array<TSection> = [
    {
        text: SectionText[SectionsType.bun],
        typeId: SectionsType.bun,
    },
    {
        text: SectionText[SectionsType.sauce],
        typeId: SectionsType.sauce,
    },
    {
        text: SectionText[SectionsType.main],
        typeId: SectionsType.main,
    }
];

export const orderStatuses = {
    [OrderStatusesType.done]: {
        text: OrderStatusesText[OrderStatusesType.done],
        internalType: 'done',
        typeId: OrderStatusesType.done,
    },
    [OrderStatusesType.created]: {
        text: OrderStatusesText[OrderStatusesType.pending],
        internalType: 'pending',
        typeId: OrderStatusesType.created,
    },
    [OrderStatusesType.pending]: {
        text: null,
        internalType: 'pending',
        typeId: OrderStatusesType.pending,
    }
};