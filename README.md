<h1> WEB-CRAWLER </h1>
Uses GOOGLE-SEARCH-API to crawl the web for sites with specific keyword in their html

<h3> CONFIGURATION </h3>
set google search api parameters in .env file

<h3> EXAMPLE </h3>

<code>
    const gs = ( await googleSearch("aydavidgithere") ); //search_query
    const content = await parseContent(gs.items, "html", "aydavidgithere");  // (html_tag, "keyword(optional)")
    console.log( content );
</code>
