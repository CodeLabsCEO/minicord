// Wait for the page to finish loading before modifying it.
mainWindow.webContents.on('did-finish-load', () => {
  // Execute JavaScript code on the page to remove unnecessary elements.
  mainWindow.webContents.executeJavaScript(`
    // Remove the left sidebar.
    document.querySelector('.sidebar-2K8pFh').remove();

    // Remove the top navigation bar.
    document.querySelector('.header-2RyJ0Y').remove();

    // Remove the right sidebar.
    document.querySelector('.contentColumn-2hrIYH').nextSibling.remove();
  `);
});
