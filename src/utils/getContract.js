import Web3 from 'web3'
import { address, ABI } from './constants/contract'

const getContract = new Promise((resolve, reject) => {
  const web3 = new Web3(window.web3.currentProvider)
  const contract = web3.eth.contract(ABI)
  const contractInstance = contract.at(address)
  resolve(contractInstance)
})

export default getContract
