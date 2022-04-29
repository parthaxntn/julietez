import { TezosToolkit } from '@taquito/taquito';
import { importKey } from '@taquito/signer';

const Tezos = new TezosToolkit('https://ithacanet.ecadinfra.com/')

const contractAddress: string = 'KT1NXhDFK7kiBVC57Af9R36f5HREFpqvJEnW'

const FAUCET = {
	"pkh": "tz1YZoAUcoUeFVtaQwva2mQC8z5ZkiU1t5YT",
	"mnemonic": [
		"answer",
		"year",
		"field",
		"share",
		"whisper",
		"carpet",
		"build",
		"season",
		"recall",
		"believe",
		"transfer",
		"vacuum",
		"question",
		"grace",
		"begin"
	],
	"email": "zgcfpafg.oqgripqs@teztnets.xyz",
	"password": "QSNQNMT5Y0",
	"amount": "290494004",
	"activation_code": "1c6671c3b039177f6f488e21dcb56e1a47271125"
}


importKey(
    Tezos,
    FAUCET.email,
    FAUCET.password,
    FAUCET.mnemonic.join(' '),
    FAUCET.activation_code
  ).catch((e) => console.error(e));

const getStorage = async () => {
    const contract = await Tezos.contract.at(contractAddress);
    const storage = await contract.storage();
    console.log(storage);
    
    return storage
}

const transfer = async () => {
    const amount = 2;
    const address = 'tz1g43KFspS2tz39AGFWm2etRUEH1AWdZ4UG';
    
    console.log(`Transfering ${amount} ꜩ to ${address}...`);
    Tezos.contract
    .transfer({ to: address, amount: amount })
    .then((op) => {
    console.log(`Waiting for ${op.hash} to be confirmed...`);
    return op.confirmation(1).then(() => op.hash);
})
.then((hash) => console.log(`Operation injected: https://ithaca.tzstats.com/${hash}`))
.catch((error) => console.log(`Error: ${error} ${JSON.stringify(error, null, 2)}`));

}

const add = async (params: object) => {
    
    const contract = await Tezos.contract.at(contractAddress);
    console.log(contract.methods);
    const opHash = await contract.methods.add_blog(params).send();
    console.log(`waiting for ${opHash.hash} to be confirmed...`);
    const confirmation = await opHash.confirmation(1);
    console.log(`Operation injected: https://ithaca.tzstats.com/${opHash}`);
    
}

const main = async () => {
    
    // const storage = add({
    //     'heading':'h1',
    //     'dat':'date1',
    //     'tim':'tim1',
    //     'category':'cat1',
    //     'content':'con1'
    // });
    // console.log();
    const storage = getStorage()
    console.log(storage);
    
}

try{
    main()
}
catch (e) {
    console.error(e);
    
}