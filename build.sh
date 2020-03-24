#!/usr/bin/env bash
yarn build
docker build -t front:1.0.0 .
docker tag front:1.0.0 registry.cn-hangzhou.aliyuncs.com/audio-deep-flow/front:1.0.0
docker push registry.cn-hangzhou.aliyuncs.com/audio-deep-flow/front:1.0.0
