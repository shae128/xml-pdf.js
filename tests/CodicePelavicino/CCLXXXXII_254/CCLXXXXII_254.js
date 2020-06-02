let fs = require('fs')
let convert = require('xml-js')

let xmlFile = 'CCLXXXXII_254.xml'

fs.readFile(xmlFile, 'utf8', (err, data) => {
  if (err) throw err

  outPutJson(data)
})

const outPutJson = xml => {
  //    const writer = fs.createWriteStream('ferdowsi.json')
  const result1 = convert.xml2json(xml, { compact: true, spaces: 4 })
  //    writer.write(result1)
  const result2 = convert.xml2json(xml, { compact: false, spaces: 4 })
  //    writer.write(result2)
  fs.writeFile('CCLXXXXII_254_compact.json', result1, (err) => {
    if (err) throw err
    console.log('The compact file has been saved!')
  })
  fs.writeFile('CCLXXXXII_254_full.json', result2, (err) => {
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
