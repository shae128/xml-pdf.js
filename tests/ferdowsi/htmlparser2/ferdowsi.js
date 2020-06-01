const fs = require('fs')
const htmlparser2 = require("htmlparser2");

//  fs.readFile('ferdowsi.xml', 'utf8', (err, data) => {
//    if (err) throw err
//  
//    outPutJson(data)
//  })

//  const outPutJson = xml => {
//    //    const writer = fs.createWriteStream('ferdowsi.json')
//    const result1 = convert.xml2json(xml, { compact: true, spaces: 4 })
//    //    writer.write(result1)
//    const result2 = convert.xml2json(xml, { compact: false, spaces: 4 })
//    //    writer.write(result2)
//    fs.writeFile('ferdowsiCompact.json', result1, (err) => {
//      if (err) throw err
//      console.log('The compact file has been saved!')
//    })
//    fs.writeFile('ferdowsiFull.json', result2, (err) => {
//      if (err) throw err
//      console.log('The full file has been saved!')
//    })
//  }

const parser = new htmlparser2.Parser(
    {
        onopentag(name, attribs) {
            if (name === "script" && attribs.type === "text/javascript") {
                console.log("JS! Hooray!");
            }
        },
        ontext(text) {
            console.log("-->", text);
        },
        onclosetag(tagname) {
            if (tagname === "script") {
                console.log("That's it?!");
            }
        }
    },
    { decodeEntities: true }
);
parser.write(
    "Xyz <script type='text/javascript'>var foo = '<<bar>>';</ script>"
);
parser.end();
