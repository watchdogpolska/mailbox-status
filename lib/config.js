const getImapOptions = imapUrl => {
    const parsed_url = new URL(imapUrl);
    return {
        user: parsed_url.username ?
            decodeURIComponent(parsed_url.username) :
            undefined,
        password: parsed_url.password ?
            decodeURIComponent(parsed_url.password) :
            undefined,
        host: parsed_url.hostname,
        port: parsed_url.protocol === 'imaps:' ?
            parsed_url.port || 993 :
            parsed_url.port || 143,
        tls: parsed_url.protocol === 'imaps:',
    };
};

module.exports = (data) => {
    // MAILBOX_label_URL=imap://xxxx:xx@host:port/
    // MAILBOX_label_FOLDER=
    return Object.keys(data)
        .map(x => x.toLowerCase())
        .map(x => x.match(/MAILBOX_(.+?)_URL/))
        .filter(x => !!x)
        .map(([env, label]) => ({
            label: label,
            folders: (data[`MAILBOX_${label}_FOLDER`] || 'INBOX').split(','),
            connection: getImapOptions(data[env])
        }));
};