PREFIX = report-cards-stg
.PHONY: clean install build deploy

clean:
	rm -rf public

install:
	npm install

build:
	npm run build

# TODO: Add --cache-control max-age=3600
deploy:
	aws s3 sync public/ s3://${S3_BUCKET}/$(PREFIX) --acl=public-read
	aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_ID} --paths /$(PREFIX)/*
