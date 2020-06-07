const fs = require('fs')
const PDFDocument = require('pdfkit')

// make new pdf ducument
const doc = new PDFDocument()

doc.pipe(fs.createWriteStream('emptyTest.pdf')) // write to PDF

// add stuff to PDF here using methods described below...

doc.on('pageAdded', () => doc.text('The page title'))
doc.addPage()

doc.end() // finalize the PDF and end the stream
