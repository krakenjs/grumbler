#!/bin/sh

set -e;

sudo npm install -g flow-bin
sudo npm install -g flow-typed

npm install
flow-typed install
