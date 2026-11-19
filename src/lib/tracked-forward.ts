/**
 * Tiny HTML page for a short link that has to be counted before it leaves the site.
 * An instant redirect never runs Statcounter. This page loads the counter, then forwards.
 * Statcounter records the hit with sendBeacon, which still completes after navigation.
 */
const SC_PROJECT = 13368194;
const SC_SECURITY = "26fccc6d";

export function trackedForwardHtml(message: string, destination: string): string {
  const destAttr = destination.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  const destJs = JSON.stringify(destination);
  const messageText = message.replace(/&/g, "&amp;").replace(/</g, "&lt;");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${messageText}</title>
</head>
<body style="margin:0;min-height:100vh;display:grid;place-items:center;background:#f4f6f8;color:#1c3145;font-family:system-ui,sans-serif">
<p style="margin:0;font-size:1.05rem">${messageText}</p>
<script>
var sc_project=${SC_PROJECT};
var sc_invisible=1;
var sc_security="${SC_SECURITY}";
var scLeft=false;
function scGo(){if(scLeft)return;scLeft=true;location.replace(${destJs});}
setTimeout(scGo,1500);
</script>
<script src="https://www.statcounter.com/counter/counter.js" onload="setTimeout(scGo,200)"></script>
<noscript>
<div class="statcounter"><img class="statcounter" src="https://c.statcounter.com/${SC_PROJECT}/0/${SC_SECURITY}/1/" alt="" referrerpolicy="no-referrer-when-downgrade"></div>
<meta http-equiv="refresh" content="1;url=${destAttr}">
</noscript>
</body>
</html>`;
}
