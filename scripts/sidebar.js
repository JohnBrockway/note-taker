function operateSidebar() {
    console.log("test");
    if (document.getElementById("sidebar").classList.contains("open")) {
        closeSidebar();
    } else {
        openSidebar();
    }
}

function openSidebar() {
    var sidebar = document.getElementById("sidebar");
    sidebar.classList.add("open");
    sidebar.classList.remove("closed");
}

function closeSidebar() {
    var sidebar = document.getElementById("sidebar");
    sidebar.classList.add("closed");
    sidebar.classList.remove("open");
}