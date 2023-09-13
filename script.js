function read(item, pollid) {
    // await new new Web3Eth(new Web3HttpProvider("https://polygon-rpc.com")).Contract(myinstance,address).methods.votesPerCandidates(pollid).call({from: '0x0000000000000000000000000000000000000000'})
    new Function("mylist."+item+"(pollid).call({from: '0x0000000000000000000000000000000000000000'})")
}

var address = '0xc3e5ad11ae2f00c740e74b81f134426a3331d950'
var myinstance =
    [
        {
            "inputs":[{"internalType":"uint256","name":"pollId","type":"uint256"}],
             "name":"candidates",
             "outputs":[{"internalType":"string[]","name":"","type":"string[]"}],
             "stateMutability":"view","type":"function"
        },
        {
            "inputs":[{"internalType":"uint256","name":"pollId","type":"uint256"}],
            "name":"remainingVotes",
            "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
            "stateMutability":"view","type":"function"
        },
        {
            "inputs":[{"internalType":"uint256","name":"pollId","type":"uint256"}],
            "name":"totalVotes",
            "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
            "stateMutability":"view","type":"function"
        },
        {
            "inputs":[{"internalType":"uint256","name":"pollId","type":"uint256"}],
            "name":"votesPerCandidates",
            "outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],
            "stateMutability":"view","type":"function"
        }
    ]

var mylist = new Web3Eth(new Web3HttpProvider("https://polygon-rpc.com")).Contract(myinstance,address).methods;

var cand = "candidates";
var remVote = "remainingVotes";
var totVote = "totalVotes";
var candVote = "votesPerCandidates";
