#!/usr/bin/env bash
set -euo pipefail

BUCKET="apatite-website-dev"
CLOUDFRONT_DISTRIBUTION_ID="E2WQKTMYXU1XZN"
DIST="dist"

echo "Building..."
npm run build

echo "Deploying to s3://$BUCKET"

# Upload hashed assets (JS, CSS, images) with long-lived cache
aws s3 sync "$DIST/assets" "s3://$BUCKET/assets" \
  --delete \
  --cache-control "public, max-age=31536000, immutable"

# Upload HTML files explicitly with correct content type
find "$DIST" -maxdepth 1 -name "*.html" | while read -r file; do
  key=$(basename "$file")
  aws s3 cp "$file" "s3://$BUCKET/$key" \
    --content-type "text/html" \
    --cache-control "no-cache, no-store, must-revalidate"
done

# Upload PNG images with correct content type
find "$DIST" -maxdepth 1 -name "*.png" | while read -r file; do
  key=$(basename "$file")
  aws s3 cp "$file" "s3://$BUCKET/$key" \
    --content-type "image/png" \
    --cache-control "no-cache, no-store, must-revalidate"
done

# Upload SVGs with correct content type
find "$DIST" -maxdepth 1 -name "*.svg" | while read -r file; do
  key=$(basename "$file")
  aws s3 cp "$file" "s3://$BUCKET/$key" \
    --content-type "image/svg+xml" \
    --cache-control "no-cache, no-store, must-revalidate"
done

# Upload ICO with correct content type
find "$DIST" -maxdepth 1 -name "*.ico" | while read -r file; do
  key=$(basename "$file")
  aws s3 cp "$file" "s3://$BUCKET/$key" \
    --content-type "image/x-icon" \
    --cache-control "no-cache, no-store, must-revalidate"
done

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
  --paths "/*" > /dev/null

echo "Done."
echo "  S3 Bucket:  https://apatite-website-dev.s3.ap-southeast-2.amazonaws.com"
echo "  Live URL:   https://website-dev.apatite.io"
