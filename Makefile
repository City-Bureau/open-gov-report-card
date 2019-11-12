PREFIX = report-cards-stg
.PHONY: clean install build deploy

clean:
	rm -rf public

install:
	npm install

build:
	npm run build

deploy:
	aws s3 sync public/ s3://${S3_BUCKET}/$(PREFIX) --acl=public-read --cache-control max-age=10800
	aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_ID} --paths /$(PREFIX)/*

data/agencies.csv:
	node ./scripts/create-data.js
