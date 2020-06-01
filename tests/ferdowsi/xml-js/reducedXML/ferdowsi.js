var fs = require('fs')
var convert = require('xml-js')

fs.readFile('ferdowsi.xml', 'utf8', (err, data) => {
  if (err) throw err

  outPutJson(data)
})

const outPutJson = xml => {
  //    const writer = fs.createWriteStream('ferdowsi.json')
  const result1 = convert.xml2json(xml, { compact: true, spaces: 4 })
  //    writer.write(result1)
  const result2 = convert.xml2json(xml, { compact: false, spaces: 4 })
  //    writer.write(result2)
  fs.writeFile('ferdowsiCompact.json', result1, (err) => {
    if (err) throw err
    console.log('The compact file has been saved!')
  })
  fs.writeFile('ferdowsiFull.json', result2, (err) => {
    if (err) throw err
    console.log('The full file has been saved!')
  })
}
//  var result1 = convert.xml2json(xml, { compact: true, spaces: 4 })
//  var result2 = convert.xml2json(xml, { compact: false, spaces: 4 })
//  console.log('The first result: \n')
//  console.log(result1)
//  console.log('The second result: \n')
//  console.log(result2)
