.PHONY: clean install build deploy

clean:
	rm -rf public

install:
	npm install

build:
	npm run build

# TODO: Add --cache-control max-age=3600, GZIP encode here or on CloudFront
deploy:
	aws s3 sync public/ s3://${S3_BUCKET}/report-cards --acl=public-read
