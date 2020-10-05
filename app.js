const
    path = require("path"),
    url = require("url"),
    { app, BrowserWindow, ipcMain, Menu } = require("electron");

let win;

function createWindow() {
    
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    
    loadDefaultPage();

    ipcMain.on("current", (a, b)=> {

        loadCurrentPage(b);

    });

    const main_menu = Menu.buildFromTemplate([
        {
            label: "Project",
            enabled: false,
            submenu: [
                {
                    label: "Quit",
                    click() {

                        loadDefaultPage();

                    }
                },
                {
                    label: "Reload",
                    role: "reload"
                },
            ]
        },
        {
            label: "Edit",
            submenu: [
                {
                    label: "Toggle dev. tools",
                    role: "toggleDevTools"
                },
                {
                    label: "Copy",
                    role: "copy"
                },
                {
                    label: "Paste",
                    role: "paste"
                },
                {
                    label: "Cut",
                    role: "cut"
                },
            ]
        },
    ])

    Menu.setApplicationMenu(main_menu);
    
    win.on("closed", ()=> win = null);
    
}

function loadDefaultPage() {

    win.loadURL(
        url.format({
            pathname: path.join(__dirname, "index.html"),
            protocol: "file:",
            slashes: true
        })
    );

}
function loadCurrentPage(host) {

    win.loadURL(host);

}

app.on("ready", createWindow);
app.on("window-all-closed", app.quit);