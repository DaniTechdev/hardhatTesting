//TESTIGN THE CONTRACT

const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");

// console.log(time);
// console.log(loadFixture);

// console.log(time.days);

const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
// console.log(anyValue);
//loadfixture allows us to run the functon over and over again

//we will import the (expect) and it will help us to do the comparism in our deployed contract and in our test value to see if they are the same

const { expect } = require("chai");
const { ethers } = require("hardhat");
// console.log(expect);

//decribe keyword

describe("MyTest", function () {
  async function runEveryTime() {
    const ONE_YEAR_IN_SECONDS = 356 * 24 * 60 * 60;
    const ONE_GWEI = 1_000_000_000;

    const lockedAmount = ONE_GWEI;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECONDS;

    // console.log(ONE_YEAR_IN_SECONDS, ONE_GWEI);
    // console.log(unlockTime);

    const [owner, otherAccount] = await ethers.getSigners();
    // console.log(owner);
    // console.log(otherAccount);

    const MyTest = await ethers.getContractFactory("MyTest");
    const myTest = await MyTest.deploy(unlockTime, { value: lockedAmount });

    // console.log(myTest, unlockTime, lockedAmount, owner);
    return { myTest, unlockTime, lockedAmount, owner, otherAccount };
  }

  //describe help usse to check for a specifuc condition we want to update in our ssmart contract;
  describe("Deployment", async function () {
    it("should check unlocked time", async function () {
      const { myTest, unlockTime } = await loadFixture(runEveryTime);

      //   console.log(unlockTime);
      //   console.log(myTest);

      expect(await myTest.unlockedTime()).to.be.equal(unlockTime);
    });
  });
  runEveryTime();
});
