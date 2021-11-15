describe("Hide", () => {
    it("Hide", () => {
        cy.visit("http://localhost:9000/hide")
            .then(() => {
                cy.get("#slide-right-check").click();
                
                cy.wait(800);
                
                cy.get("#slide-right").toMatchImageSnapshot();
                cy.get("#slide-right-box").should('not.exist');
            })
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
            })
    });
});