import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('SERVToken', () => {
  it('mints initial supply to deployer', async () => {
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory('SERVToken');
    const token = await Token.deploy(owner.address);
    await token.waitForDeployment();

    const balance = await token.balanceOf(owner.address);
    expect(balance).to.equal(ethers.parseEther('1000000'));
  });
});
