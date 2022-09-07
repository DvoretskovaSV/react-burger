import {INGREDIENT_ITEM} from "../../selectors/ingredients.sel";
import {CLOSE_ICON, MODAL, OVERLAY} from "../../selectors/modal.sel";

describe('modal', () => {
    before(() => {
        cy.visit('/');
    });

    it("open and close on click", () => {
        cy.get(INGREDIENT_ITEM).then((options: any) => {
            cy.get(Cypress._.sample([...options])).click()
        });

        cy.get(OVERLAY);
        cy.get(OVERLAY).find(MODAL);
        cy.get(OVERLAY)
            .find(MODAL)
            .find('[data-cy="ingredient-details"]');

        cy.get(OVERLAY).click('topRight');
        cy.get(OVERLAY).should('not.exist');
    });

    it("open and close by ESC", () => {
        cy.get(INGREDIENT_ITEM).then((options: any) => {
            cy.get(Cypress._.sample([...options])).click()
        });

        cy.get(OVERLAY);
        cy.get('body').type('{esc}');
        cy.get(OVERLAY).should('not.exist');
    });

    it("open and close by close icon", () => {
        cy.get(INGREDIENT_ITEM).then((options: any) => {
            cy.get(Cypress._.sample([...options])).click()
        });

        cy.get(OVERLAY);
        cy.get(OVERLAY).find(MODAL).find(CLOSE_ICON).click();
        cy.get(OVERLAY).should('not.exist');
    });
});