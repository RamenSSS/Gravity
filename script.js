function read(item, pollid) {
    await new new Web3Eth(new Web3HttpProvider("https://polygon-rpc.com")).Contract(
        [
            // 다른 항목도 가져와야함
            {"inputs":[{"internalType":"uint256","name":"pollId","type":"uint256"}],
            "name":"votesPerCandidates","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],
            "stateMutability":"view","type":"function"}
        ],'0xc3e5ad11ae2f00c740e74b81f134426a3331d950').methods.votesPerCandidates(pollid).call({from: '0x0000000000000000000000000000000000000000'})
