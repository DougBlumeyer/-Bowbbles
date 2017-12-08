deploy:
	cf push rainbowbbles -b https://github.com/cloudfoundry/staticfile-buildpack.git -m 64m
