
// ============================================================
// REYNARD ENHANCED EDITION - Performance & Stability Tweaks
// Append this to the END of mobile.js before building
// ============================================================

// --- GC / Memory Tuning ---
pref("javascript.options.gc_on_memory_pressure", true);
pref("javascript.options.mem.gc_incremental_slice_ms", 5);
pref("javascript.options.mem.gc_allocation_threshold_mb", 20);
pref("javascript.options.mem.nursery.max_kb", 8192);
pref("javascript.options.mem.gc_high_frequency_time_limit_ms", 500);
pref("javascript.options.mem.gc_low_frequency_heap_growth", 120);
pref("javascript.options.mem.gc_high_frequency_heap_growth_min", 120);
pref("javascript.options.mem.gc_high_frequency_heap_growth_max", 200);
pref("javascript.options.compact_on_user_inactive", true);
pref("javascript.options.compact_on_user_inactive_delay", 10000);
pref("dom.ipc.processCount", 1);
pref("dom.ipc.processCount.webIsolated", 1);
pref("dom.ipc.processPrelaunch.enabled", false);
pref("browser.tabs.remote.autostart", true);
pref("browser.tabs.remote.enforceInProcess", true);

// --- Memory Limits ---
pref("browser.cache.memory.capacity", 16384);
pref("browser.cache.memory.max_entry_size", 2048);
pref("browser.cache.disk.capacity", 51200);
pref("browser.sessionhistory.max_total_viewers", 1);
pref("nglayout.initialpaint.delay", 0);

// --- Network ---
pref("network.http.connection-timeout", 45);
pref("network.http.response.timeout", 90);
pref("network.http.max-connections", 48);
pref("network.http.max-persistent-connections-per-server", 8);
pref("network.http.max-persistent-connections-per-proxy", 12);
pref("network.http.keep-alive.timeout", 90);
pref("network.http.tcp_keepalive.short_lived_time", 30);
pref("network.http.tcp_keepalive.long_lived_time", 120);
pref("network.http.pipelining", false);
pref("network.http.http3.enabled", false);
pref("network.http.altsvc.enabled", false);
pref("network.dns.disablePrefetch", false);
pref("network.prefetch-next", true);
pref("network.predictor.enabled", true);

// --- Font Rendering ---
pref("gfx.font_rendering.coretext.enabled", true);
pref("font.name-list.serif.x-western", "-apple-system, Helvetica Neue, Helvetica, Arial");
pref("font.name-list.sans-serif.x-western", "-apple-system, Helvetica Neue, Helvetica, Arial");
pref("font.name-list.monospace.x-western", "Menlo, Courier New, Courier");
pref("font.default.x-western", "sans-serif");
pref("gfx.use_text_smoothing_setting", true);
pref("gfx.downloadable_fonts.enabled", true);
pref("gfx.downloadable_fonts.fallback_delay", 500);
pref("gfx.downloadable_fonts.fallback_delay_short", 25);

// --- Graphics / Rendering ---
pref("gfx.webrender.force-disabled", true);
pref("gfx.webrender.all", false);
pref("gfx.webrender.enabled", false);
pref("layers.acceleration.disabled", true);
pref("gfx.canvas.accelerated", false);
pref("layers.offmainthreadcomposition.enabled", false);

// --- Scroll Stability ---
pref("apz.paint_skipping.enabled", false);
pref("apz.content_response_timeout", 600);
pref("apz.allow_double_tap_zooming", false);
pref("general.smoothScroll", false);
pref("general.smoothScroll.pages", false);
pref("layout.display-list.retain", false);
pref("layout.display-list.retain.chrome", false);
pref("layout.css.backdrop-filter.enabled", false);

// --- SVG / Icon Rendering ---
pref("svg.context-properties.content.enabled", true);
pref("image.mem.decode_bytes_at_a_time", 16384);
pref("image.cache.size", 2097152);

// --- Telemetry Off ---
pref("toolkit.telemetry.enabled", false);
pref("toolkit.telemetry.unified", false);
pref("datareporting.healthreport.uploadEnabled", false);
pref("datareporting.policy.dataSubmissionEnabled", false);
pref("app.shield.optoutstudies.enabled", false);
pref("browser.ping-centre.telemetry", false);
pref("beacon.enabled", false);

// --- User Agent: Safari iOS 17 for compatibility ---
pref("general.useragent.override", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1");

// --- Misc Stability ---
pref("dom.animations-api.timelines.enabled", false);
pref("dom.webnotifications.enabled", false);
pref("dom.push.enabled", false);
pref("dom.serviceWorkers.enabled", false);
pref("dom.webcomponents.enabled", true);
pref("layout.css.scroll-snap-v1.enabled", true);
pref("privacy.reduceTimerPrecision", true);
pref("privacy.resistFingerprinting.reduceTimerPrecision.microseconds", 1000);
pref("layout.frame_rate", 60);
pref("browser.sessionstore.max_tabs_undo", 3);
pref("browser.sessionstore.max_serialize_back", 3);
pref("browser.sessionstore.max_serialize_forward", 0);
