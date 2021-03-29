function operateSidebar() {
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
    document.getElementById("handle").innerText = "‹";
}

function closeSidebar() {
    var sidebar = document.getElementById("sidebar");
    sidebar.classList.add("closed");
    sidebar.classList.remove("open");
    document.getElementById("handle").innerText = "›";
}