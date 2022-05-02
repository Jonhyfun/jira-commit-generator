# How to install
`npm i -g @jonhyfun/jira-commit-generator`

The idea of this package is to have a commit command that always asks for a task id and a commit type
to have a common pattern of commits and help link them to jira tasks or look them up later...

Sorry english speaking folks, one day i will have better docs and a way to set the localization.

This package uses **git-commit-msg-linter** to prevent "bad commits" altought i havent implement anything besides the default properties.

Unfortunatelly there is no config for it yet.


# How to use
Once you installed the package, you will have the command `commit` available anywhere in your machine

you can use it like 

```js
commit my message
```

after you run the command it will ask for the jira task id (NAME-1234) and what type of commit it is.

For now, unfortunately there is no way to configure (without building your own version) what kind of types you will have available, i cherry picked from conventional commits those that i think are a good practice.

you can also use the `-a` and `-p` tags

the `-a` tag runs `git add .` prior to commiting and `-p` runs `git push` after commiting

of course you can combine both with 

```js
commit -a -p my message
```