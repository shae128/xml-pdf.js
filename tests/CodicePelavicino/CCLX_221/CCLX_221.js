const fs = require('fs')
const convert = require('xml-js')

const xmlFile = 'CCLX_221.xml'

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
  fs.writeFile('CCLX_221_compact.json', result1, (err) => {
    if (err) throw err
    console.log('The compact file has been saved!')
  })
  fs.writeFile('CCLX_221_full.json', result2, (err) => {
    if (err) throw err
    console.log('The full file has been saved!')
  })
}
