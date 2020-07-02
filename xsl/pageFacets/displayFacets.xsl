<?xml version="1.0" encoding="UTF-8"?>
<!-- $Revision: 1.5 $ $Date: 2012/06/09 00:27:52 $ -->

<!--
#(c)#=====================================================================
#(c)#
#(c)#       Copyright 2007-2012 Ex Libris (USA) Inc.
#(c)#       All Rights Reserved
#(c)#
#(c)#=====================================================================
-->
<!--
**          Product : : WebVoyage :: displayFacets
**          Version : 7.2.0
**          Created : 26-OCT-2007
**      Orig Author : David Sellers
**    Last Modified : 14-SEP-2009
** Last Modified By : Mel Pemble
-->

<xsl:stylesheet version="1.0"
    exclude-result-prefixes="xsl fo page"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:page="http://www.exlibrisgroup.com/voyager/webvoyage/page"
    xmlns:fo="http://www.w3.org/1999/XSL/Format"
    xmlns:slim="http://www.loc.gov/MARC21/slim">

<xsl:include href="../local_googleBooksAvail.xsl"/>
<!-- 2020-06-30 akohler: Disable sidebar Hathi info while ETAS is being used -->
<!-- <xsl:include href="../local_hathiTrustAvail.xsl"/> -->

<!-- ###################################################################### -->

<xsl:template name="buildActionBox">
<xsl:param name="pageRecordType"/>
<xsl:param name="moreActions"/>

    <xsl:for-each select="page:element[@nameId='actionBox.group']">
        <div class="actionBox">
            <a id="actionBoxQuickLink" name="actionBoxQuickLink"></a>
            <!--h3>Action Box</h3-->
            <!--ul class="actionBoxList"-->

            <xsl:for-each select="page:element[@nameId='actionBox.thisItem.group']">
                <div class="thisItem">
                    <label><xsl:value-of select="page:label"/></label>
                    <h2 class="nav">Action Box</h2>
                    <ul title="Action Box">

                        <xsl:for-each select="page:element">
                            <xsl:choose>
                                <xsl:when test="@nameId=$pageRecordType">
                                    <li><span class="recordPointer">&#160;</span><label><xsl:value-of select="page:linkText"/></label></li>
                                </xsl:when>
                                <xsl:otherwise>
                                    <li><span class="recordLinkBullet">&#183;</span><a href="{page:URL}"><span><xsl:value-of select="page:linkText"/></span></a></li>
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:for-each>
                        <xsl:copy-of select="$moreActions"/>

<li><span class="recordLinkBullet">&#183;</span><label>
                        <xsl:call-template name="persistentLink" >
                            <xsl:with-param name="bibID" select="$bibID"/>
                        </xsl:call-template>
</label></li>
                    </ul>
                </div>
            </xsl:for-each>

            <xsl:for-each select="page:element[@nameId='actionBox.actions.group']">
                <div class="actions">
                    <label><xsl:value-of select="page:label"/></label>
                    <h2 class="nav">Action Navigation</h2>
                    <ul title="Action Navigation" class="actions">

                        <xsl:for-each select="page:element">
                            <xsl:variable name="message">
                                   <xsl:value-of select="page:linkMessage"/>
                            </xsl:variable>

<xsl:variable name="text">
<xsl:value-of select="page:linkText"/>
</xsl:variable>

                            <xsl:choose>
                                <xsl:when test="string-length($message)">

<xsl:choose>
<xsl:when test="contains($text,'Request')">
<li title="{$message}"><span class="recordLinkBullet">&#183;</span><span>Request and recall functions are temporarily disabled until further notice due to COVID-19.</span></li>
<!--li title="{$message}"><span class="recordLinkBullet">&#183;</span><a href="{page:URL}"><span>Recall checked-out item</span></a></li>
<li title="{$message}"><span class="recordLinkBullet">&#183;</span><a href="{page:URL}"><span>Request from SRLF</span></a></li>
<li title="{$message}"><span class="recordLinkBullet">&#183;</span><a href="{page:URL}"><span>Request for purchase</span></a></li>
<li title="{$message}"><span class="recordLinkBullet">&#183;</span><a href="{page:URL}"><span>Request if status is IN PROCESS/ON ORDER</span></a></li>
<li title="{$message}"><span class="recordLinkBullet">&#183;</span><a href="{page:URL}"><span>Request for fee</span></a><br/><span class="fieldSubText">(See <a href="https://www.library.ucla.edu/use/borrow-renew-return/interlibrary-loan-document-delivery/document-delivery" target="_blank">Document Delivery Service</a>)</span></li-->
</xsl:when>
<xsl:otherwise>
<li title="{$message}"><span class="recordLinkBullet">&#183;</span><a href="{page:URL}"><span><xsl:value-of select="page:linkText"/></span></a><br/><span class="fieldSubText"><xsl:value-of select="page:postText"/></span></li>
</xsl:otherwise>
</xsl:choose>

                                    <!--li title="{$message}"><span class="recordLinkBullet">·</span><a href="{page:URL}"><span><xsl:value-of select="page:linkText"/></span></a><br/><span class="fieldSubText"><xsl:value-of select="page:postText"/></span></li-->
                                </xsl:when>
                                <xsl:otherwise>
                                    <li><span class="recordLinkBullet">·</span><a href="{page:URL}"><span><xsl:value-of select="page:linkText"/></span></a><br/><span class="fieldSubText"><xsl:value-of select="page:postText"/></span></li>
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:for-each>
<xsl:for-each select="//slim:datafield[@tag='035']/slim:subfield[@code='a']">
<xsl:variable name="tagValue"><xsl:value-of select="."/></xsl:variable>
<xsl:if test="starts-with($tagValue,'ucoclc')">
<xsl:variable name="oclcNumber" select="substring($tagValue,7)"/>
<li title="melvylLink"><span class="recordLinkBullet">·</span>
<a href="http://ucla.worldcat.org/oclc/{$oclcNumber}" target="_blank"><span>View Melvyl Record</span></a><br/>
</li>
</xsl:if>
</xsl:for-each>
                    </ul>
                </div>
            </xsl:for-each>

            <xsl:for-each select="page:element[@nameId='actionBox.moreAboutThisItem.group']">

                <div class="moreInfo">

                    <label><xsl:value-of select="page:label"/></label>
                    <h2 class="nav">Action Box More Info Navigation</h2>
                    <ul title="Action Box More Info Navigation" class="moreInfo">

                        <xsl:for-each select="page:element">
                            <li>
                                <xsl:call-template name="buildImageUrl">
                                    <xsl:with-param name="eleName" select="@nameId"/>
                                </xsl:call-template>
                            </li>
                        </xsl:for-each>
                    </ul>
                </div>


			 <!-- Add Hathi Trust template -->
			 <div style="display:none;" id="fulltext_label">
			   <label>Read online</label>
				 <!-- 2020-07-01 akohler: Disable call to Hathi sidebar template -->
				 <!--
    			 <div id="hathiRow">
	    		   <xsl:call-template name="hathiTrustAvail"/>
		    	 </div>
				 -->
                <!-- ## mdp add the google book template ## -->
                <div id="googleBooksRow">
                   <xsl:call-template name="googleBooksAvail"/>
                 </div>
			 </div> 


            </xsl:for-each>
            <!--/ul-->

        </div>
    </xsl:for-each>


</xsl:template>

<!-- ###################################################################### -->

</xsl:stylesheet>



