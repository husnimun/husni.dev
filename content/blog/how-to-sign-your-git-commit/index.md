---
title: How to Sign Your Git Commit
date: "2020-06-15"
description: "How to sign your git commit"
---

Today I learned that you can sign your git commit with GPG.
Before you can sign your commit, you need to have a GPG keypair configured on your machine.

To generate a GPG keypair, run the following command.
```bash
gpg --full-generate-key
```

Once you have a private key, you can sign your commit with `-S` flag.
```bash
$ git commit -S -m "your commit message"
```

You can sign all commits by default in any local repository by running the following command.
```bash
git config --global commit.gpgsign true
```

You can also [add your GPG key to your Github account](https://docs.github.com/en/github/authenticating-to-github/adding-a-new-gpg-key-to-your-github-account) so that they can verify your commits' signature.
