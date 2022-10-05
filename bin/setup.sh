#!/usr/bin/env sh

if [[ $(gcloud config configurations list | grep -m1 rainbowbbles-ii) ]] ; then
	echo "The 'rainbowbbles-ii' configuration already exists."
else
	gcloud config configurations create rainbowbbles-ii
fi
gcloud config configurations activate rainbowbbles-ii
