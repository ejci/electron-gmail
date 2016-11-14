const {ipcRenderer} = require('electron')

window.onload = function () {
    var $ = require('./jquery-3.1.1.min.js');
    window.gmail = require('./gmail.js').Gmail($);
    //$('div[role="banner"] > div:first-child').css('padding-top', '20px');
    gmail.observe.on("load", function (params) {
        ipcRenderer.send("gmail-poll", gmail.get.unread_emails());
        gmail.observe.on('poll', function () {
            ipcRenderer.send("gmail-poll", gmail.get.unread_emails());
        });

        gmail.observe.on("new_email", function (id, url, body, xhr) {
            //?notification
            gmail.get.email_data(id, function (email) {
                ipcRenderer.send("gmail-new_email", email);
            });
            ipcRenderer.send("gmail-poll", gmail.get.unread_emails());

        });

    })
};

