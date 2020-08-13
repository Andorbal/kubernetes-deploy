npm version minor
VERSION=$(jq -r .version package.json)
docker build -t node-app:$VERSION .
echo $VERSION