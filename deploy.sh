#!/usr/bin/env bash

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