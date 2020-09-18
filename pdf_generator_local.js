const fs = require('fs')
const PDFDocument = require('pdfkit')
const XmlReader = require('xml-reader')
const xmlQuery = require('xml-query')

const xmlFile = './public/CodicePelavicino/A1.xml'
const destinationPdfPath = 'CCLX_221_test.pdf'


const info = {
  Title: 'test',
  Author: 'SeyedHosseinAli Emami',
  Subject: 'Codice Pelavicino'
}

// make new pdf ducument
// margins and indents are in PDF points: (72 per inch)
const doc = new PDFDocument({
  info,
  size: 'A4',
  font: 'Times-Roman',
  autoFirstPage: false,
  margins: {
    top: 146.88,
    bottom: 155.52,
    left: 128,
    right: 128
  }
})

fs.readFile(xmlFile, 'utf8', (err, data) => {
  if (err) throw err

  const ast = XmlReader.parseSync(data)

  // creating xQuery from single ast
  const xq = xmlQuery(ast)

  //queryReady.find('titlePart').each(node => console.log(node.attributes))
  //console.log(queryReady.find('persName').text())
  //console.log(queryReady.find('titlePart').children().attr())
  //console.log("end of children ******************************************");
  //queryReady.find('persName').each(node => console.log(node.text()))

  



//var pageNumber = 0;
//doc.on('pageAdded', 
//  function(){
//    // Don't forget the reset the font family, size & color if needed
//    doc.text(++pageNumber, 0.5 * (doc.page.width - 100), 40, {align: 'left'});
//  }
//);

//let pageNumber = 0;
// doc.on('pageAdded', () => {
//     pageNumber++;
//     let bottom = doc.page.margins.bottom;
//     doc.page.margins.bottom = 0;
//
//     doc.text(`${pageNumber}`,
//         0.5 * (doc.page.width - 100),
//         doc.page.height - 50,
//         {
//             width: 100,
//             align: 'left',
//             lineBreak: false,
//         });
//
//     // Reset text writer position
//     doc.text('', 50, 50);
//     doc.page.margins.bottom = bottom;
//    });
//

  //xq.find('titlePart').each(node => console.log(xmlQuery(node).attr('type')))
  // open file stream
  doc.pipe(fs.createWriteStream(destinationPdfPath)) // write to PDF
  
  // to add a new page to document
  doc.addPage()
    
 PageTitle = ' '
 xq.find('titlePart').each(function(node) {
     PageTitle += xmlQuery(node).text() + " "
 });
//  let PageTitleArray = xq.find('titlePart')
//  PageTitleArray.each( function(node){
//       if (node.type === 'text') {
//           PageTitle += node.value + " ";
//       }
//       else {
//           PageTitle += xmlQuery(node).children().text() + " ";
//       }
//   });
//
//  console.log(PageTitle)
//  PageTitle += ' ('
//  PageTitle += titlePartOrig
//  PageTitle += ')'
//  
  doc.fontSize(17.2).text(PageTitle, {
    align: 'center'
  })

  // move down cursor for two lines
  doc.moveDown()
  doc.moveDown()


console.log(xq.find('body').text().replace(/\r?\n|\r/g, " "))

const body = xq.find('body').text().replace(/\r?\n|\r/g, " ")
doc.fontSize(10).text(body, {
  align: 'justify',
  indent: 18
})


// adding page number *******************

  doc.end() // finalize the PDF and end the stream

})

//// the pointer to find position on json
////
//// TEI
//const TEI = SourceJsonFile.elements[1]
//
//// TEI > text
//const TeiText = TEI.elements[1]
//
//// TEI > text > front
//const TextFront = TeiText.elements[0]
//
//// TEI > text > front > titlePart
//const titlePartNuova = TextFront.elements[0].elements[0].text
//const titlePartOrig = TextFront.elements[1].elements[0].text
//
//let PageTitle = titlePartNuova
//PageTitle += ' ('
//PageTitle += titlePartOrig
//PageTitle += ')'
//
//doc.fontSize(17.2).text(PageTitle, {
//  align: 'center'
//})
//
//// move down cursor for two lines
//doc.moveDown()
//doc.moveDown()
//
//// TEI > text > front > docDate
//const docDate = TextFront.elements[2]
//
//// TEI > text > front > docDate > date
//const docDateDate = docDate.elements[0].elements[0].text
//
//// TEI > text > front > docDate > date > ,
//const afterDate = docDate.elements[1].text
//
//// TEI > text > front > docDate > placeName
//const docDatePlaceName = docDate.elements[2]
//
//// TEI > text > front > docDate > placeName > text
//const PlaceNameText = docDatePlaceName.elements[0].text
//
//// TEI > text > front > docDate > placeName > temr
//const PlaceNameTerm = docDatePlaceName.elements[1].elements[0].text
//
//// TEI > text > front > docDate > placeName > close parentheses
//const PlaceNameCP = docDatePlaceName.elements[2].text
//
//let FirstLine = docDateDate
//FirstLine += afterDate
//FirstLine += PlaceNameText
//FirstLine += PlaceNameTerm
//FirstLine += PlaceNameCP
//
//doc.fontSize(10).text(FirstLine, {
//  align: 'justify',
//  indent: 18
//})
//
//// move down cursor for one line
//doc.moveDown()
//
//// TEI > text > front > regesto
//const regesto = TextFront.elements[3]
//
//// TEI > text > front > regesto > p
//let regestoP = regesto.elements[0].elements[0].text
//
//// remove newline and whitespaces after it
//regestoP = regestoP.replace(/\n\s/g, '')
//
//doc.fontSize(10).text(regestoP, {
//  align: 'justify',
//  indent: 18
//})
//
//// move down cursor for one line
//doc.moveDown()
//
//// TEI > text > front > footer
//const frontFooter = TextFront.elements[4]
//
//// TEI > text > front > footer > orig_doc
//const origDoc = frontFooter.elements[0]
//
//// TEI > text > front > footer > orig_doc > p
//let origDocP = origDoc.elements[0].elements[0].text
//
//// remove newline and whitespaces after it
//origDocP = origDocP.replace(/\n\s/g, '')
//
//doc.fontSize(10).text(origDocP, {
//  align: 'justify',
//  indent: 18
//})
//
//// move down cursor for half a line
//doc.moveDown(0.5)
//
//// TEI > text > front > footer > biblio
//const biblio = frontFooter.elements[1]
//
//// TEI > text > front > footer > biblio > p
//let biblioP = biblio.elements[0].elements[0].text
//
//// TEI > text > front > footer > biblio > p > ref
//const biblioRef = biblio.elements[0].elements[1].elements[0].text
//
//// TEI > text > front > footer > biblio > p (continu)
//biblioP = biblioP + biblioRef + biblio.elements[0].elements[2].text
//
//// remove newline and whitespaces after it
//biblioP = biblioP.replace(/\n\s/g, '')
//
//doc.fontSize(10).text(biblioP, {
//  align: 'justify',
//  indent: 18
//})
//
//// TODO
//// crit_notes does not have content in
//// every document so it will be developed
//// afterward
////
//// TEI > text > front > footer > crit_notes
//// const critNotes = frontFooter.elements[2]
//
//// TEI > text > front > footer > crit_notes > note
//// const critNotesNote = frontFooter.elements[0]
//
//doc.end() // finalize the PDF and end the stream
