#!/bin/bash

port="$1"

if [ -z "$port" ]; then
    echo "Port is empty"
    exit 1
fi

echo "Killing process on port $port"
kill -9 "$(lsof -t -i:"$port")"

if [ $? -eq 0 ]; then
    echo "Process killed successfully."
else
    echo "Failed to kill the process."
fi
