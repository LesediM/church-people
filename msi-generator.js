var electronInstaller = require('electron-winstaller');

var resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: './church-people-win32-ia32',
    outputDirectory: './release',
    authors: 'kcc',
    exe: 'church-people.exe'
});

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));