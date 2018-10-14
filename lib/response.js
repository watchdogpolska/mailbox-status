const mail = require('./mail');


const map_obj = (inputs, key, callback) => {
    const result = {};
    if (callback === undefined) {
        callback = key;
        for (input of inputs) {
            result[input] = callback(input);
        }
    } else {
        for (input of inputs) {
            result[input[key]] = callback(input);
        }
    }
    return result;
};

/*
Example output:

data = { main:
   { quota: Promise { <pending> },
     folders: { INBOX: Promise { <pending> } } } }
*/
module.exports = (cfg) => map_obj(cfg, 'label', mbox => ({
    quota: mail.fetchQuota(mbox.connection)
        .catch(() => null),
    folders: map_obj(mbox.folders, folder =>
        mail.fetchMailCount(folder, mbox.connection)
            .catch(() => null)
    )
}));