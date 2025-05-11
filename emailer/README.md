# cat-herder-js emailer

Node process to send out periodic emails for cat-herder

## dev

Secrets stored in `.env`

```bash
# .env
from=
projectId=
awsKey=
awsSecret=
```

Updates automatically by checking Git. Manually update via ssh

```bash
# ssh into server. see dotfiles for pw
ssh_linode_playground

# get into repo
cd git/cat-herder-js/emailer
nvm use

# manually reboot server
npm run kill
npm run bg
```
