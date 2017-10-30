#!/bin/bash

# Wait 10 seconds before trying to connect to kafka
echo "starting zookeeper"


start cmd.exe /k "zkserver"
sleep 80
echo "starting kafka server"

start cmd.exe /k  "kafka-console-consumer.bat --zookeeper localhost:2181 --topic test"