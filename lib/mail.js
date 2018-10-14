const Imap = require('imap');

const fetchMailCount = (folder, options) => new Promise((resolve, reject) => {
    const imap = new Imap(options);

    imap.once('ready', () => {
        imap.openBox(folder, true, function (err, box) {
            if (err) return reject(err);
            imap.end();
            resolve(box.messages.total);
        })
    });

    imap.once('error', reject);

    imap.connect();
});

const fetchQuota = (options) => new Promise((resolve, reject) => {
    const imap = new Imap(options);

    imap.once('ready', () => {
        imap.getQuotaRoot('INBOX', (err,  quotalist) => {
            if(err) return reject(err);
            resolve(quotalist)
        });
    });

    imap.once('error', reject);

    imap.connect();
});

module.exports = {
    fetchMailCount,
    fetchQuota
};