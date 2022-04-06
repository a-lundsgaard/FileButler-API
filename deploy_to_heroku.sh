echo "Building docker image for linux/amd64\n"
docker buildx build --platform linux/amd64 -t ocr-api-1 . &&

echo "\nTagging image for registry\n"
docker tag ocr-api-1 registry.heroku.com/ocr-api-1/web &&

echo "\nPushing docker image for registry container\n"
docker push registry.heroku.com/ocr-api-1/web &&

echo "\nReleasing build to production\n"
heroku container:release web -a ocr-api-1