<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:tei="http://www.tei-c.org/ns/1.0">

  <xsl:output method="text"/>

	<!--gestione dinamica del documento di LaTeX-->
    <xsl:template match="/">
			<xsl:text>

				\documentclass[a4paper]{article}
				\usepackage[T1]{fontenc}
				\usepackage[utf8x]{inputenc}
				\usepackage[latin,italian]{babel}
				\usepackage{xcolor}  
				\usepackage{footnote}
				\usepackage{soulutf8}
				\usepackage{amsmath}


				\definecolor{ashgrey}{rgb}{0.7, 0.75, 0.71}

				\newcommand{\evidenzia}[2]{\sethlcolor{#1}\texthl{#2}}
				\newcommand{\persona}[1]{\evidenzia{yellow}{#1}}
				\newcommand{\luogo}[1]{\evidenzia{green}{#1}}
				\newcommand{\professione}[1]{\evidenzia{magenta}{#1}}
				\newcommand{\data}[1]{\evidenzia{ashgrey}{#1}}
				\newcommand{\luoghiinteresse}[1]{\evidenzia{red}{#1}}
				\newcommand{\monete}[1]{\evidenzia{cyan}{#1}}

			</xsl:text>

	<xsl:text>
		\begin{document} 
	</xsl:text>
	<xsl:apply-templates select="//tei:text/tei:front"/>
	<xsl:apply-templates select="//tei:text/tei:body"/>
	 <xsl:text>
       \end{document}</xsl:text>
    </xsl:template>
	
	<!--gestione del regesto del documento-->
	<xsl:template match="tei:text/tei:front">
	<xsl:text>\title{</xsl:text>
	<xsl:value-of select="//tei:text/tei:front/tei:titlePart"/> 
	<xsl:text> (</xsl:text>
	<xsl:value-of select="//tei:text/tei:front/tei:titlePart[@type='numerazioneOrig']"/>
	<xsl:text>)</xsl:text>
	<xsl:text>}</xsl:text>
	<xsl:text>\date{}</xsl:text>
	<xsl:text>\maketitle</xsl:text>
		<xsl:value-of select="//tei:front/tei:docDate"/>
		<xsl:text>\\</xsl:text>
	<xsl:text>\par </xsl:text>
		<xsl:value-of select="//tei:front/tei:div[@type='regesto']/tei:p"/> 
		<xsl:text>\\</xsl:text>
	<xsl:text>\par </xsl:text>
		<xsl:value-of select="//tei:front/tei:div[@type='footer']/tei:div[@type='orig_doc']"/>
	<xsl:text>\par </xsl:text>	
		<xsl:value-of select="//tei:front/tei:div[@type='footer']/tei:div[@type='biblio']"/>
		
		<xsl:value-of select="//tei:front/tei:div[@type='footer']/tei:div[@type='crit_notes']/tei:note"/>
	</xsl:template>

	
	<!--gestione del corpo del documento-->
	<xsl:template match="tei:text/tei:body">
		<xsl:apply-templates select="tei:div/tei:p"/>	
	</xsl:template>

	<xsl:template match="tei:body/tei:div/tei:p">
		<xsl:text> \\</xsl:text>
		<xsl:text>\par </xsl:text>
		<xsl:text> [</xsl:text><xsl:value-of select="./@n"/><xsl:text>] </xsl:text>
		<xsl:apply-templates/>
	</xsl:template>

	<!--gestione dell'evidenziazione dei nomi di persona-->
	<xsl:template match="//tei:persName">
			<xsl:text>\persona{</xsl:text>
				<xsl:apply-templates/>
			<xsl:text>}</xsl:text>
	</xsl:template>		
	
	<!--gestione dell'evidenziazione dei nomi di luogo-->	
	<xsl:template match="//tei:placeName">
			<xsl:text>\luogo{</xsl:text>
					<xsl:apply-templates/>
			<xsl:text>}</xsl:text>
	</xsl:template>
	
	<!--gestione dell'evidenziazione delle professioni-->
	<xsl:template match="//tei:roleName">
			<xsl:text>\professione{</xsl:text>
					<xsl:apply-templates/>
			<xsl:text>}</xsl:text>
	</xsl:template>
	
	<!--gestione dell'evidenziazione dei luoghi di interesse-->
	<xsl:template match="//tei:orgName">
			<xsl:text>\luoghiinteresse{</xsl:text>
					<xsl:apply-templates/>
			<xsl:text>}</xsl:text>
	</xsl:template>
	<!--gestione dell'evidenziazione delle date-->
	<xsl:template match="//tei:date">
			<xsl:text>\data{</xsl:text>
					<xsl:apply-templates/>
			<xsl:text>}</xsl:text>
	</xsl:template>
	<!--gestione dell'evidenziazione delle monete-->
	<xsl:template match="//tei:measure">
			<xsl:text>\monete{</xsl:text>
					<xsl:apply-templates/>
			<xsl:text>}</xsl:text>
	</xsl:template>

	<!--definizione delle note a pie' di pagina-->
	<xsl:template match="tei:note[@place='foot']">
			<xsl:text>\footnote{</xsl:text>
				<xsl:apply-templates/>
			<xsl:text>}</xsl:text>
	</xsl:template>

	<!--definizione dell'enfatizzazione nelle note-->
	<xsl:template match="//tei:note/tei:emph">
				<xsl:text>\emph{</xsl:text>
					<xsl:value-of select="."/>
				<xsl:text>}</xsl:text>
	</xsl:template>

	<!--gestione delle codifiche annidate-->
	
	<!--annidamenti dentro i nomi di persona-->
	<xsl:template match="//tei:persName/tei:persName">
			<xsl:text>}\persona{</xsl:text>
					<xsl:apply-templates/>
			<xsl:text>}\persona{</xsl:text>
	</xsl:template>

	<xsl:template match="//tei:persName/tei:placeName">
			<xsl:text>}\luogo{</xsl:text>
					<xsl:apply-templates/>
			<xsl:text>}\persona{</xsl:text>
	</xsl:template>

	<xsl:template match="//tei:persName/tei:roleName">
			<xsl:text>}\professione{</xsl:text>
					<xsl:apply-templates/>
			<xsl:text>}\persona{</xsl:text>
	</xsl:template>

	<xsl:template match="//tei:persName/tei:orgName">
			<xsl:text>}\luoghiinteresse{</xsl:text>
				<xsl:apply-templates/>
			<xsl:text>}\persona{</xsl:text>
	</xsl:template>

	<xsl:template match="//tei:persName/tei:date">
			<xsl:text>}\data{</xsl:text>
				<xsl:apply-templates/>
			<xsl:text>}\persona{</xsl:text>
	</xsl:template>

	<xsl:template match="//tei:persName/tei:measure">
			<xsl:text>}\monete{</xsl:text>
				<xsl:apply-templates/>
			<xsl:text>}\persona{</xsl:text>
	</xsl:template>

	<!--annidamenti dentro i nomi di luogo-->
	<xsl:template match="//tei:placeName/tei:placeName">
			<xsl:text>}\luogo{</xsl:text>
			<xsl:apply-templates/>
			<xsl:text>}\luogo{</xsl:text>
	</xsl:template>

	<xsl:template match="//tei:placeName/tei:persName">
			<xsl:text>}\persona{</xsl:text>
			<xsl:apply-templates/>
			<xsl:text>}\luogo{</xsl:text>
	</xsl:template>

	<xsl:template match="//tei:placeName/tei:roleName">
			<xsl:text>}\professione{</xsl:text>
			<xsl:apply-templates/>
			<xsl:text>}\luogo{</xsl:text>
	</xsl:template>

	<xsl:template match="//tei:placeName/tei:orgName">
			<xsl:text>}\luoghiinteresse{</xsl:text>
			<xsl:apply-templates/>
			<xsl:text>}\luogo{</xsl:text>
	</xsl:template>

	<xsl:template match="//tei:placeName/tei:date">
			<xsl:text>}\data{</xsl:text>
			<xsl:apply-templates/>
			<xsl:text>}\luogo{</xsl:text>
	</xsl:template>

	<xsl:template match="//tei:placeName/tei:measure">
			<xsl:text>}\monete{</xsl:text>
			<xsl:apply-templates/>
			<xsl:text>}\luogo{</xsl:text>
	</xsl:template>

	<!--annidamenti dentro ai luoghi di interesse-->
	<xsl:template match="//tei:orgName/tei:orgName">
			<xsl:text>}\luoghiinteresse{</xsl:text>
			<xsl:apply-templates/>
			<xsl:text>}\luoghiinteresse{</xsl:text>
	</xsl:template>

	<xsl:template match="//tei:orgName/tei:persName">
			<xsl:text>}\persona{</xsl:text>
			<xsl:apply-templates/>
			<xsl:text>}\luoghiinteresse{</xsl:text>
	</xsl:template>

	<xsl:template match="//tei:orgName/tei:roleName">
			<xsl:text>}\professione{</xsl:text>
			<xsl:apply-templates/>
			<xsl:text>}\luoghiinteresse{</xsl:text>
	</xsl:template>

	<xsl:template match="//tei:orgName/tei:placeName">
			<xsl:text>}\luogo{</xsl:text>
			<xsl:apply-templates/>
			<xsl:text>}\luoghiinteresse{</xsl:text>
	</xsl:template>

	<xsl:template match="//tei:orgName/tei:date">
			<xsl:text>}\data{</xsl:text>
			<xsl:apply-templates/>
			<xsl:text>}\luoghiinteresse{</xsl:text>
	</xsl:template>

	<xsl:template match="//tei:orgName/tei:measure">
			<xsl:text>}\monete{</xsl:text>
			<xsl:apply-templates/>
			<xsl:text>}\luoghiinteresse{</xsl:text>
	</xsl:template>

	<!--annidamenti dentro alle date-->
	<xsl:template match="//tei:date/tei:date">
			<xsl:text>}\data{</xsl:text>
			<xsl:apply-templates/>
			<xsl:text>}\data{</xsl:text>
	</xsl:template>

	<xsl:template match="//tei:date/tei:persName">
			<xsl:text>}\persona{</xsl:text>
			<xsl:apply-templates/>
			<xsl:text>}\data{</xsl:text>
	</xsl:template>

	<xsl:template match="//tei:date/tei:roleName">
			<xsl:text>}\professione{</xsl:text>
			<xsl:apply-templates/>
			<xsl:text>}\data{</xsl:text>
	</xsl:template>

	<xsl:template match="//tei:date/tei:orgName">
			<xsl:text>}\luoghiinteresse{</xsl:text>
			<xsl:apply-templates/>
			<xsl:text>}\data{</xsl:text>
	</xsl:template>

	<xsl:template match="//tei:date/tei:placeName">
			<xsl:text>}\luogo{</xsl:text>
			<xsl:apply-templates/>
			<xsl:text>}\data{</xsl:text>
	</xsl:template>

	<xsl:template match="//tei:date/tei:measure">
			<xsl:text>}\monete{</xsl:text>
			<xsl:apply-templates/>
			<xsl:text>}\data{</xsl:text>
	</xsl:template>

	<!--annidamento nella codifica delle monete-->
	<xsl:template match="//tei:measure/tei:measure">
			<xsl:text>}\monete{</xsl:text>
			<xsl:apply-templates/>
			<xsl:text>}\monete{</xsl:text>
	</xsl:template>

	<xsl:template match="//tei:measure/tei:persName">
			<xsl:text>}\persona{</xsl:text>
			<xsl:apply-templates/>
			<xsl:text>}\monete{</xsl:text>
	</xsl:template>

	<xsl:template match="//tei:measure/tei:roleName">
			<xsl:text>}\professione{</xsl:text>
			<xsl:apply-templates/>
			<xsl:text>}\monete{</xsl:text>
	</xsl:template>

	<xsl:template match="//tei:measure/tei:orgName">
			<xsl:text>}\luoghiinteresse{</xsl:text>
			<xsl:apply-templates/>
			<xsl:text>}\monete{</xsl:text>
	</xsl:template>

	<xsl:template match="//tei:measure/tei:placeName">
			<xsl:text>}\luogo{</xsl:text>
			<xsl:apply-templates/>
			<xsl:text>}\monete{</xsl:text>
	</xsl:template>

	<xsl:template match="//tei:measure/tei:date">
			<xsl:text>}\data{</xsl:text>
			<xsl:apply-templates/>
			<xsl:text>}\monete{</xsl:text>
	</xsl:template>

	<!--annidamento codifica nelle professioni-->
	<xsl:template match="//tei:roleName/tei:roleName">
			<xsl:text>}\professione{</xsl:text>
			<xsl:apply-templates/>
			<xsl:text>}\professione{</xsl:text>
	</xsl:template>

	<xsl:template match="//tei:roleName/tei:persName">
			<xsl:text>}\persona{</xsl:text>
			<xsl:apply-templates/>
			<xsl:text>}\professione{</xsl:text>
	</xsl:template>

	<xsl:template match="//tei:roleName/tei:placeName">
			<xsl:text>}\luogo{</xsl:text>
			<xsl:apply-templates/>
			<xsl:text>}\professione{</xsl:text>
	</xsl:template>

	<xsl:template match="//tei:roleName/tei:orgName">
			<xsl:text>}\luoghiinteresse{</xsl:text>
			<xsl:apply-templates/>
			<xsl:text>}\professione{</xsl:text>
	</xsl:template>

	<xsl:template match="//tei:roleName/tei:date">
			<xsl:text>}\data{</xsl:text>
			<xsl:apply-templates/>
			<xsl:text>}\professione{</xsl:text>
	</xsl:template>

	<xsl:template match="//tei:roleName/tei:measure">
			<xsl:text>}\monete{</xsl:text>
			<xsl:apply-templates/>
			<xsl:text>}\professione{</xsl:text>
	</xsl:template>
</xsl:stylesheet>
