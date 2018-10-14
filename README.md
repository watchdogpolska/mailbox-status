# mailbox-status

[![Build Status](https://travis-ci.com/watchdogpolska/mailbox-status.svg?branch=master)](https://travis-ci.com/watchdogpolska/mailbox-status)
[![Docker Repository on Quay](https://quay.io/repository/watchdogpolska/mailbox-status/status "Docker Repository on Quay")](https://quay.io/repository/watchdogpolska/mailbox-status)

A stateless service designed to provide information about selected mailboxes in the field of eg. 
the number of messages, the quota.

## Configuration

Configuration takes place via environment variables. The following environment variables are supported:

Name                      | Description 
--------------------------| -----------
```MAILBOX_*_URL```       | URL connection to access mailbox. Example ````imap+ssl://user:pass@localhost/````
```MAILBOX_*_FOLDER```    | Comma seperated list of folders to count messages.

It is worth noting that the detailed scope of information will depend on the mailbox provider.

## Example response

```json
{
  "hekko": {
    "quota": {},
    "folders": {
      "INBOX": 0
    }
  },
  "feder": {
    "quota": {
      "user": {
        "storage": {
          "usage": 3571343,
          "limit": 5242880
        }
      }
    },
    "folders": {
      "INBOX": 0
    }
  }
}
```