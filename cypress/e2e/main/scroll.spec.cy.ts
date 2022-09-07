import {
    INGREDIENT_ITEM,
    INGREDIENT_SECTION, INGREDIENT_SECTION_ACTIVE,
    INGREDIENT_SECTION_BUN,
    INGREDIENT_SECTION_MAIN, INGREDIENT_SECTION_NOT_ACTIVE,
    TABS
} from "../../selectors/ingredients.sel";
import {ATTR} from "../../selectors/elements.sel";

describe('scroll main', () => {
    before(() => {
        cy.visit('/');
    });

    it("highlighting the active element", () => {
        cy.get(INGREDIENT_ITEM);
        cy.get(INGREDIENT_SECTION);
        cy.get(TABS);

         cy.get(INGREDIENT_SECTION)
             .find(INGREDIENT_SECTION_MAIN)
             .scrollIntoView();

         cy.wait(1000);

         cy.get(TABS)
            .find('div')
            .eq(1)
            .find(`[${ATTR}]`)
            .should('have.attr', ATTR, INGREDIENT_SECTION_ACTIVE);

        cy.get(INGREDIENT_SECTION)
            .find(INGREDIENT_SECTION_BUN)
            .scrollIntoView();

        cy.wait(1000);

        cy.get(TABS)
            .find('div')
            .eq(0)
            .find(`[${ATTR}]`)
            .should('have.attr', ATTR, INGREDIENT_SECTION_ACTIVE);

        cy.get(TABS)
            .find('div')
            .eq(1)
            .find(`[${ATTR}]`)
            .should('have.attr', ATTR, INGREDIENT_SECTION_NOT_ACTIVE);
    });
});