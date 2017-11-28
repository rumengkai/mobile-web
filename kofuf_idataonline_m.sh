#!/bin/bash
date_dir=m_`date +%Y_%m_%d`
echo ${date_dir}
cp -r /home/gongfu/third/nginx/html/m /home/gongfu/third/nginx/html/backups/${date_dir}
echo 'BACKUPS SUCCESS'
rm -rf /home/gongfu/third/nginx/html/m/*
cp -r /home/gongfu/code/mobile_web/dist/m/* /home/gongfu/third/nginx/html/m/
echo 'UPDATE SUCCESS'
