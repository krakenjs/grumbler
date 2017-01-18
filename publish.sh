#!/bin/sh

set -e;

rm -rf node_modules
npm install

gulp build;

git add dist;
git commit -m "Dist" || echo "Nothing to distribute";

npm version patch

git push;
git push --tags;
npm publish;
