#!/bin/bash

echo $(pwd)
docker build --no-cache --tag shorwaits-backend .
