<?xml version="1.0" encoding="UTF-8"?>

<!--
#(c)#=====================================================================
#(c)#
#(c)#       Copyright 2008 ExLibris Group
#(c)#            All Rights Reserved
#(c)#
#(c)#=====================================================================
-->
<!--
**		      Product : WebVoyage : googleBooksAvail
**          Version : 7.0
**          Created : 05-MAR-2008
**      Orig Author : Mel Pemble
**    Last Modified : 28-OCT-2008
** Last Modified By : Mel Pemble
**
** Copied from Orbis and used by permission from Yale.
-->
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:page="http://www.exlibrisgroup.com/voyager/webvoyage/page"
	xmlns:fo="http://www.w3.org/1999/XSL/Format">

<!-- ###################################################################### -->

<xsl:template name="hathiTrustAvail">

   <!-- Setup the ISBN -->
	<xsl:variable name="ISBN">
      <xsl:call-template name="trimData">
         <xsl:with-param name="sData">
            <xsl:call-template name="BMDProcessMarcTags">
               <xsl:with-param name="field" select="'020'"/>
               <xsl:with-param name="indicator1" select="'X'"/>
               <xsl:with-param name="indicator2" select="'X'"/>
               <xsl:with-param name="subfield" select="'a'"/>
               <xsl:with-param name="mfhdID" select="$bibID"/>
               <xsl:with-param name="recordType" select="'bib'"/>
            </xsl:call-template>
          </xsl:with-param>
       </xsl:call-template>
	</xsl:variable>
   
   <xsl:variable name="ISSN">
      <xsl:call-template name="trimData">
         <xsl:with-param name="sData">
            <xsl:call-template name="BMDProcessMarcTags">
               <xsl:with-param name="field" select="022"/>
               <xsl:with-param name="indicator1" select="'X'"/>
               <xsl:with-param name="indicator2" select="'X'"/>
               <xsl:with-param name="subfield" select="'a'"/>
               <xsl:with-param name="mfhdID" select="$bibID"/>
               <xsl:with-param name="recordType" select="'bib'"/>
            </xsl:call-template>
         </xsl:with-param>
      </xsl:call-template>
   </xsl:variable>
	
	<!-- Setup the LCCN -->
   <xsl:variable name="LCCN">
      <xsl:call-template name="trimLCCN">
         <xsl:with-param name="sData">
      		 <xsl:call-template name="BMDProcessMarcTags">
                 <xsl:with-param name="field" select="'010'"/>
                 <xsl:with-param name="indicator1" select="'X'"/>
                 <xsl:with-param name="indicator2" select="'X'"/>
                 <xsl:with-param name="subfield" select="'a'"/>
                 <xsl:with-param name="mfhdID" select="$bibID"/>
                 <xsl:with-param name="recordType" select="'bib'"/>
      	             </xsl:call-template>
          </xsl:with-param>
       </xsl:call-template>
	</xsl:variable>

 	<!-- Setup the OCLC -->
   <xsl:variable name="OCLC">
      <xsl:call-template name="trimData">
         <xsl:with-param name="sData">
      
      		 <xsl:call-template name="BMDProcessMarcTags">
                 <xsl:with-param name="field" select="'035'"/>
                 <xsl:with-param name="indicator1" select="'X'"/>
                 <xsl:with-param name="indicator2" select="'X'"/>
                 <xsl:with-param name="subfield" select="'a'"/>
                 <xsl:with-param name="mfhdID" select="$bibID"/>
                 <xsl:with-param name="recordType" select="'bib'"/>
             </xsl:call-template>
          </xsl:with-param>
       </xsl:call-template>
	</xsl:variable>
     
   <xsl:variable name="BIBKEYS"><xsl:value-of select="$ISBN"/><xsl:value-of select="$LCCN"/><xsl:value-of select="$OCLC"/></xsl:variable>

   <!-- Don't do anything unless there is we have a BIBKEY -->
   <xsl:if test="string-length($BIBKEYS)">
   	<script type="text/javascript" src="{$jscript-loc}hathi.js"/>
   	
      <!-- Hide the visibility, we will turn it on in js if we get an object back from the JSON call -->
      <!-- We do this because there is no gaurantee google will return any data to us -->
      <div id="hathiBooks" class="hathiBooks" style="display:none;"><label></label>
         <form onSubmit="return false" name="hathiBk" action="hathiBk">
            <xsl:if test="string-length($ISBN)"><input type="hidden" name="hisbn" id="hisbn" value="isbn/{$ISBN}"/></xsl:if>
            <xsl:if test="string-length($ISSN)"><input type="hidden" name="hissn" id="hissn" value="issn/:{$ISSN}"/></xsl:if>
            <xsl:if test="string-length($LCCN)"><input type="hidden" name="hlccn" id="hlccn" value="lccn/{normalize-space($LCCN)}"/></xsl:if>
            <xsl:if test="string-length($OCLC)"><input type="hidden" name="hoclc" id="hoclc" value="oclc/{translate($OCLC,'OCLClcocmocn//r()','')}"/></xsl:if>
         </form>
         <div id="hathidata"></div>
      </div>
      
      <!-- We need to make the function call after we render the div.data -->
      <script type="text/javascript">hathiBookSearch(document.hathiBk);</script>
      
   </xsl:if>

</xsl:template>

</xsl:stylesheet>

