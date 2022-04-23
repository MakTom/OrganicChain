const OrganicChain = artifacts.require("OrganicChain");

contract("OrganicChain", async accounts => {

 let organicChain;
 const ownerAccount = accounts[0];
 const userAccountOne = accounts[1];
 const userAccountTwo = accounts[2];

 beforeEach(async () => {
    organicChain = await OrganicChain.new({from: ownerAccount});
 })

 it("should create a user.", async () => {
   await organicChain.createUser("Mayank",userAccountOne,"Farmer");
   const user_name = await organicChain.searchUser(userAccountOne);
   assert.equal(user_name, "Mayank")
 });

//  it("should reject owner's bid.", async () => {
//    try {
//      await auction.makeBid({value: amount, from: ownerAccount});
//    } catch (e) {
//      assert.include(e.message, "Owner is not allowed to bid.")
//    }
//  });

//  it("should require higher bid amount.", async () => {
//    try {
//      await auction.makeBid({value: amount, from: userAccountOne});
//      await auction.makeBid({value: smallAmount, from: userAccountTwo});
//    } catch (e) {
//      assert.include(e.message, "Bid error: Make a higher Bid.")
//    }
//  });


//  it("should fetch highest bid.", async () => {
//    await auction.makeBid({value: amount, from: userAccountOne});
//    const highestBid = await auction.fetchHighestBid();
//    assert.equal(highestBid.bidAmount, amount)
//    assert.equal(highestBid.bidder, userAccountOne)
//  });

//  it("should fetch owner.", async () => {
//    const owner = await auction.getOwner();
//    assert.equal(owner, ownerAccount)
//  });

})