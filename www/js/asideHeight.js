function calcAsideBar() {
    var titleEle = document.getElementById("title");
    var viewPortHeight = document.getElementById("title").clientHeight;

    var scrollTop = (titleEle.pageYOffset !== undefined) ? titleEle.pageYOffset : (titleEle).scrollTop;
    document.getElementById("asideBottom").style.top = (scrollTop + viewPortHeight - 4) +"px";
}

function asideHeight () {
    var titleScrollHeight;
    var asHeight;
    var asideEle;
    var positionAsideBottom;

    asideEle = document.getElementById("asTitle");
    titleScrollHeight = document.getElementById("title").clientHeight;
    asHeight = document.getElementById("asTitle").scrollHeight;
    if(asHeight <= titleScrollHeight) {
        asideEle.style.height = "100%";
    }
    else {
        asideEle.style.height = "auto";
    }


    positionAsideBottom = document.getElementById("asideBottom");
    positionAsideBottom.style.top = document.getElementById("title").clientHeight - 4 +"px";
    positionAsideBottom.style.width = "40%";
    positionAsideBottom.style.right = "0px";

    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    var sectionText = document.getElementById("sectionText");
    var sectionImage = document.getElementById("sectionId");
    if(document.getElementById("polAsideImg"))
    {
        asideEle.style.height = "auto";
    }
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
