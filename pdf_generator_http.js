const fs = require('fs')
const PDFDocument = require('pdfkit')
const XmlReader = require('xml-reader')
const xmlQuery = require('xml-query')

const destinationPdfPath = 'output_test.pdf'

//***************************************

const init = (req, res) => {

  // Extracting request body from http 
  const data = req.body;

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
      
    // check page numbering condition
    if (data.pageNumbering == '1') {
    // adding page number after first page
      let pageNumber = 1;
      doc.on('pageAdded', () => {
          pageNumber++;
          let bottom = doc.page.margins.bottom;
          doc.page.margins.bottom = 0;
     
          doc.text(pageNumber,
              0.5 * (doc.page.width - 100),
              doc.page.height - 50,
              {
                  width: 100,
                  align: 'center',
                  lineBreak: false,
              });
     
          // Reset text writer position
          doc.text('', 50, 50,
           {
             align: 'justify',
             indent: 18
           });
          doc.page.margins.bottom = bottom;
         });
      }

    // check printing page title condition
    if (data.printTitle == "1") {
  
      PageTitle = ' '
      titlePath = ''
      
      if (data.customizedTitle == '')  
        titlePath += 'titlePart'
      else
        titlePath += data.customizedTitle

      //  find page title
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


    // Check docDate condition
    if (data.docDate == '1') {
       // find docDate text childs and remove newlines from them 
       const docDate = xq.find('docDate').text().replace(/\r?\n|\r/g, " ")
       doc.fontSize(Number(data.baseFontSize)).text(docDate, {
         align: 'justify',
         indent: 18
       })
       // move down cursor for two lines
       doc.moveDown()
    }


    // Check regesto condition
    if (data.regesto == '1') {
       // find  text childs and remove newlines from them 
       let regesto = '';
       xq.find('div').each(function(node){
          if (xmlQuery(node).attr().type == "regesto")
            regesto += xmlQuery(node).text();
          });
       regesto = regesto.replace(/\r?\n|\r/g, " ")
       doc.fontSize(Number(data.baseFontSize)).text(regesto, {
         align: 'justify',
         indent: 18
       })
       // move down cursor for two lines
       doc.moveDown()
    }


    // Check docDate condition
    if (data.orig_doc == '1') {
       // find  text childs and remove newlines from them 
       let orig_doc = '';
       xq.find('div').each(function(node){
          if (xmlQuery(node).attr().type == "orig_doc")
            orig_doc += xmlQuery(node).text();
          });
       orig_doc = orig_doc.replace(/\r?\n|\r/g, " ")
       doc.fontSize(Number(data.baseFontSize)).text(orig_doc, {
         align: 'justify',
         indent: 18
       })
    }

    // Check biblio condition
    if (data.biblio == '1') {
       // find  text childs and remove newlines from them 
       let biblio = '';
       xq.find('div').each(function(node){
          if (xmlQuery(node).attr().type == "biblio")
            biblio += xmlQuery(node).text();
          });
       biblio = biblio.replace(/\r?\n|\r/g, " ")
       doc.fontSize(Number(data.baseFontSize)).text(biblio, {
         align: 'justify',
         indent: 18
       })
       // move down cursor for two lines
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

