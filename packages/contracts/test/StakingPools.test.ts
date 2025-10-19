import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('StakingPools', () => {
  it('allows staking and withdrawal after lock period', async () => {
    const [owner, user] = await ethers.getSigners();
    const Token = await ethers.getContractFactory('SERVToken');
    const token = await Token.deploy(owner.address, owner.address);
    await token.waitForDeployment();

    const Pools = await ethers.getContractFactory('StakingPools');
    const pools = await Pools.deploy(await token.getAddress(), owner.address);
    await pools.waitForDeployment();

    await token.connect(owner).mint(user.address, ethers.parseEther('100'));
    await token.connect(user).approve(await pools.getAddress(), ethers.parseEther('100'));

    const tx = await pools.connect(owner).createPool(1);
    const receipt = await tx.wait();
    const poolId = receipt?.logs[0]?.args?.poolId ?? 0n;

    await pools.connect(user).stake(poolId, ethers.parseEther('10'));
    expect(await token.balanceOf(await pools.getAddress())).to.equal(ethers.parseEther('10'));

    await ethers.provider.send('evm_increaseTime', [2]);
    await ethers.provider.send('evm_mine', []);

    await pools.connect(user).withdraw(poolId, ethers.parseEther('5'));
    expect(await token.balanceOf(user.address)).to.be.greaterThanOrEqual(ethers.parseEther('95'));
    const stake = await pools.getStake(user.address, poolId);
    expect(stake[0]).to.equal(ethers.parseEther('5'));
  });
});
