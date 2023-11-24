var r = ['0','0','0','0','0','0','0'];

function read(item, pollid) {
    eval("mylist."+item+"(pollid).call({from: '0x0000000000000000000000000000000000000000'})").then(function result(data){r = data});
    return r;
}
// pollid : String

var address = '0xc3e5ad11ae2f00c740e74b81f134426a3331d950';
//var address = '0x8466e6e218f0fe438ac8f403f684451d20e59ee3';
var pollid = '86'
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
        },
        {
            "inputs":[{"internalType":"uint256","name":"pollId","type":"uint256"}],
            "name":"votes",
            "outputs":[{"components":[{"internalType":"uint256","name":"comoAmount","type":"uint256"},{"internalType":"bytes32","name":"hash","type":"bytes32"}],
                        "internalType":"struct Governor.CommitData[]","name":"","type":"tuple[]"}],
            "stateMutability":"view","type":"function"
        }
    ];

var cand = 'candidates';
var remVot = 'remainingVotes';
var totVot = 'totalVotes';
var candVot = 'votesPerCandidates';
var listVot = 'votes';

var mylist = new new Web3Eth(new Web3HttpProvider("https://polygon-rpc.com")).Contract(myinstance,address).methods;

function p(l) {
    console.log(l)
}

function sum() {
    s = 0
    for (i=0;i<7;i++) {
        s += ln[i]
    }
    return s
}

function start() {
    alert('시작')
    l=[]
    intervalId = setInterval(() => lpush(), 2000);
}

function lpush() {
    ws = read(candVot,pollid)
    ws = ws.join()
    if (!(l.includes(ws))) {
        l.push(ws)
    }

    chart(ws)
}

function stop() {
    clearInterval(intervalId)
    for (i=0; i<l.length; i++) {
    $('#that').append("<p>"+l[i]+"</p>")
    }
}

function chart(ed) {
    ln=[]
    edl = ed.split(',')
    for (i=0; i<edl.length; i++) {
        ln.push(parseInt(edl[i])/(10**18))
    }
    // console.log("Engineered "+Math.round(ln[0])+" "+"▩".repeat(Math.round(ln[0]/250))+"▦".repeat(Math.round(ln[1]/250))+" "+Math.round(ln[1])+" Dreamy")

    //that.innerHTML = "School Sqaud "+Math.round(ln[0])+" "+"▩".repeat(Math.round(ln[0]/250))+"▦".repeat(Math.round(ln[1]/250))+" "+Math.round(ln[1])+" Engineered";
    $('#that').empty();
    $('#that').append("<p>"+"A : "+"■".repeat(Math.round(ln[0]/800))+" "+Math.round(ln[0])+"</p>");
    $('#that').append("<p>"+"B : "+"■".repeat(Math.round(ln[1]/800))+" "+Math.round(ln[1])+"</p>");
    $('#that').append("<p>"+"C : "+"■".repeat(Math.round(ln[2]/800))+" "+Math.round(ln[2])+"</p>");
    $('#that').append("<p>"+"D : "+"■".repeat(Math.round(ln[3]/800))+" "+Math.round(ln[3])+"</p>");
    $('#that').append("<p>"+"E : "+"■".repeat(Math.round(ln[4]/800))+" "+Math.round(ln[4])+"</p>");
    $('#that').append("<p>"+"F : "+"■".repeat(Math.round(ln[5]/800))+" "+Math.round(ln[5])+"</p>");
    $('#that').append("<p>"+"G : "+"■".repeat(Math.round(ln[6]/800))+" "+Math.round(ln[6])+"</p>");
    console.log(sum())
    //후보당 4만~5만 정도 득표할 때 사용하기 좋은 상태.
}

/*function topRank() {
    var rawVoteList = read(listVot,pollid);
    var voteList = [];

    for (i=0;i<rawVoteList.length;i++) {
        var como = parseInt(rawVoteList[i][0])/(10**18);
        if (como > 9) {
            voteList.push([como,i])
        }
    }
    voteList.sort(function(a, b) {
        return b[0] - a[0];
    })
    for (i=0; i<voteList.length; i++) {
        $('#that').append("<p>"+voteList[i][0]+"<span> "+rawVoteList[voteList[i][1]][1]+"</p>")
    }
}*/
// start()
