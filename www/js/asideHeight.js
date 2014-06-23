function calcAsideBar() {
    var titleEle = document.getElementById("title");
    var viewPortHeight = document.getElementById("title").clientHeight;

    console.log("Scroll detected...");
    var scrollTop = (titleEle.pageYOffset !== undefined) ? titleEle.pageYOffset : (titleEle).scrollTop;
    document.getElementById("asideBottom").style.top = (scrollTop + viewPortHeight - 4) +"px";
    console.log(scrollTop);
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
}
