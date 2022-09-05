import {INGREDIENT_ITEM} from "../../selectors/ingredients.sel";

describe('service is available', () => {
    it('page loaded', () => {
        cy.visit('/');
    });

    it("ingredients are ready", () => {
        cy.get(INGREDIENT_ITEM);
    });
});
