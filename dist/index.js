"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const taquito_1 = require("@taquito/taquito");
const signer_1 = require("@taquito/signer");
const Tezos = new taquito_1.TezosToolkit('https://ithacanet.ecadinfra.com/');
const contractAddress = 'KT1NXhDFK7kiBVC57Af9R36f5HREFpqvJEnW';
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
};
(0, signer_1.importKey)(Tezos, FAUCET.email, FAUCET.password, FAUCET.mnemonic.join(' '), FAUCET.activation_code).catch((e) => console.error(e));


const getStorage = () => __awaiter(void 0, void 0, void 0, function* () {
    const contract = yield Tezos.contract.at(contractAddress);
    const storage = yield contract.storage();
    // console.log(storage);
    return storage;
});


function rendering(params){
    const express = require('express');
  
    // Initialize App
    const app = express();
    // app.use('./static', express.static('static'));
    app.use(express.static('static'))


    // var test = {heading: '12'}
    // console.log(params);
    
    // Assign route
    app.get('/', (req, res, next) => {
    //   res.render('../templates/index.pug', { name: params, age: 21 });
    res.render('../templates/index.pug');
    });

    app.get('/blogs', (req, res, next) => {
    //   res.render('../templates/index.pug', { name: params, age: 21 });
    params['length'] = params.heading.length
    res.render('../templates/blogs.pug', params);
    });
  
    app.get('/test', (req, res, next) => {
    //   res.render('../templates/index.pug', { name: params, age: 21 });
    params['length'] = params.heading.length
    res.render('../templates/index.html', params);
    });
    
    app.get('/page/:n', (req, res, next) => {
        var page_no = req.params.n;
        // console.log(page_no);
    //   res.render('../templates/index.pug', { name: params, age: 21 });
    params['num'] = page_no
    res.render('../templates/page.pug', params);
    });
    
    // Start server
    // app.listen(5000, () => {
    // console.log('App listening on port 5000');
    app.listen(process.env.PORT, () => {
    console.log('App listening on port' + process.env.PORT);
});

// app.listen()

}



async function main(){
    const storage = await getStorage();
    rendering(storage)
    // console.log(storage);
}


try {
    main();
}
catch (e) {
    console.error(e);
}
