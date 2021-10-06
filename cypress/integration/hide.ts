describe("Hide", () => {
    it("Slide right", () => {
        cy.visit("http://localhost:9000/show-hide")
            .then(() => {
                cy.get("#slide-right_check").click();
                cy.wait(800);
                cy.get("#slide-right")
                    .toMatchImageSnapshot();
            })
    });
});