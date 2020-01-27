javascript:(function() {
  let match = location.href.match(/\/entries\/([-0-9a-f]+)/);
  if (!match) {
    alert('Not a Media-Archive URL!');
    return;
  }
  
  let MEDIA_ENTRY_ID = match[1];
  let MEDIA_ARCHIVE_BASE_URL = 'https://medienarchiv.zhdk.ch';
  let RV_PLAYER_BASE = 'https://rv-dev.process.studio';
  let video_url = encodeURIComponent(`${MEDIA_ARCHIVE_BASE_URL}/api/media-entries/${MEDIA_ENTRY_ID}/media-file/data-stream`);
  let annotations_url = encodeURIComponent(`${MEDIA_ARCHIVE_BASE_URL}/api/media-entries/${MEDIA_ENTRY_ID}/meta-data/research_video:rv_annotations/data-stream`);
  let rv_player_url=`${RV_PLAYER_BASE}/?video=${video_url}&annotations=${annotations_url}`;
  console.log(`Your RV URL:\n${rv_player_url}`);
  
  const el = document.createElement('textarea');
  el.value = rv_player_url;
  document.body.appendChild(el);
  el.select();
  let success = document.execCommand('copy');
  document.body.removeChild(el);
  console.log(success);  alert(`Your Research Video URL${success?' has been copied to the clipboard!':':'}\n\n${rv_player_url}`);
})();
