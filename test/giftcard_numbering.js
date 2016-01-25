var assert = require("assert"); // node.js core module
var ospos = require("./ospos");

describe("giftcard numbering test", function () {
    this.timeout(25000);

    it("should be able to login",  function (done) {
        return ospos.login(this.browser, done);
    });

    it("issue #65: giftcard numbering should add properly", function() {
        return this.browser.get(ospos.url("/index.php/giftcards")).waitForElementByCss(".big_button").click()
            .waitForElementByName("value", 10000).type("100").elementById('giftcard_number').clear().type("10")
            .elementById("submit").click().waitForElementByXPath("//table/tbody/tr[td/text()='10']/td[4]", 2000).text().then(function (value) {
                assert.ok(value, "giftcard failed to be added properly!");
            }).elementByCss(".big_button").click().waitForElementByName("value", 4000).type("100").elementById("submit").click()
            .waitForElementByXPath("//table/tbody/tr[td/text()='11']/td[4]").text().then(function (value) {
                assert.equal(value, "11", "giftcard number not incrementing properly!!");
            });
    });

});
