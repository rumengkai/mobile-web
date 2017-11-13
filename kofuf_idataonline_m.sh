#!/bin/bash
rm -rf /home/gongfu/third/nginx/html/m/*
cp -r /home/gongfu/code/mobile_web/dist/m/* /home/gongfu/third/nginx/html/m/
echo 'SUCCESS'
