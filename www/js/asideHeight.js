function calcAsideBar() {
    var titleEle = document.getElementById("title");
    var viewPortHeight = document.getElementById("title").clientHeight;

    var scrollTop = (titleEle.pageYOffset !== undefined) ? titleEle.pageYOffset : (titleEle).scrollTop;
    document.getElementById("asideBottom").style.top = (scrollTop + viewPortHeight - 4) +"px";
    if(document.getElementById("asTitle").scrollHeight > titleEle.scrollHeight)
    {

    }
    else(document.getElementById("asTitle").scrollHeight < titleEle.scrollHeight)
    {

        var difference = (titleEle.scrollHeight) - (document.getElementById("asTitle").scrollHeight);
        document.getElementById("asTitle").style.height = (document.getElementById("asTitle").scrollHeight) + difference + "px";
    }

}

function asideHeight () {
    var asideEle;
    var positionAsideBottom;
    var titleEle = document.getElementById("title");

    asideEle = document.getElementById("asTitle");
    asideEle.style.height = "100%";

    if(document.getElementById("asTitle").scrollHeight > titleEle.scrollHeight)
    {

    }
    else(document.getElementById("asTitle").scrollHeight < titleEle.scrollHeight)
    {

        var difference = (titleEle.scrollHeight) - (document.getElementById("asTitle").scrollHeight);
        document.getElementById("asTitle").style.height = (document.getElementById("asTitle").scrollHeight) + difference + "px";
    }

    positionAsideBottom = document.getElementById("asideBottom");
    positionAsideBottom.style.top = document.getElementById("title").clientHeight - 4 +"px";
    positionAsideBottom.style.width = "40%";
    positionAsideBottom.style.right = "0px";

    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    var sectionText = document.getElementById("sectionText");
    var sectionImage = document.getElementById("sectionId");

    if(screenWidth > screenHeight)
    {
        if(screenWidth >= 1600)
        {
            sectionImage.style.width = "60%";
            sectionText.style.width = "40%";
        }
        else
        {
            sectionImage.style.width = "50%";
            sectionText.style.width = "50%";
        }
    }
    else
    {
        sectionImage.style.width = "100%";
        sectionText.style.width = "100%";
    }
}
