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
    var main = document.getElementById("main");
    main.classList.add("sidebarOpen");
    main.classList.remove("sidebarClosed");
}

function closeSidebar() {
    var sidebar = document.getElementById("sidebar");
    sidebar.classList.add("closed");
    sidebar.classList.remove("open");
    var main = document.getElementById("main");
    main.classList.add("sidebarClosed");
    main.classList.remove("sidebarOpen");
}