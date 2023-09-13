var r = '';

function read(item, pollid) {
    eval("mylist."+item+"(pollid).call({from: '0x0000000000000000000000000000000000000000'})").then(function result(data){r = data});
    return r;
}
// pollid : String

var address = '0xc3e5ad11ae2f00c740e74b81f134426a3331d950';
var myinstance = [
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
    ];

var cand = 'candidates';
var remVot = 'remainingVotes';
var totVot = 'totalVotes';
var candVot = 'votesPerCandidates';

var mylist = new new Web3Eth(new Web3HttpProvider("https://polygon-rpc.com")).Contract(myinstance,address).methods;

function p(l) {
    console.log(l)
}

function start() {
    l=[]
    intervalId = setInterval(() => lpush(), 2000);
}

function lpush() {
    ws = read(candVot,'83')
    ws = ws[0]+','+ws[1]
    if (!(l.includes(ws))) {
        l.push(ws)
    }

    chart(ws)
}

function stop() {
    clearInterval(intervalId)
}

function chart(ed) {
    ln=[]
    edl = ed.split(',')
    for (i=0; i<edl.length; i++) {
        ln.push(parseInt(edl[i])/(10**18))
    }
    console.log("Engineered "+Math.round(ln[0])+" "+"▩".repeat(Math.round(ln[0]/250))+"▦".repeat(Math.round(ln[1]/250))+" "+Math.round(ln[1])+" Dreamy")
}

// start()
