const chai = require("chai");

const assert = chai.assert;

describe("Demo testing", () => {
  beforeEach("checking database connection", () => {
    // need to add db instance to check
    assert.isTrue(true);
  });

  it("Test 1", () => {
    var checkValue = true;
    assert.equal(checkValue, true);
  });
});
