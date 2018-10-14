import test from "ava/index";
const config = require('../lib/config');

test('test parsing config', t => {
    const result = config({
        MAILBOX_nice_URL: 'imap://login:password@host'
    });
    const expected = [
        {
            label: 'nice',
            connection: {
                host: 'host',
                password: 'password',
                port: 143,
                tls: false,
                user: 'login',
            },
            folders: ['INBOX']
        }
    ];
    t.deepEqual(expected, result)
});
