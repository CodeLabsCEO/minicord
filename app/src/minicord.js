// Import the necessary modules
const { app, BrowserWindow } = require('electron');
const electronCookies = require('electron-cookies');

// Set up the Electron app
app.whenReady().then(() => {
  // Create a new browser window
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
    }
  });

  // Load the Discord homepage
  mainWindow.loadURL('https://discord.com/');

  // Wait for the page to finish loading
  mainWindow.webContents.on('did-finish-load', () => {
    // Remove unnecessary elements from the page
    mainWindow.webContents.executeJavaScript(`
      // Remove the left sidebar.
      let leftSidebar = document.querySelector('.sidebar-2K8pFh');
      if (leftSidebar) {
        leftSidebar.remove();
      }

      // Remove the top navigation bar.
      let topNav = document.querySelector('.header-2RyJ0Y');
      if (topNav) {
        topNav.remove();
      }

      // Remove the right sidebar.
      let rightSidebar = document.querySelector('.contentColumn-2hrIYH').nextSibling;
      if (rightSidebar) {
        rightSidebar.remove();
      }

      // Remove the chat input box.
      let chatInput = document.querySelector('.content-1x5b-n');
      if (chatInput) {
        chatInput.remove();
      }

      // Remove the channel list.
      let channelList = document.querySelector('.wrapper-21YSNc');
      if (channelList) {
        channelList.remove();
      }

      // Remove the server list.
      let serverList = document.querySelector('.guilds-1SWlCJ');
      if (serverList) {
        serverList.remove();
      }

      // Remove the voice channels.
      let voiceChannels = document.querySelector('.voice-states-3n2Ybj');
      if (voiceChannels) {
        voiceChannels.remove();
      }

      // Remove the search bar.
      let searchBar = document.querySelector('.search-bar-1rSv_i');
      if (searchBar) {
        searchBar.remove();
      }

      // Remove the friend list.
      let friendList = document.querySelector('.friendsColumn-1nJZlM');
      if (friendList) {
        friendList.remove();
      }

      // Remove the user popout.
      let userPopout = document.querySelector('.userPopout-4pfA0d');
      if (userPopout) {
        userPopout.remove();
      }

      // Remove the unread messages indicator.
      let unreadIndicator = document.querySelector('.unread-3ZGqI0');
      if (unreadIndicator) {
        unreadIndicator.remove();
      }

      // Remove the server settings button.
      let serverSettingsButton = document.querySelector('.item-PXvHYJ:nth-child(1)');
      if (serverSettingsButton) {
        serverSettingsButton.remove();
      }

      // Remove the direct message button.
      let dmButton = document.querySelector('.item-PXvHYJ:nth-child(2)');
      if (dmButton) {
        dmButton.remove();
      }

      // Remove the discord logo.
      let logo = document.querySelector('.logo-3Gkjwa');
      if (logo) {
        logo.remove();
      }

      // Remove everything except the recent icon
      let container = document.querySelector('.app-19DXfJ');
      if (container) {
        let children = container.children;
        for (let i = 0; i < children.length; i++) {
          if (children[i].className !== 'chat-3bRxxu') {
            children[i].remove();
          }
        }
      }

      // Make the recent icon visible
      let recentsIcon = document.querySelector('.avatarSmall-1PJo8j[aria-label="Recent Mentions"]');
      if (recentsIcon) {
        recentsIcon.style.display = 'block';
      }
    `);

    // Save the session cookies for future use
    electronCookies.get({ url: 'https://discord.com/' }).then(cookies => {
      electronCookies.set({ url: 'https://discord.com/', name: 'cookies', value: JSON.stringify(cookies) });
    });
  });

  // Save the session cookies when the app is about to quit
  app.on('before-quit', () => {
    mainWindow.webContents.executeJavaScript(`
      ${electronCookies.get({ url: 'https://discord.com/' }).then(cookies => {
        electronCookies.set({ url: 'https://discord.com/', name: 'cookies', value: JSON.stringify(cookies) });
      })}
    `);
  });
});

// Restore the session cookies when the app starts
electronCookies.on('changed', (event, cookie, cause, removed) => {
  if (cookie.name === 'cookies' && !removed) {
    electronCookies.set({ url: 'https://discord.com/', value: JSON.parse(cookie.value) });
  }
});
