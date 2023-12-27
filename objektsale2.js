function sale(index,member,collection) {
const id = ['cream01',member,collection].join('-')
fetch(
    `https://squid.subsquid.io/cosmo/graphql`,
                        {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        query: `query {
  objektsConnection(orderBy: id_ASC, where: {collection: {id_eq: "${id}"}}) {
    totalCount
  }
}`
    })
}).then(async (res) => {
const json = await res.json()
const data = json.data.objektsConnection

const count = data.totalCount
var num = String(parseInt(index)+1).padStart(2,'0')
l[`S${num}-${collection}`]=count
})
}

mems = ['seoyeon','hyerin','jiwoo','chaeyeon','yooyeon','soomin','nakyoung','yubin','kaede','dahyun','kotone','yeonji','nien','sohyun','xinyu','mayu','lynn','joobin','hayeon','shion']
//mems=['seoyeon','hyerin']
l={}

for (index in mems) {
  console.log(sale(index,mems[index],'311z'))
  console.log(sale(index,mems[index],'312z'))
  console.log(sale(index,mems[index],'313z'))
}

console.log(l)

csv = ''
for (num=1; num<21; num++) {
num = String(num).padStart(2,'0')
csv += l[`S${num}-311z`]+','
csv += l[`S${num}-312z`]+','
csv += l[`S${num}-313z`]+'\n'
}
