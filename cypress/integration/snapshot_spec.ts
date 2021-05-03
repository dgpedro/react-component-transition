describe("Tests", () => {
    it("Snapshot", () => {
        cy.visit("http://localhost:8080/react-component-transition/show-hide")
            .then(() => {
                cy.get("#slide-up-button").click();
                cy.wait(500);
                cy.get(".slide-up-container")
                    .toMatchImageSnapshot();
            })
    });
});