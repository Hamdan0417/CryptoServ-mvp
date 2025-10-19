import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Placeholder', function () {
  it('returns the project slug', async function () {
    const factory = await ethers.getContractFactory('Placeholder');
    const contract = await factory.deploy();
    await contract.waitForDeployment();
    expect(await contract.ping()).to.equal('crypto-serv');
  });
});
