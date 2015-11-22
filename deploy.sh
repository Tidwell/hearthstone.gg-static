#!/usr/bin/env bash


if [ -n "$(git status --porcelain)" ]; then 
	echo 'Files not commited to git.  Do that before deploy.';
	exit 1;
fi
if [ -n "git diff-index --quiet HEAD --"]; then
	echo 'Files not pushed upstream via git.  Do that before deploy.'
	exit 1;
fi

read -p "Are you sure you want to deploy?  This will replace *everything* on the server. (y/n) " -n 1 -r
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