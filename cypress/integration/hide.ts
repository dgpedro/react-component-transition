describe("Hide", () => {
    it("Slide right", () => {
        cy.visit("http://localhost:9000/show-hide")
            .then(() => {
                cy.get("#slide-right-check").click();
                
                cy.wait(800);
                
                cy.get("#slide-right").toMatchImageSnapshot();
                cy.get("#slide-right").contains("#slide-right-box").should('not.exist');
            })
    });
});