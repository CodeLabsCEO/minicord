// Import the Discord API library
const DiscordAPI = require('discord-api');

// Create a new Discord API client
const client = new DiscordAPI.Client();

// Wait for the client to be ready before modifying the Discord interface
client.on('ready', () => {
  // Get the main Discord application window
  const appWindow = client.getWindow('app');

  // Get the web contents of the main window
  const appContents = appWindow.getWebContents();

  // Wait for the contents to finish loading before modifying the page
  appContents.on('did-finish-load', () => {
    // Execute JavaScript code on the page to remove unnecessary elements
    appContents.executeJavaScript(`
      // Remove the left sidebar.
      document.querySelector('.sidebar-2K8pFh').remove();

      // Remove the top navigation bar.
      document.querySelector('.header-2RyJ0Y').remove();

      // Remove the right sidebar.
      document.querySelector('.contentColumn-2hrIYH').nextSibling.remove();
    `);
  });
});

// Log in to the Discord API
client.login('');


localStorage.getItem('token');
const { session } = require('electron');
const tough = require('tough-cookie');
const electronCookies = require('electron-cookies');

// Get the current session object
const electronSession = session.defaultSession;

// Set the session's cookie store to electron-cookies
electronCookies.set({
  session: electronSession,
  overwrite: true,
  autoSession: true,
  expiration: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Set cookie expiration to 30 days from now
  options: {
    httpOnly: true,
    secure: true
  },
  domain: 'discord.com',
  path: '/'
});

// Create a new cookie jar
const cookieJar = new tough.CookieJar();

// Add the login cookie to the cookie jar
const loginCookie = new tough.Cookie({
  key: 'login',
  value: 'your-login-token',
  domain: 'discord.com',
  path: '/',
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Set cookie expiration to 30 days from now
  httpOnly: true,
  secure: true
});
cookieJar.setCookieSync(loginCookie.toString(), 'https://discord.com');

// Set the session's cookie jar to the new cookie jar
electronSession.cookies.set({
  url: 'https://discord.com',
  name: 'login',
  value: 'your-login-token',
  domain: 'discord.com',
  path: '/',
  httpOnly: true,
  secure: true,
  expirationDate: Date.now() + 30 * 24 * 60 * 60 * 1000 // Set cookie expiration to 30 days from now
});
