const fs = require('fs')
const PDFDocument = require('pdfkit')
const XmlReader = require('xml-reader')
const xmlQuery = require('xml-query')

const destinationPdfPath = 'output_test.pdf'

//***************************************

const init = (req, res) => {

  // Extracting request body from http 
  const data = req.body;

  console.log(data)

  //Setting http respons header 
  res.writeHead( 200, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename=' + data.filesName.slice(0, -4) + '.pdf'
  });


  // nomalizing file path
  const xmlFilePath = './public/CodicePelavicino/' + data.filesName;

  // Check copy allowed
  if (data.copyAllowed == '0') 
    copyAllowed = false
  else
    copyAllowed = true

  // PDF - Document info
  const info = {
    Title: data.filesName.slice(0, -4),
    Author: data.customizedAuthor,
  }
  
  // make new pdf ducument
  // margins and indents are in PDF points: (72 per inch)
  const doc = new PDFDocument({
    info,
    size: data.pageSize,
    pdfVersion: data.pdfVersion,
    permissions: {
      copying: copyAllowed,
    },
    font: 'Times-Roman',
    autoFirstPage: false,
    margins: {
      top: Number(data.marginTop),
      bottom: Number(data.marginBottom),
      left: Number(data.marginInner),
      right: Number(data.marginOuter)
    }
  })

  // Open file 
  fs.readFile(xmlFilePath, 'utf8', (err, xml) => {
    if (err) throw err

    // read xml structure
    const ast = XmlReader.parseSync(xml)

    // creating xQuery from single ast
    const xq = xmlQuery(ast)
    
    // Respons to http request
    doc.pipe(res);
    
    // add a new page to document
    doc.addPage()
      

    // find page title
    if (data.printTitle == "1") {
  
      PageTitle = ' '
      titlePath = ''
      
      if (data.customizedTitle == '')  
        titlePath += 'titlePart'
      else
        titlePath += data.customizedTitle

      
      xq.find(titlePath).each(function(node) {
          PageTitle += xmlQuery(node).text() + " "
      });
       
      // write page title to pdf document
      doc.fontSize(Number(data.printTitleSize)).text(PageTitle, {
          align: 'center'
      })
      
      // move down cursor for two lines
      doc.moveDown()
      doc.moveDown()
  
    }

    // find body text childs and remove newlines from them 
    const body = xq.find('body').text().replace(/\r?\n|\r/g, " ")
    doc.fontSize(Number(data.baseFontSize)).text(body, {
      align: 'justify',
      indent: 18
    })
    
    // finalize the PDF and end the stream
    doc.end() 
   
  })

}
 
// export init function to be accesible project wide
module.exports = {
  init
}

