import test from "ava/index";
const config = require('../lib/config');
const mail = require('../lib/mail');

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
