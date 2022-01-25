describe("Hide", () => {
    it("Hide", () => {
        cy.visit("http://localhost:9000/hide")
            .then(() => {
                cy.get("#slide-right-check").click();
                cy.wait(800);

                cy.get("#slide-right").toMatchImageSnapshot();
                cy.get("#slide-right-box").should('not.exist');
            });
    });

    it("Show", () => {
        cy.visit("http://localhost:9000/hide")
            .then(() => {
                cy.get("#slide-right-check").click();
                cy.wait(1100);
                cy.get("#slide-right-check").click();
                cy.wait(300);

                cy.get("#slide-right").toMatchImageSnapshot();
                cy.get("#slide-right-box").should('exist');
            });
    });

    it("Show when exit didn't finished", () => {
        cy.visit("http://localhost:9000/hide")
            .then(() => {
                cy.get("#slide-right-check").click();
                cy.wait(600);
                cy.get("#slide-right-check").click();
                cy.wait(700);

                cy.get("#slide-right").toMatchImageSnapshot();
                cy.get("#slide-right-box").should('exist');
            });
    });

    it("Click even number of times", () => {
        cy.visit("http://localhost:9000/hide")
            .then(() => {
                cy.get("#slide-right-check").click();
                cy.wait(10);
                cy.get("#slide-right-check").click();
                cy.get("#slide-right-check").click();
                cy.wait(20);
                cy.get("#slide-right-check").click();
                
                cy.get("#slide-right").toMatchImageSnapshot();
                cy.wait(900);

                cy.get("#slide-right").toMatchImageSnapshot();
                cy.get("#slide-right-box").should('exist');
            });
    });

    it("Click odd number of times", () => {
        cy.visit("http://localhost:9000/hide")
            .then(() => {
                cy.get("#slide-right-check").click();
                cy.wait(10);
                cy.get("#slide-right-check").click();
                cy.get("#slide-right-check").click();
                
                cy.get("#slide-right").toMatchImageSnapshot();
                cy.wait(900);

                cy.get("#slide-right").toMatchImageSnapshot();
                cy.get("#slide-right-box").should('not.exist');
            });
    });
});