var postTitleOriginal,  myLink, myDiv, myImage;
var    main;

function getPosts(json) {
if(poweredBy)
{
myDiv = createDiv("bp_poweredBy");
myDiv.style.clear="both";
myDiv.innerHTML="Powered By : ";
myDiv.style.marginTop="4px";
var myLink = createLink("http://www.bloggerplugins.org/2009/07/recent-posts-widget-blogger-thumnail.html?utm_source=blogger&utm_medium=recent-posts&utm_campaign=gadgets","_blank","Recent Posts Gadget For Blogger")
document.getElementById('poweredBy').style.display="block";
myDiv.appendChild(myLink);
document.getElementById('poweredBy').appendChild(myDiv);
myLink.innerHTML="Blogger Plugins";
}


for (var i = 0; i < numberOfPosts; i++) {
if (i == json.feed.entry.length) break;
var s;
    var entry = json.feed.entry[i];
    var postTitle = entry.title.$t;
    postTitleOriginal = postTitle;
    if (isNaN(titleLength) || titleLength == 0) {
        postTitle = '';

    }
    else if (postTitle.length > titleLength) postTitle = postTitle.substring(0, titleLength) + "...";
    var postUrl;
    for (var k = 0; k < entry.link.length; k++) {
        if (entry.link[k].rel == 'replies' && entry.link[k].type == 'text/html') {
            var commentText = entry.link[k].title;
            var commentUrl = entry.link[k].href;
        }
        if (entry.link[k].rel == 'alternate') {
            postUrl = entry.link[k].href;
            break;
        }
    }
    if (showThumbs == true) {
        var thumbUrl = "";
        try {
            thumbUrl = entry.media$thumbnail.url;
            if(imgDim=="80"||imgDim=="85"||imgDim=="90"||imgDim=="95"||imgDim=="100") thumbUrl = thumbUrl.replace("/s72-c/","/s104-c/");
        } catch (error) {
            if ("content" in entry) s = entry.content.$t; else s="";
            if (thumbUrl == "" && mediaThumbsOnly == false) {
                 regex = /http\:\/\/www\.youtube(-nocookie){0,1}\.com\/(v){0,1}(embed){0,1}\/(([^"&?' ]*))/;
                videoIds = s.match(regex);
                if (videoIds != null) {
                    videoId = videoIds[4];
                }
                if (videoIds != null && videoId != null) thumbUrl = "http://img.youtube.com/vi/" + videoId + "/2.jpg"
            }
            if (thumbUrl == "" && mediaThumbsOnly == false) {
                a = s.indexOf("<img");
                b = s.indexOf("src=\"", a);
                c = s.indexOf("\"", b + 5);
                d = s.substr(b + 5, c - b - 5);
                if ((a != -1) && (b != -1) && (c != -1) && (d != "")) thumbUrl = d;
               
            }

        }
        if(thumbUrl.indexOf("static.flickr.com")!=-1) {thumbUrl= thumbUrl.replace("_b_t.jpg","_s.jpg");thumbUrl= thumbUrl.replace("_m_t.jpg","_s.jpg");thumbUrl= thumbUrl.replace("_s_t.jpg","_s.jpg");
        thumbUrl= thumbUrl.replace("_b.jpg","_s.jpg");thumbUrl= thumbUrl.replace("_m.jpg","_s.jpg");}
        if (thumbUrl == "" && showNoImage == true) thumbUrl = 'http://1.bp.blogspot.com/_u4gySN2ZgqE/SosvnavWq0I/AAAAAAAAArk/yL95WlyTqr0/s400/noimage.png';
    } //end ifposthumbs
    if (showPostDate == true) {
        var postdate = entry.published.$t;
        var cdyear = postdate.substring(0, 4);
        var cdmonth = postdate.substring(5, 7);
        var cdday = postdate.substring(8, 10);
        var monthnames = new Array();
        monthnames[1] = "Jan";
        monthnames[2] = "Feb";
        monthnames[3] = "Mar";
        monthnames[4] = "Apr";
        monthnames[5] = "May";
        monthnames[6] = "Jun";
        monthnames[7] = "Jul";
        monthnames[8] = "Aug";
        monthnames[9] = "Sep";
        monthnames[10] = "Oct";
        monthnames[11] = "Nov";
        monthnames[12] = "Dec";
    } //end if date
    code = "";
        main = document.getElementById('recent');
        myDiv = document.createElement('div');
        myDiv.setAttribute("class", "bp_item_title");
        myLink = createLink(postUrl,"_top",postTitleOriginal)
        if(showBorder){if(main.innerHTML!=""){myDiv.style.paddingTop="4px";myDiv.style.borderTop="1px dotted black";myDiv.style.borderTopColor=borderColor;}}
        if(postTitle != ''){myDiv.appendChild(myLink);}
        main.appendChild(myDiv);if(postTitle != '')myLink.innerHTML = postTitle;





    if (showThumbs == true && thumbUrl != "") {
        myImage = document.createElement('img');
        myImage.style.border = "none";
        myImage.style.margin = "5px";
        myImage.setAttribute("src", thumbUrl);
        myImage.style.cssFloat=imgFloat;
        myImage.style.styleFloat=imgFloat;
        myImage.setAttribute("alt", postTitleOriginal);
        myImage.setAttribute("width", imgDim);
        //myImage.setAttribute("align", imgFloat);
        myImage.setAttribute("height", imgDim);
        myLink = document.createElement('a');
        myLink.setAttribute("href", postUrl+"?utm_source=BP_recent");
        myLink.setAttribute("target", "_top");
        myLink.setAttribute("title", postTitleOriginal);
        myLink.appendChild(myImage);

        myDiv = document.createElement('div');
        myDiv.setAttribute("class", "bp_item_thumb");
        myDiv.appendChild(myLink);
        main.appendChild(myDiv);
    }




    try {
        if ("content" in entry) {
            var postContent = entry.content.$t;
        }
        else if ("summary" in entry) {
            var postContent = entry.summary.$t;
        }
        else var postContent = "";
        var re = /<\S[^>]*>/g;
        postContent = postContent.replace(re, "");


        if (showSummary == true) {
            myDiv = createDiv("bp_item_summary");
                if (postContent.length < summaryLength) {myDiv.appendChild(document.createTextNode(postContent));}
            else {
                postContent = postContent.substring(0, summaryLength);
                var quoteEnd = postContent.lastIndexOf(" ");
                postContent = postContent.substring(0, quoteEnd);
                myDiv.appendChild(document.createTextNode(postContent + '...'));
            }

            main.appendChild(myDiv);
        }
    } //end try
    catch (error) {}

    myDiv =  createDiv("bp_item_meta");
    myDiv.style.clear="both";
    myDiv.style.marginBottom="4px";
    myDiv.style.fontSize="13px";

    var flag = 0;
    if (showPostDate == true) {
        myDiv.appendChild(document.createTextNode(monthnames[parseInt(cdmonth, 10)] + '-' + cdday + '-' + cdyear));
        flag = 1;
    }

    if (showCommentCount == true) {
        if (flag == 1) {
            myDiv.appendChild(document.createTextNode(" | "));
        }
        if (commentText == '1 Comments') commentText = '1 Comment';
        if (commentText == '0 Comments') commentText = 'No Comments';
        var myLink = createLink(commentUrl,"_top",commentText + " on " + postTitleOriginal)
        myDiv.appendChild(myLink);
        myLink.innerHTML=commentText;
        flag = 1;;
    }

    if (showReadMore == true) {
        if (flag == 1) {
            myDiv.appendChild(document.createTextNode(" | "));
        }
        var myLink = createLink(postUrl,"_top",postTitleOriginal)
        myDiv.appendChild(myLink);
        myLink.innerHTML = readMore+" &raquo;";
        flag = 1;;
    }



    if (flag == 1 || showSummary || postTitle != "") main.appendChild(myDiv);
    gadgets.window.adjustHeight();
}//close post loop
}


function createDiv(className)
{
var myDiv = document.createElement('div');
myDiv.setAttribute("class", className);
if (fontFace == "") {
if (typeof(font) != 'undefined')
{if (font.charAt(font.length - 1) == ";") font = font.substr(0, font.length - 1);
if(font.indexOf(" ")!=-1||font.indexOf(",")!=-1) myDiv.style.font = font; else myDiv.style.fontFamily=font;
}
}
else  myDiv.style.fontFamily = fontFace;
if (fontSize != "") myDiv.style.fontSize = fontSize;
return myDiv;
}


function createLink(href,target,title)
{

var myLink = document.createElement('a');
        if(href.substring(href.length-13,href.length)=="#comment-form") {href= href.substring(0,href.length-13)+"?utm_source=BP_recent"+"#comment-form";myLink.setAttribute("href", href);}
        else myLink.setAttribute("href", href+"?utm_source=BP_recent");
        myLink.setAttribute("target", target);
        myLink.setAttribute("title", title);
        if(!underline) myLink.style.textDecoration="none";
if (fontFace == "") {
if (typeof(font) != 'undefined')
{
if (font.charAt(font.length - 1) == ";") font = font.substr(0, font.length - 1);
if(font.indexOf(" ")!=-1||font.indexOf(",")!=-1) myLink.style.font = font; else myLink.style.fontFamily=font;
}
}
else  myLink.style.fontFamily = fontFace;
if (fontSize != "") myLink.style.fontSize = fontSize;
myLink.style.color = linkColor;
return myLink;
}
