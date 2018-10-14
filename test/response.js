import test from 'ava';

import config from '../lib/config';
import response from '../lib/response';


test('integration test for response', async t => {
    if (!process.env.MAILBOX_URL) {
        throw new Error("You unable to perform integration test without environment variable MAILBOX_URL.");
    }

    const cfg = config({
        MAILBOX_main_URL: process.env.MAILBOX_URL
    });

    const result = response(cfg);
    t.true(typeof result === 'object');
    t.true(typeof result.main === 'object');
    t.true('INBOX' in result.main.folders);
    t.true(result.main.quota !== undefined);
});

