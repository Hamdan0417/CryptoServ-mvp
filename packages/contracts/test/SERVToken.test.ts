import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('SERVToken', () => {
  it('mints initial supply to deployer', async () => {
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory('SERVToken');
    const token = await Token.deploy(owner.address, owner.address);
    await token.waitForDeployment();

    const balance = await token.balanceOf(owner.address);
    expect(balance).to.equal(ethers.parseEther('1000000'));
  });

  it('allows owner to update treasury and mint', async () => {
    const [owner, treasury, recipient] = await ethers.getSigners();
    const Token = await ethers.getContractFactory('SERVToken');
    const token = await Token.deploy(owner.address, owner.address);
    await token.waitForDeployment();

    await expect(token.connect(owner).setTreasury(treasury.address))
      .to.emit(token, 'TreasuryUpdated')
      .withArgs(treasury.address);

    await expect(token.connect(owner).mint(recipient.address, ethers.parseEther('10')))
      .to.emit(token, 'Transfer')
      .withArgs(ethers.ZeroAddress, recipient.address, ethers.parseEther('10'));

    await expect(token.connect(treasury).mint(recipient.address, ethers.parseEther('5')))
      .to.emit(token, 'Transfer')
      .withArgs(ethers.ZeroAddress, recipient.address, ethers.parseEther('5'));
  });
});
