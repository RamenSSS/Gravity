var r = ['0','0'];

function read(item, pollid) {
    eval("mylist."+item+"(pollid).call({from: '0x0000000000000000000000000000000000000000'})").then(function result(data){r = data});
    return r;
}
// pollid : String

//var address = '0xc3e5ad11ae2f00c740e74b81f134426a3331d950';
var address = '0x8466e6e218f0fe438ac8f403f684451d20e59ee3';
var pollid = '3'
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
    alert('시작')
    l=[]
    intervalId = setInterval(() => lpush(), 2000);
}

function lpush() {
    ws = read(candVot,pollid)
    ws = ws[0]+','+ws[1]+','+ws[2]+','+ws[3]
    if (!(l.includes(ws))) {
        l.push(ws)
    }

    chart(ws)
}

function stop() {
    clearInterval(intervalId)
    for (i=0; i<l.length; i++) {
    $('#that').append("beforeend","<p>"+l[i]+"</p>")
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
    $('#that').append("<p>"+"■".repeat(Math.round(ln[0]/400))+" "+Math.round(ln[0])+" Air Force One"+"</p>");
    $('#that').append("<p>"+"■".repeat(Math.round(ln[1]/400))+" "+Math.round(ln[1])+" Je Ne Sais Quoi"+"</p>");
    $('#that').append("<p>"+"■".repeat(Math.round(ln[2]/400))+" "+Math.round(ln[2])+" Sweet Crazy Love"+"</p>");
    $('#that').append("<p>"+"■".repeat(Math.round(ln[3]/400))+" "+Math.round(ln[3])+" Girl Front"+"</p>");
}
    
// start()
