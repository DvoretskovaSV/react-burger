import {TSection, SectionsType, SectionText} from "./types";


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