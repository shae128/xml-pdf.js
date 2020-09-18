const fs = require('fs')
const PDFDocument = require('pdfkit')
const XmlReader = require('xml-reader')
const xmlQuery = require('xml-query')

const destinationPdfPath = 'output_test.pdf'

//***************************************

const init = (req, res) => {
  const data = req.body;
  console.log(data)

  //Setting http respons header 
  res.writeHead( 200, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename=' + data.filesName.slice(0, -4) + '.pdf'
} );


//  res.redirect('/');
  const xmlFilePath = './public/CodicePelavicino/' + data.filesName;

  // PDF - Document info
  const info = {
    Title: 'test',
    Author: 'SeyedHosseinAli Emami',
    Subject: 'Codice Pelavicino'
  }
  
  // make new pdf ducument
  // margins and indents are in PDF points: (72 per inch)
  const doc = new PDFDocument({
    info,
    size: "A4",
    font: 'Times-Roman',
    autoFirstPage: false,
    margins: {
    top: 146.88,
    bottom: 155.52,
    left: 128,
    right: 128
// 
//    size: data.pageSize,
//    font: 'Times-Roman',
//    autoFirstPage: false,
//    margins: {
//      top: data.marginTop,
//      bottom: data.marginBottom,
//      left: data.marginInner,
//      right: data.marginOuter
    }
  })


  fs.readFile(xmlFilePath, 'utf8', (err, data) => {
    if (err) throw err

    const ast = XmlReader.parseSync(data)

    // creating xQuery from single ast
    const xq = xmlQuery(ast)
    
    // open file stream
    //doc.pipe(fs.createWriteStream(destinationPdfPath)) // write to PDF
    doc.pipe(res);
    
    // to add a new page to document
    doc.addPage()
      
    PageTitle = ' '
    xq.find('titlePart').each(function(node) {
        PageTitle += xmlQuery(node).text() + " "
    });
     
     doc.fontSize(17.2).text(PageTitle, {
       align: 'center'
     })
    
    // move down cursor for two lines
    doc.moveDown()
    doc.moveDown()
    
    
    
    const body = xq.find('body').text().replace(/\r?\n|\r/g, " ")
    doc.fontSize(10).text(body, {
      align: 'justify',
      indent: 18
    })
    
    doc.end() // finalize the PDF and end the stream
   
  })
   

}
 
module.exports = {
  init
}

