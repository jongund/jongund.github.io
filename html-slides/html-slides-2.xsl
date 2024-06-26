<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:wai_report="http://www.w3.org/wai"
                version="1.0"
    xmlns:lxslt="http://xml.apache.org/xslt">

  <xsl:output method="html" doctype-public="" indent="yes"/>

  <xsl:template match="/">

    <xsl:element name="html">
      <xsl:attribute name="lang"><xsl:value-of select="/slides/lang/."/></xsl:attribute>

      <xsl:element name="head">

        <xsl:element name="title">Index: <xsl:value-of select="/slides/title/."/></xsl:element>

        <xsl:element name="meta">
          <xsl:attribute name="name">viewport</xsl:attribute>
          <xsl:attribute name="content">width=device-width, initial-scale=1</xsl:attribute>
        </xsl:element>

        <xsl:call-template name="head">
        </xsl:call-template>

      </xsl:element>

      <xsl:element name="body">

        <xsl:call-template name="navbar">
          <xsl:with-param name="num"   select="0" />
          <xsl:with-param name="total" select="count(/slides/slide)" />
        </xsl:call-template>



        <xsl:element name="main">
          <xsl:attribute name="class">container</xsl:attribute>
          <xsl:attribute name="id">content</xsl:attribute>

          <xsl:element name="h1">
            Index: <xsl:value-of select="slides/title"/>
          </xsl:element>

          <xsl:element name="div">
            <xsl:attribute name="class">contact</xsl:attribute>

            <xsl:element name="div">
              <xsl:attribute name="class">name</xsl:attribute>
              <xsl:if test="/slides/name/.">
                <xsl:value-of select="/slides/name/."/>
              </xsl:if>
            </xsl:element>

            <xsl:if test="/slides/phone/.">
              <xsl:element name="div">
                <xsl:attribute name="class">phone</xsl:attribute>
                <xsl:value-of select="/slides/phone/."/>
              </xsl:element>
            </xsl:if>

            <xsl:for-each select="/slides/person">
              <xsl:call-template name="person">
              </xsl:call-template>
            </xsl:for-each>

            <xsl:for-each select="/slides/conference">
              <xsl:call-template name="conference">
              </xsl:call-template>
            </xsl:for-each>

            <xsl:for-each select="/slides/desc">
              <xsl:call-template name="desc">
              </xsl:call-template>
            </xsl:for-each>


            <xsl:if test="/slides/email/.">
              <xsl:element name="p">
                <xsl:attribute name="class">email</xsl:attribute>
                E-mail:
                <xsl:element name="a">
                  <xsl:attribute name="href">mailto:<xsl:value-of select="/slides/email/."/></xsl:attribute>
                  <xsl:value-of select="/slides/email/."/>
                </xsl:element>
              </xsl:element>
            </xsl:if>
          </xsl:element>

          <xsl:if test="/slides/home/.">
            <xsl:element name="a">
              <xsl:attribute name="class">btn btn-primary home</xsl:attribute>
              <xsl:attribute name="href"><xsl:value-of select="/slides/home/@href"/></xsl:attribute>
               <xsl:value-of select="/slides/home/."/>
            </xsl:element>
          </xsl:if>


          <xsl:element name="h2">
            <xsl:attribute name="class">index</xsl:attribute>
            Index of Slides
          </xsl:element>

          <xsl:element name="ol">
            <xsl:attribute name="class">index</xsl:attribute>

            <xsl:for-each select="/slides/slide">
              <xsl:element name="li">
                <xsl:attribute name="class">index</xsl:attribute>
                <xsl:element name="a">
                  <xsl:attribute name="href">slide<xsl:value-of select="position()"/>.html</xsl:attribute>
                  <xsl:attribute name="class">index</xsl:attribute>
                  <xsl:value-of select="title/."/>
                </xsl:element>
              </xsl:element>
            </xsl:for-each>

          </xsl:element>


        </xsl:element>
        <xsl:call-template name="contentinfo">
        </xsl:call-template>
      </xsl:element>
    </xsl:element>

    <xsl:for-each select="/slides/title">
        <xsl:variable name="fname">title.html</xsl:variable>

        <xsl:result-document href="{$fname}" method="html">

          <xsl:call-template name="contentinfo">
          </xsl:call-template>
        </xsl:result-document>
    </xsl:for-each>

    <xsl:for-each select="/slides/slide" >

      <xsl:variable name="fname">slide<xsl:value-of select="position()"/>.html</xsl:variable>

      <xsl:result-document href="{$fname}" method="html">

        <xsl:element name="html">
          <xsl:attribute name="lang"><xsl:value-of select="/slides/lang/."/></xsl:attribute>
          <xsl:element name="head">
            <xsl:element name="title">
              <xsl:text>Slide </xsl:text><xsl:value-of  select="position()"/><xsl:text>: </xsl:text>
              <xsl:value-of select="title/."/>
            </xsl:element>

            <xsl:call-template name="head">
              <xsl:with-param name="style" select = "style/." />
            </xsl:call-template>

          </xsl:element>


          <xsl:element name="body">

            <xsl:call-template name="navbar">
              <xsl:with-param name="num"            select="position()"/>
              <xsl:with-param name="total"          select="last()" />
            </xsl:call-template>

            <xsl:element name="main">
              <xsl:attribute name="id">content</xsl:attribute>
              <xsl:attribute name="class">container</xsl:attribute>

              <xsl:element name="div">
                <xsl:attribute name="class">row</xsl:attribute>

                <xsl:element name="div">
                  <xsl:attribute name="class">col</xsl:attribute>
                </xsl:element>

                <xsl:element name="div">
                  <xsl:attribute name="class">col-md-12</xsl:attribute>

                  <xsl:if test="title/.">
                    <xsl:element name="h1">
                      <xsl:attribute name="id">h1_title</xsl:attribute>
                      <xsl:attribute name="class">title</xsl:attribute>
                      <xsl:value-of select="title/."/>
                    </xsl:element>
                  </xsl:if>

                  <xsl:apply-templates select="contents/*"/>
                </xsl:element>

                <xsl:element name="div">
                  <xsl:attribute name="class">col</xsl:attribute>
                </xsl:element>

              </xsl:element>

            </xsl:element>

            <xsl:if test="/slides/addtranscript">

              <xsl:element name="aside">
                <xsl:attribute name="class">container</xsl:attribute>
                <xsl:attribute name="aria-label">Transcript</xsl:attribute>

                <xsl:element name="div">
                  <xsl:attribute name="class">row</xsl:attribute>

                  <xsl:element name="div">
                     <xsl:attribute name="class">col-md-1</xsl:attribute>
                  </xsl:element>

                  <xsl:element name="div">
                      <xsl:attribute name="class">col-md-9</xsl:attribute>

                      <xsl:element name="details">
                        <xsl:attribute name="class">transcript-container</xsl:attribute>

                        <xsl:element name="summary">
                          <xsl:attribute name="id">id-slide-transcript-button</xsl:attribute>
                          <xsl:attribute name="class">btn-primary btn-sm</xsl:attribute>
                          <xsl:attribute name="title">Audio transcript of the portion of the video for this slide</xsl:attribute>
                          Audio Transcript
                        </xsl:element>

                        <xsl:choose>
                          <xsl:when test="transcript">
                            <xsl:element name="div">
                              <xsl:attribute name="class">slide-transcript</xsl:attribute>
                              <xsl:value-of select="transcript"/>
                            </xsl:element>
                          </xsl:when>
                          <xsl:otherwise>
                            <xsl:element name="div">
                              <xsl:attribute name="class">notranscript</xsl:attribute>
                              No transcript found for this slide.
                            </xsl:element>
                          </xsl:otherwise>
                        </xsl:choose>

                      </xsl:element>
                  </xsl:element>

                  <xsl:element name="div">
                    <xsl:attribute name="class">col</xsl:attribute>
                  </xsl:element>
                </xsl:element>

              </xsl:element>

            </xsl:if>

            <xsl:call-template name="contentinfo">
            </xsl:call-template>

          </xsl:element>
        </xsl:element>

      </xsl:result-document>

    </xsl:for-each>

    <xsl:if test="/slides/addtranscript">

      <xsl:variable name="fname">transcript.html</xsl:variable>

      <xsl:result-document href="{$fname}" method="html">

        <xsl:element name="html">
          <xsl:attribute name="lang"><xsl:value-of select="/slides/lang/."/></xsl:attribute>
          <xsl:element name="head">
            <xsl:element name="title">
              <xsl:text>Full Audio Transcription: </xsl:text><xsl:value-of  select="/slides/title"/>
            </xsl:element>

            <xsl:call-template name="head">
              <xsl:with-param name="style" select = "style/." />
            </xsl:call-template>

          </xsl:element>

          <xsl:element name="body">

            <xsl:element name="main">
              <xsl:attribute name="id">content</xsl:attribute>
              <xsl:attribute name="class">container</xsl:attribute>

              <xsl:element name="div">
                <xsl:attribute name="class">row</xsl:attribute>

                <xsl:element name="div">
                  <xsl:attribute name="class">col-md-1</xsl:attribute>
                </xsl:element>

                <xsl:element name="div">
                  <xsl:attribute name="class">col-md-9</xsl:attribute>

                  <xsl:element name="h1">
                    <xsl:attribute name="id">h1_title</xsl:attribute>
                    <xsl:attribute name="class">title</xsl:attribute>
                    Full Audio Transcript for <xsl:value-of select="/slides/title/."/>
                  </xsl:element>

                  <xsl:for-each select="/slides/slide">
                    <xsl:element name="h2">
                      <xsl:element name="a">
                        <xsl:attribute name="id">slide<xsl:value-of select="position()"/></xsl:attribute>
                        <xsl:attribute name="target">slides</xsl:attribute>
                        <xsl:attribute name="href">slide<xsl:value-of select="position()"/>.html</xsl:attribute>
                        Slide <xsl:value-of select="position()"/>:
                        <xsl:value-of select="title/."/>
                      </xsl:element>
                    </xsl:element>

                    <xsl:choose>
                      <xsl:when test="transcript">
                        <xsl:element name="div">
                          <xsl:attribute name="class">full-transcript</xsl:attribute>
                          <xsl:value-of select="transcript/."/>
                        </xsl:element>
                      </xsl:when>
                      <xsl:otherwise>
                        <xsl:element name="div">
                          <xsl:attribute name="class">notranscript</xsl:attribute>
                          No transcript for this slide.
                        </xsl:element>
                      </xsl:otherwise>
                    </xsl:choose>

                  </xsl:for-each>

                </xsl:element>

                <xsl:element name="div">
                  <xsl:attribute name="class">col</xsl:attribute>
                </xsl:element>

              </xsl:element>

            </xsl:element>

            <xsl:call-template name="contentinfo">
            </xsl:call-template>

          </xsl:element>
        </xsl:element>

      </xsl:result-document>

    </xsl:if>

  </xsl:template>

  <xsl:template match="*">

    <xsl:copy>
      <xsl:for-each select="@*">
         <xsl:copy/>
      </xsl:for-each>

      <xsl:apply-templates />
    </xsl:copy>

  </xsl:template>

  <xsl:template name="head" >
    <xsl:param name = "style" />

    <xsl:if test="meta">
      <xsl:element name="meta">
        <xsl:attribute name="http-equiv"><xsl:value-of select="meta/@http-equiv"/></xsl:attribute>
        <xsl:attribute name="content"><xsl:value-of select="meta/@content"/></xsl:attribute>
      </xsl:element>
    </xsl:if>

    <xsl:for-each select="/slides/stylesheet">
      <xsl:element name="link">
        <xsl:attribute name="rel">stylesheet</xsl:attribute>
        <xsl:attribute name="type">text/css</xsl:attribute>
        <xsl:attribute name="href"><xsl:value-of select="."/></xsl:attribute>
      </xsl:element>
    </xsl:for-each>

    <xsl:for-each select="/slides/script">
      <xsl:element name="script">
        <xsl:attribute name="src"><xsl:value-of select="."/></xsl:attribute>
      </xsl:element>
    </xsl:for-each>

      <xsl:element name="style">
        <xsl:attribute name="id">style</xsl:attribute>
        <xsl:value-of select="$style"/>
      </xsl:element>

  </xsl:template>

  <xsl:template name="contentinfo" >
    <xsl:element name="footer">
      <xsl:attribute name="class">container</xsl:attribute>

      <xsl:element name="div">
        <xsl:attribute name="id">footer</xsl:attribute>
        <xsl:attribute name="class">well well-sm</xsl:attribute>

          <xsl:if test="/slides/logo">
            <xsl:element name="span">
              <xsl:attribute name="class">logo</xsl:attribute>
              <xsl:apply-templates select="/slides/logo/*"/>
            </xsl:element>
          </xsl:if>

          <span class="copyright">
            <xsl:choose>
              <xsl:when test="/slides/copyright">
                <xsl:value-of select="/slides/copyright"/>
              </xsl:when>
              <xsl:otherwise>
                Copyright  &#169; 2024
              </xsl:otherwise>
            </xsl:choose>
          </span>

          <span id="ID_SHOW">

            <svg id="ID_SHOW_MORE"
                 role="button"
                 tabindex="0"
                 aria-label="Show more"
                 width="30"
                 height="30"
                 viewBox="0 0 50 50"
                 xmlns="http://www.w3.org/2000/svg">
                <circle class="focus" cx="25" cy="25" r="20" />
                <circle class="icon" cx="25" cy="25" r="15" />
                <line class="icon" x1="16" y1="25" x2="34" y2="25" />
                <line class="icon" x1="25" y1="16" x2="25" y2="34"  />
              </svg>

            <svg id="ID_SHOW_LESS"
                 role="button"
                 tabindex="0"
                 aria-label="Show less"
                 width="30"
                 height="30"
                 viewBox="0 0 50 50"
                 xmlns="http://www.w3.org/2000/svg">
              <circle class="focus" cx="25" cy="25" r="20" />
              <circle class="icon" cx="25" cy="25" r="15" />
              <line class="icon" x1="16" y1="25" x2="34" y2="25" />
            </svg>

            <svg id="ID_SHOW_ALL"
                 role="button"
                 tabindex="0"
                 aria-label="Show all"
                 width="34"
                 height="30"
                 viewBox="0 0 70 50"
                 xmlns="http://www.w3.org/2000/svg">
              <rect class="focus" x="4" y="4" height="46" width="64" rx="4" ry="4"/>
              <rect class="icon"  x="8" y="8" height="38" width="56" rx="4" ry="4"/>
              <line class="icon" x1="24" y1="15" x2="50" y2="15" />
              <line class="icon" x1="16" y1="23" x2="56" y2="23" />
              <line class="icon" x1="16" y1="31" x2="56" y2="31" />
              <line class="icon" x1="16" y1="39" x2="56" y2="39" />
            </svg>

            <svg id="ID_HIDE_ALL"
                 role="button"
                 tabindex="0"
                 aria-label="Hide all"
                 width="34"
                 height="30"
                 viewBox="0 0 70 50"
                 xmlns="http://www.w3.org/2000/svg">
              <rect class="focus" x="4" y="4" height="46" width="64" rx="4" ry="4"/>
              <rect class="icon"  x="8" y="8" height="38" width="56" rx="4" ry="4"/>
              <line class="icon" x1="24" y1="15" x2="50" y2="15" />
            </svg>
        </span>
      </xsl:element>
    </xsl:element>
  </xsl:template>

  <xsl:template name="desc" >
    <xsl:element name="div">
      <xsl:attribute name="class">desc</xsl:attribute>
      <xsl:choose>
        <xsl:when test="@href">
          <xsl:element name="a">
            <xsl:attribute name="href"><xsl:value-of select="@href"/></xsl:attribute>
            <xsl:value-of select="."/>
          </xsl:element>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="."/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:element>
  </xsl:template>

  <xsl:template name="person" >
    <xsl:element name="div">
      <xsl:attribute name="class">person</xsl:attribute>
      <xsl:if test="./name">
        <xsl:element name="div">
          <xsl:attribute name="class">name</xsl:attribute>
          <xsl:value-of select="./name"/>
        </xsl:element>
      </xsl:if>
      <xsl:for-each select="./desc">
        <xsl:call-template name="desc">
        </xsl:call-template>
      </xsl:for-each>
    </xsl:element>
  </xsl:template>

  <xsl:template name="conference" >
    <xsl:element name="div">
      <xsl:attribute name="class">conference</xsl:attribute>

      <xsl:if test="./name">
        <xsl:element name="p">
          <xsl:attribute name="class">name</xsl:attribute>

          <xsl:choose>
            <xsl:when test="./name/@href">
              <xsl:element name="a">
                <xsl:attribute name="href"><xsl:value-of select="./name/@href"/></xsl:attribute>
                <xsl:value-of select="./name"/>
              </xsl:element>
            </xsl:when>

            <xsl:otherwise>
              <xsl:value-of select="./name"/>
            </xsl:otherwise>
          </xsl:choose>

        </xsl:element>
      </xsl:if>

      <xsl:for-each select="./desc">
        <xsl:call-template name="desc">
        </xsl:call-template>
      </xsl:for-each>

    </xsl:element>
  </xsl:template>

  <xsl:template name="navbar" >
     <xsl:param name="num" select="'0'"/>
     <xsl:param name="total" select="'0'"/>

     <xsl:variable name="previous">slide<xsl:value-of select="$num - 1"/>.html</xsl:variable>
     <xsl:variable name="previousTitle">Slide <xsl:value-of select="$num - 1"/></xsl:variable>
     <xsl:variable name="next">slide<xsl:value-of select="$num + 1"/>.html</xsl:variable>
     <xsl:variable name="nextTitle">Slide <xsl:value-of select="$num + 1"/></xsl:variable>

     <xsl:variable name="last">slide<xsl:value-of select="$total"/>.html</xsl:variable>
     <xsl:variable name="lastTitle">Slide <xsl:value-of select="$total"/></xsl:variable>

        <xsl:element name="nav">
          <xsl:attribute name="id">nav</xsl:attribute>
          <xsl:attribute name="class">navbar navbar-expand-md bg-body-tertiary</xsl:attribute>

          <xsl:element name="div">
            <xsl:attribute name="class">container-fluid</xsl:attribute>

             <xsl:element name="button">
               <xsl:attribute name="class">navbar-toggler</xsl:attribute>
               <xsl:attribute name="type">button</xsl:attribute>
               <xsl:attribute name="data-bs-toggle">collapse</xsl:attribute>
               <xsl:attribute name="data-bs-target">#slide-nav</xsl:attribute>
               <xsl:attribute name="aria-controls">slide-nav</xsl:attribute>
               <xsl:attribute name="aria-controls">false</xsl:attribute>
               <xsl:attribute name="aria-label">Slide Navigation</xsl:attribute>
               <xsl:element name="span">
                 <xsl:attribute name="class">navbar-toggler-icon</xsl:attribute>
               </xsl:element>
            </xsl:element>

            <xsl:element name="div">
              <xsl:attribute name="id">slide-nav</xsl:attribute>
              <xsl:attribute name="class">collapse navbar-collapse</xsl:attribute>

              <xsl:element name="ul">
                <xsl:attribute name="class">navbar-nav</xsl:attribute>

                <xsl:choose>
                  <xsl:when test="$num=0">
                    <xsl:element name="li">
                      <xsl:attribute name="class">nav-item</xsl:attribute>
                      <xsl:element name="a">
                        <xsl:attribute name="tabindex">-1</xsl:attribute>
                        <xsl:attribute name="aria-disabled">true</xsl:attribute>
                        <xsl:attribute name="class">nav-link disabled</xsl:attribute>
                        <xsl:attribute name="id">ID_SLIDE_INDEX</xsl:attribute>
                        <xsl:attribute name="href">#</xsl:attribute>
                        Index
                      </xsl:element>
                    </xsl:element>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:element name="li">
                      <xsl:attribute name="class">nav-item</xsl:attribute>
                      <xsl:element name="a">
                        <xsl:attribute name="class">nav-link</xsl:attribute>
                        <xsl:attribute name="id">ID_SLIDE_INDEX</xsl:attribute>
                        <xsl:attribute name="href">index.html</xsl:attribute>
                        Index
                      </xsl:element>
                    </xsl:element>
                  </xsl:otherwise>
                </xsl:choose>

                <xsl:choose>
                  <xsl:when test="$num!=1">
                    <xsl:element name="li">
                      <xsl:attribute name="class">nav-item</xsl:attribute>
                      <xsl:element name="a">
                        <xsl:attribute name="class">nav-link</xsl:attribute>
                        <xsl:attribute name="id">ID_SLIDE_FIRST</xsl:attribute>
                        <xsl:attribute name="href">slide1.html</xsl:attribute>
                        <xsl:attribute name="title">Slide 1</xsl:attribute>
                        First
                      </xsl:element>
                    </xsl:element>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:element name="li">
                      <xsl:attribute name="class">nav-item</xsl:attribute>
                      <xsl:element name="a">
                        <xsl:attribute name="tabindex">-1</xsl:attribute>
                        <xsl:attribute name="aria-disabled">true</xsl:attribute>
                        <xsl:attribute name="class">nav-link disabled</xsl:attribute>
                        <xsl:attribute name="id">ID_SLIDE_FIRST</xsl:attribute>
                        <xsl:attribute name="href">slide1.html</xsl:attribute>
                        <xsl:attribute name="title">On First Slide</xsl:attribute>
                        First
                      </xsl:element>
                    </xsl:element>
                  </xsl:otherwise>
                </xsl:choose>

                <xsl:choose>
                  <xsl:when test="$num>1">
                    <xsl:element name="li">
                      <xsl:attribute name="class">nav-item</xsl:attribute>
                      <xsl:element name="a">
                        <xsl:attribute name="class">nav-link</xsl:attribute>
                        <xsl:attribute name="id">ID_SLIDE_PREVIOUS</xsl:attribute>
                        <xsl:attribute name="href"><xsl:value-of select="$previous"/></xsl:attribute>
                        <xsl:attribute name="title"><xsl:value-of select="$previousTitle"/></xsl:attribute>
                        Previous
                      </xsl:element>
                    </xsl:element>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:element name="li">
                      <xsl:attribute name="class">nav-item</xsl:attribute>
                      <xsl:element name="a">
                        <xsl:attribute name="tabindex">-1</xsl:attribute>
                        <xsl:attribute name="aria-disabled">true</xsl:attribute>
                        <xsl:attribute name="class">nav-link disabled</xsl:attribute>
                        <xsl:attribute name="id">ID_SLIDE_PREVIOUS</xsl:attribute>
                        <xsl:attribute name="href">#</xsl:attribute>
                        <xsl:attribute name="title">On First Slide</xsl:attribute>
                        Previous
                      </xsl:element>
                    </xsl:element>
                  </xsl:otherwise>
                </xsl:choose>

                <xsl:choose>
                  <xsl:when test="$num=0">
                    <xsl:element name="li">
                      <xsl:attribute name="class">nav-item</xsl:attribute>
                      <xsl:element name="a">
                        <xsl:attribute name="class">nav-link</xsl:attribute>
                        <xsl:attribute name="id">ID_SLIDE_NEXT</xsl:attribute>
                        <xsl:attribute name="href"><xsl:value-of select="$next"/></xsl:attribute>
                        <xsl:attribute name="title"><xsl:value-of select="$nextTitle"/></xsl:attribute>
                        Next
                      </xsl:element>
                    </xsl:element>
                    <xsl:element name="li">
                      <xsl:attribute name="class">nav-item</xsl:attribute>
                      <xsl:element name="a">
                        <xsl:attribute name="class">nav-link</xsl:attribute>
                        <xsl:attribute name="id">ID_SLIDE_LAST</xsl:attribute>
                        <xsl:attribute name="href"><xsl:value-of select="$last"/></xsl:attribute>
                        <xsl:attribute name="title"><xsl:value-of select="$lastTitle"/></xsl:attribute>
                        Last
                      </xsl:element>
                    </xsl:element>
                  </xsl:when>

                  <xsl:when test="$num&lt;$total">
                    <xsl:element name="li">
                      <xsl:attribute name="class">nav-item</xsl:attribute>
                      <xsl:element name="a">
                        <xsl:attribute name="class">nav-link</xsl:attribute>
                        <xsl:attribute name="id">ID_SLIDE_NEXT</xsl:attribute>
                        <xsl:attribute name="href"><xsl:value-of select="$next"/></xsl:attribute>
                        <xsl:attribute name="title"><xsl:value-of select="$nextTitle"/></xsl:attribute>
                        Next
                      </xsl:element>
                    </xsl:element>
                    <xsl:element name="li">
                      <xsl:attribute name="class">nav-item</xsl:attribute>
                      <xsl:element name="a">
                        <xsl:attribute name="class">nav-link</xsl:attribute>
                        <xsl:attribute name="id">ID_SLIDE_LAST</xsl:attribute>
                        <xsl:attribute name="href"><xsl:value-of select="$last"/></xsl:attribute>
                        <xsl:attribute name="title"><xsl:value-of select="$lastTitle"/></xsl:attribute>
                        Last
                      </xsl:element>
                    </xsl:element>
                  </xsl:when>

                  <xsl:otherwise>
                    <xsl:element name="li">
                      <xsl:attribute name="class">nav-item</xsl:attribute>
                      <xsl:element name="a">
                        <xsl:attribute name="tabindex">-1</xsl:attribute>
                        <xsl:attribute name="aria-disabled">true</xsl:attribute>
                        <xsl:attribute name="class">nav-link disabled</xsl:attribute>
                        <xsl:attribute name="id">ID_SLIDE_NEXT</xsl:attribute>
                        <xsl:attribute name="href">#</xsl:attribute>
                        <xsl:attribute name="title">On Last Slide</xsl:attribute>
                        Next
                      </xsl:element>
                    </xsl:element>
                    <xsl:element name="li">
                      <xsl:attribute name="class">nav-item</xsl:attribute>
                      <xsl:element name="a">
                        <xsl:attribute name="tabindex">-1</xsl:attribute>
                        <xsl:attribute name="aria-disabled">true</xsl:attribute>
                        <xsl:attribute name="class">nav-link disabled</xsl:attribute>
                        <xsl:attribute name="id">ID_SLIDE_LAST</xsl:attribute>
                        <xsl:attribute name="href">#</xsl:attribute>
                        <xsl:attribute name="name">On Last Slide</xsl:attribute>
                        Last
                      </xsl:element>
                    </xsl:element>
                  </xsl:otherwise>
                </xsl:choose>



                <xsl:if test="/slides/addtranscript">
                  <xsl:element name="li">
                    <xsl:attribute name="class">nav-item transcript</xsl:attribute>
                    <xsl:element name="a">
                      <xsl:attribute name="class">nav-link</xsl:attribute>
                      <xsl:attribute name="target">transcript</xsl:attribute>
                      <xsl:attribute name="href">transcript.html#slide<xsl:value-of select="$num"/></xsl:attribute>
                        Full Audio Transcript
                    </xsl:element>
                  </xsl:element>
                </xsl:if>

                <xsl:if test="not(/slides/noslidenumbers)">
                  <xsl:if test="$num > 0">
                    <xsl:element name="span">
                      <xsl:attribute name="class">navbar-text</xsl:attribute>
                        <xsl:text>Slide </xsl:text>
                        <xsl:value-of select="position()"/>
                        <xsl:text> of </xsl:text>
                        <xsl:value-of select="last()"/>
                    </xsl:element>
                  </xsl:if>
                </xsl:if>

              </xsl:element>



            </xsl:element>
          </xsl:element>
       </xsl:element>
  </xsl:template>
</xsl:stylesheet>






