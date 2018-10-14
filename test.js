import test from 'ava';

const config = require('./lib/config');
const mail = require('./lib/mail');
const response = require('./lib/response');

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


test('integration test for fetchMailCount', async t => {
    if (!process.env.MAILBOX_URL) {
        throw new Error("You unable to perform integration test without environment variable MAILBOX_URL.");
    }
    const mbox = config({
        MAILBOX_main_URL: process.env.MAILBOX_URL
    })[0];
    const result = await mail.fetchMailCount('INBOX', mbox.connection);
    t.true(typeof result === 'number');
});

test('integration test for fetchQuota', async t => {
    if (!process.env.MAILBOX_URL) {
        throw new Error("You unable to perform integration test without environment variable MAILBOX_URL.");
    }

    const mbox = config({
        MAILBOX_main_URL: process.env.MAILBOX_URL
    })[0];

    const result = await mail.fetchQuota(mbox.connection);
    t.true(typeof result === 'object');
});

test('integration test for response', async t => {
    if (!process.env.MAILBOX_URL) {
        throw new Error("You unable to perform integration test without environment variable MAILBOX_URL.");
    }

    const cfg = config({
        MAILBOX_main_URL: process.env.MAILBOX_URL
    });
    console.log(cfg);

    const result = response(cfg);
    t.true(typeof result === 'object');
    t.true(typeof result.main === 'object');
    t.true('INBOX' in result.main.folders);
    t.true(result.main.quota !== undefined);
});

