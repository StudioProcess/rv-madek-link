#!/usr/bin/env sh

if (( $# == 0 )); then
   echo "Usage:   $0 MEDIA_ENTRY_ID"
   echo "Example: $0 f5b78e56-a229-4295-a4cc-0311e6534207"
   exit 1
fi

MEDIA_ENTRY_ID=$1
MEDIA_ARCHIVE_BASE_URL='https://medienarchiv.zhdk.ch'
RV_PLAYER_BASE='https://rv-dev.process.studio'

function uriencode { jq -nr --arg v "$1" '$v|@uri'; }

VIDEO_URL="${MEDIA_ARCHIVE_BASE_URL}/api/media-entries/${MEDIA_ENTRY_ID}/media-file/data-stream"
VIDEO_URL_ENCODED=$(uriencode ${VIDEO_URL})

ANNOTATIONS_URL="${MEDIA_ARCHIVE_BASE_URL}/api/media-entries/${MEDIA_ENTRY_ID}/meta-data/research_video:rv_annotations/data-stream"
ANNOTATIONS_URL_ENCODED=$(uriencode ${ANNOTATIONS_URL})

RV_PLAYER_URL="${RV_PLAYER_BASE}/?video=${VIDEO_URL_ENCODED}&annotations=${ANNOTATIONS_URL_ENCODED}"

echo "$RV_PLAYER_URL"
