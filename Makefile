.PHONY: install build deploy

install:
	npm install

build:
	npm run build

# TODO: Add --cache-control max-age=3600, GZIP encode here or on CloudFront
deploy:
	aws s3 sync public/ s3://city-bureau-demos/report-cards --acl=public-read --recursive
