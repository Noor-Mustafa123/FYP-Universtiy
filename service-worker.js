// This is the "Offline copy of pages" service worker

const CACHE = "pwabuilder-offline";

// Add list of files to cache here.
let filesToCache = [
    "FYP%20Project/index.html",
    "FYP%20Project/product.html",
    "FYP%20Project/signIn.html",
    "FYP%20Project/signUp.html",
    "FYP%20Project/adminDashboard.html"
];

self.addEventListener("install", function (event) {
    console.log("[PWA Builder] Install Event processing");

    event.waitUntil(
        caches.open(CACHE).then(function (cache) {
            console.log("[PWA Builder] Cached offline page during install");

            return cache.addAll(filesToCache).catch(function (error) {
                console.error('Error in addAll. Failed to cache files:', error);
            });
        })
    );
});

self.addEventListener("fetch", function (event) {
    if (event.request.method !== "GET") return;

    event.respondWith(
        fetch(event.request).catch(function (error) {
            console.log("[PWA Builder] Network request Failed. Serving content from cache: " + error);

            return caches.open(CACHE).then(function (cache) {
                return cache.match(event.request).then(function (matching) {
                    let report = !matching || matching.status == 404 ? Promise.reject("no-match") : matching;
                    return report
                });
            });
        })
    );
});