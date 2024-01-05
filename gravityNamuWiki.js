function comma(num) {
  var numString = String(num)
  if (numString.length < 4) {
    var freg = numString
  } else if (numString.length < 7) {
    var freg = [numString.slice(0,-3),numString.slice(-3)].join()
  } else {
    var freg = [numString.slice(0,-6),numString.slice(-6,-3),numString.slice(-3)].join()
  }
  
  return freg
}

function gravityResult(candList, pollResult) {
  for (item of pollResult) {
    item.push( parseInt( parseInt(item[1]) / 10**18 ) )
  }
  
  for (i in pollResult) {
    pollResult[i].push( candList[i] )
  }
  
  pollResult.sort(
    function (a,b) {
      return b[2] - a[2]
    }
  )
  
  var sum = 0
  for (item of pollResult) {
    sum += item[2]
  }
  
  var max = pollResult[0][2]
  for (item of pollResult) {
    item.push( Math.round( 1000 * item[2] / max ) / 10 )
    item.push( comma( item[2] ) )
    let pcnt = String( Math.round( 1000 * item[2] / sum ) / 10 )
    if (pcnt.length < 3) {
      pcnt += '.0'
    }
    item.push( pcnt )
  }
  
  var text = `{{{#!wiki style="word-break: keep-all"
||<tablewidth=100%><tablebordercolor=#000,#fff><tablebgcolor=#ffffff,#1f2023><bgcolor=#000> '''{{{#fff Event Gravity Result}}}''' ||
|| {{{#!wiki style="margin: 0 -10px -5px; min-height: 26px"
{{{#!folding [ 펼치기 · 접기 ]
{{{#!wiki style="margin: -6px -1px -11px"
||<tablewidth=100%><tablebgcolor=#ffffff,#1f2023><rowbgcolor=#000><rowcolor=#fff><width=50%> '''후보''' ||<width=50%> '''득표율''' ||
|| '''{{{#gold ${pollResult[0][3]}}}}''' || {{{#!wiki style="margin: 5px -10px 5px; padding: 1.5px 8px; background-image: linear-gradient(to right, #6e2cff 100%, transparent 0%)"
${pollResult[0][5]} (${pollResult[0][6]}%)}}} ||\n`
  for (item of pollResult.slice(1)) {
    text += `|| ${item[3]} || {{{#!wiki style="margin: 5px -10px 5px; padding: 1.5px 8px; background-image: linear-gradient(to right, #6e2cff ${item[4]}%, transparent 0%)"
${item[5]} (${item[6]}%)}}} ||\n`
  }
  text += `||<rowbgcolor=#000><rowcolor=#fff> '''총합''' || ${comma( sum )} ||
  }}}}}}}}} ||}}}`

  console.log(text)
  navigator.clipboard.writeText(text)
}
