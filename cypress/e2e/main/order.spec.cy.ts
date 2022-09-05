import {INGREDIENT_ITEM, INGREDIENT_SECTION} from "../../selectors/ingredients.sel";
import {
    BUTTON_ORDER,
    CONSTRUCTOR, CONSTRUCTOR_ITEM,
    CONSTRUCTOR_ITEM_FIRST,
    CONSTRUCTOR_ITEM_LAST,
    CONSTRUCTOR_MAIN_INGREDIENTS
} from "../../selectors/constructor.sel";
import {LOGIN_URL} from "../../../src/utils/constants";
import {MODAL, OVERLAY} from "../../selectors/modal.sel";
import {ORDER_IDENTIFIER} from "../../selectors/elements.sel";

describe('add ingredients to order', () => {
    before(() => {
        cy.visit('/');
    });

    beforeEach(() => {
        cy.get(INGREDIENT_ITEM);
    });

    it("drag ingredient bun", () => {
        cy.get(INGREDIENT_ITEM).first().as('firstItem');
        cy.get(CONSTRUCTOR);

        cy.get('@firstItem').trigger('dragstart');
        cy.get(CONSTRUCTOR).trigger('drop');

        cy.get(CONSTRUCTOR)
            .find(CONSTRUCTOR_ITEM_FIRST)
            .should('have.length', 1);

        cy.get(CONSTRUCTOR)
            .find(CONSTRUCTOR_ITEM_LAST)
            .should('have.length', 1);

        cy.get(INGREDIENT_ITEM)
            .first()
            .get('p')
            .should('contain', '1');

        cy.get(INGREDIENT_ITEM)
            .eq(1)
            .trigger('dragstart');

        cy.get(CONSTRUCTOR)
            .trigger('drop');

        cy.get(CONSTRUCTOR)
            .find(CONSTRUCTOR_ITEM_FIRST)
            .should('have.length', 1);

        cy.get(CONSTRUCTOR)
            .get(CONSTRUCTOR_ITEM_LAST)
            .should('have.length', 1);

        cy.get(INGREDIENT_ITEM)
            .eq(1)
            .find('p')
            .eq(0)
            .should('contain', '1');

        cy.get('@firstItem').find('p').should('not.exist');
    });

    it("drag ingredient main", () => {
        cy.get(CONSTRUCTOR);

        cy.get(INGREDIENT_ITEM).eq(4).trigger('dragstart');
        cy.get(CONSTRUCTOR).trigger('drop');

        cy.get(CONSTRUCTOR)
            .find(CONSTRUCTOR_MAIN_INGREDIENTS)
            .find(CONSTRUCTOR_ITEM)
            .should('have.length', 1);

        cy.get(INGREDIENT_ITEM).eq(4)
            .find('p')
            .eq(0)
            .should('contain', '1');

        cy.get(INGREDIENT_ITEM).eq(5).trigger('dragstart');
        cy.get(CONSTRUCTOR).trigger('drop');

        cy.get(CONSTRUCTOR)
            .find(CONSTRUCTOR_MAIN_INGREDIENTS)
            .find(CONSTRUCTOR_ITEM)
            .should('have.length', 2);

        cy.get(INGREDIENT_ITEM).eq(4).trigger('dragstart');
        cy.get(CONSTRUCTOR).trigger('drop');

        cy.get(INGREDIENT_ITEM).eq(4)
            .find('p')
            .eq(0)
            .should('contain', '2');

        cy.get(CONSTRUCTOR)
            .find(CONSTRUCTOR_MAIN_INGREDIENTS)
            .find(CONSTRUCTOR_ITEM)
            .should('have.length', 3);
    });

    it("drag ingredient past", () => {
        cy.get(CONSTRUCTOR);

        cy.get(INGREDIENT_ITEM).eq(5).trigger('dragstart');
        cy.get(INGREDIENT_SECTION).trigger('drop');

        cy.get(CONSTRUCTOR)
            .find(CONSTRUCTOR_MAIN_INGREDIENTS)
            .find(CONSTRUCTOR_ITEM)
            .should('have.length', 3);
    });
});


describe('order', () => {
    beforeEach(() => {
        cy.intercept('POST', LOGIN_URL, { fixture: 'auth.json' });
        cy.intercept('POST', 'api/orders', { fixture: 'orders.json' });
    });

    it("make order", () => {
        cy.get(BUTTON_ORDER).find('button').click();

        cy.fixture('auth').then((auth: { user: {email: string; password: string; }}) => {
            cy.get('[name="email"]').type(auth.user.email);
            cy.get('[name="password"]').type(auth.user.password);
            cy.get('button').click();

            cy.get(BUTTON_ORDER).find('button').click();

            cy.get(OVERLAY);
            cy.get(OVERLAY).find(MODAL);

            cy.get(MODAL).find(ORDER_IDENTIFIER);
            cy.get(MODAL).should('contain', '12345');

            cy.get(CONSTRUCTOR);

            cy.get(CONSTRUCTOR)
                .find(CONSTRUCTOR_ITEM)
                .should('have.length', 0);

            cy.get(OVERLAY).click('topLeft');
            cy.get(OVERLAY).should('not.exist');

            cy.get(CONSTRUCTOR)
                .find(CONSTRUCTOR_ITEM_FIRST)
                .should('have.length', 0);

            cy.get(CONSTRUCTOR)
                .find(CONSTRUCTOR_ITEM_LAST)
                .should('have.length', 0);
        });
    });
});