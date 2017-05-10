const manual_list = [
    {
        title: "Test Manual",
        manual: "this is a test for a manual"
    },
    {
        title: "Morsecode",
        manual: '<img src="http://apfelmus.nfshost.com/articles/fun-with-morse-code/morse-table.png" alt="" style="max-width: 100%; max-height: 100%;">'
    },
]


var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {


    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {

    }
};

app.initialize();

const pageids = [
    "man-page",
    "time-page",
    "hints-page"
];

window.addEventListener("load", () => {
    let tabItems = Array.from(document.getElementsByClassName('tabitem'));
    for (item of tabItems) {
        item.addEventListener("click", handleTabItemClickEvent)
    }

    let pages = Array.from(document.getElementsByClassName('page'));
    for (p of pages) {
        if(p.id == "man-page") continue;

        p.style.display = "none";
    }


    function handleTabItemClickEvent(e) {
        let target = e.currentTarget;
        let pageToOpen = target.dataset.page;

        for (item of tabItems) {
            item.classList.remove("selected");
        }

        target.classList.add("selected");

        for (pid of pageids) {
            let display = pid == pageToOpen ? "block" : "none";
            document.getElementById(pid).style.display = display;
        }
    }

    console.log("[INIT]", "loading manuals")
    let ul = document.getElementById("manuals");

    let manualscreen = document.getElementById("manual-screen");
    manualscreen.style.display = "none";

    let manualback = document.getElementById('manual-back');
    manualback.addEventListener("click", handleManualCloseEvent);

    function handleManualCloseEvent() {
        manualscreen.style.display = "none";
    }

    function handleManualscreenEvent(e) {
        let doc = e.currentTarget;
        let m = manual_list[doc.dataset.index];

        manualscreen.style.display = "block";

        let content = document.getElementById('manual-content');
        content.innerHTML = m.manual;

        let titelbar = document.getElementById('manual-title');
        titelbar.innerHTML = m.title;
    }


    var index = 0;
    for (m of manual_list) {
        let li = document.createElement("li");
        let span = document.createElement("span");
        let next_icon = document.createElement("i");

        next_icon.classList.add("fa");
        next_icon.classList.add("fa-angle-right");
        next_icon.setAttribute("aria-hidden", "true");

        span.appendChild(document.createTextNode(m.title));

        li.appendChild(span);
        li.appendChild(next_icon);
        li.setAttribute("data-index", "" + index++);

        li.addEventListener("click", handleManualscreenEvent);

        ul.appendChild(li);
    }


});
