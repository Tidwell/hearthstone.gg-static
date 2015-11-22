#!/usr/bin/env bash

status=`git status`;
echo ${status};
if [[ ${status} == 'On branch deploy-git-check nothing to commit, working directory clean' ]]
then
	echo 'Git okay, ready to deploy';
else
	echo 'Files not commited to git.  Do that before deploy.';
	exit 1;
fi
read -p "Are you sure? " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
	echo 'Building Files...';
	grunt build;
	echo 'Build Done.';
	echo 'Syncing Files to remote server...';
	rsync -a build/ aarontidwell@scrollstoolbox.com:/www/hearthstone.gg-static;
	echo 'Deploy Done.';
fi