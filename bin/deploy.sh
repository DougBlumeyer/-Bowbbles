#!/usr/bin/env sh

gcloud config set project rainbowbbles-ii
gcloud config set account kingwoodchuckii@gmail.com
gcloud auth login kingwoodchuckii@gmail.com

gcloud app deploy -q
