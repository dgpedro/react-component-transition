describe("Show / Hide", () => {
    it("Slide right", () => {
        cy.visit("http://localhost:9000/show-hide")
            .then(() => {
                cy.get("#show-hide_slide-right_check").click();
                cy.wait(1500);
                cy.get("#show-hide_slide-right")
                    .toMatchImageSnapshot();
            })
    });
});