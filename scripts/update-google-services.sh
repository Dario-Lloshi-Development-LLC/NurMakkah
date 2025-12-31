#!/usr/bin/env bash
set -euo pipefail

# Helper: place google-services.json into Android app directory
# Usage: ./scripts/update-google-services.sh /path/to/google-services.json

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 /path/to/google-services.json"
  exit 1
fi

SRC="$1"
DEST="android/app/google-services.json"

if [ ! -f "$SRC" ]; then
  echo "Source file not found: $SRC"
  exit 2
fi

cp "$SRC" "$DEST"
echo "Copied $SRC -> $DEST"
