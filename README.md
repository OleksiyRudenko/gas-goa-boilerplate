# GAS GOA boilerplate
A boilerplate code base for
Google Apps Script with Google OAuth cycle support
using [GOA library](http://ramblings.mcpher.com/Home/excelquirks/goa)
by Bruce Mcpherson.

## Usage
### Initialization
1. Create a directory for your app and enter it
1. Clone [this repo](https://github.com/danthareja/node-google-apps-script):
   `git clone https://github.com/OleksiyRudenko/gas-goa-boilerplate.git .`
1. [Bind the repository to a different remote](https://www.google.com/search?q=how+to+bind+local+git+repo+to+a+different+remote)
   if need so.
1. Go to terminal and install 
   [node-google-apps-script](https://github.com/danthareja/node-google-apps-script):
   `npm install node-google-apps-script`
1. On your [Google Drive](https://drive.google.com/) install
   Google Apps Script native app (_New > More > Connect more apps_)
   and create a new script at destination of your choice 
   on Google Drive. New script will open in GAS IDE.
1. In GAS IDE:
   * File > Manage versions: describe as 'Initialize project', 
     **Save new version**
   * Publish > Deploy as web app:
     - Project version = 1
     - Execute the app as = User accessing the web app
     - Who has access to the app = Anyone
     - **Deploy**
     - Take notes of Current web app URL (GAS-EXEC) and latest code URL (GAS-DEV)
   * Take note of script id (GAS-FILEID):
     it's a part of script URL in GAS IDE after `/d/` and before `/edit/`
     > Example: 'script.google.com/d/**1bXtoPZ7Eiw95m1SdkAGHK6BwtSvspbd5l23Ode4nqooD6UnP3t52bBzF**/edit?usp=drive_web&folder=0By_1gNcMlZs6SHc3UV9JY3hZdkU&splash=yes'
   * You may keep GAS-EXEC, GAS-DEV and GAS-FILEID in
     [gas-resources.md](gas-resources.md) for your future reference
   * Resources > Cloud Platform project: click the project link
1. Go to [DEV-CON](https://console.developers.google.com/apis/credentials)
   and choose your project:
   * Library > search for and enable:
     - **Google Drive API**
     - **Google Apps Marketplace SDK**
   * Credentials > Create credentials > OAuth client ID:
     - Application type = Other
     - Name = repository integration
     - **Create**, **OK**
     - download JSON and save as `repository-integration.json`
   * Credentials > Apps Script / Web application:
     - take note of **Client ID** and **Client secret**; these will
       be used in `src/auth.js:authOneOff()`
1. Go to terminal at your project root: `gapps auth path/to/repository-integration.json`
1. Checkout `init-gas` branch:
   * in terminal `gapps init GAS-FILEID`
   * DO NOT add new files that are created to your repo yet!
   * remove `Code.js` from `src/`
1. Checkout `master` branch:
   * `git commit -m 'update project config jason'` to update config
   * in `src/auth.js` change `clientId`, `clientSecret` as noted above,
     and `packageName` to something appropriate and unique
   * `gapps upload` to upload boilerplate code base
1. Go to GAS IDE:
   * refresh page; you must see the code base updated
   * Resources > Libraries:
     - Add library [cGoa](http://ramblings.mcpher.com/Home/excelquirks/goa/userresources)
       = `MZx5DzNPsYjVyZaR67xXJQai_d-phDA33`
     - Set library version = latest
   * Resources > Advanced Google services:
     - Enable **Drive API**, **Save**
   * File > Manage versions:
     - describe as 'boilerplate',
       **Save new version**
   * Publish > Deploy as web app:
     - Project version = 2
     - **Deploy**
   
### Publication for testers

#### GAS IDE
1. Publish > Register in Chrome Web Store

#### DEV CON
1. Credentials >
   * Apps Script: use GAS-EXEC URL to complete Authorised JavaScript origins
   * OAuth consent screen: complete mandatory fields
1. Dashboard >
   * Google Drive API > Drive UI Integration:
     - complete Application Name and Description
     - complete Application icons
     - Open URL = GAS EXEC
     - Secondary File Extensions = `pdf` and any other at your discretion
       (later you may complete other fields for MIME Types and Extensions)
     - **Save Changes**
   * Google Apps Marketplace SDK > Configuration:
     - tick 'Allow individual install' and 'Drive extension'
     - complete fields using icons (see `assets/` for e.g.)

#### [CWS](https://chrome.google.com/webstore/developer/dashboard?authuser=0)

### Development cycle
> It is recommended to follow a git-flow methodology/guidelines
> while developing any app.
1. Code
1. Update code base to GAS environment: `gapps upload`
1. Update publication
1. Go to item 1

### Going public
