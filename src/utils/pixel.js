/**
 * Meta (Facebook) Pixel Utility
 * Provides robust initialization, route-change PageView tracking,
 * and high-converting custom event tracking for Facebook Ads Campaigns.
 */

let initializedPixelId = null;

export function initFacebookPixel(pixelId) {
  if (!pixelId || typeof window === "undefined") return;
  if (initializedPixelId === pixelId) return;

  // Initialize fbq stub if not already injected
  if (!window.fbq) {
    /* eslint-disable */
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable */
  }

  try {
    window.fbq("init", pixelId);
    initializedPixelId = pixelId;
    console.log(`[Meta Pixel] Initialized with ID: ${pixelId}`);
  } catch (err) {
    console.warn("[Meta Pixel] Initialization error:", err);
  }
}

/**
 * Tracks standard PageView on route navigation
 */
export function trackPageView() {
  if (typeof window !== "undefined" && window.fbq) {
    try {
      window.fbq("track", "PageView");
    } catch (_e) {
      // ignore
    }
  }
}

/**
 * Tracks Lead generation (Cost estimate calculation, quotation submit, contact form submit)
 */
export function trackLead(data = {}) {
  if (typeof window !== "undefined" && window.fbq) {
    try {
      window.fbq("track", "Lead", {
        content_name: data.content_name || "Interior Design Consultation",
        content_category: data.content_category || "Inquiry",
        value: data.value || undefined,
        currency: "BDT",
        ...data,
      });
      console.log("[Meta Pixel] Tracked Lead Event:", data);
    } catch (_e) {
      // ignore
    }
  }
}

/**
 * Tracks Contact action (WhatsApp click, direct phone call click)
 */
export function trackContact(channel = "WhatsApp", label = "") {
  if (typeof window !== "undefined" && window.fbq) {
    try {
      window.fbq("track", "Contact", {
        channel,
        label,
      });
      console.log(`[Meta Pixel] Tracked Contact Event (${channel})`);
    } catch (_e) {
      // ignore
    }
  }
}

/**
 * Tracks ViewContent (When viewing a specific package or portfolio item)
 */
export function trackViewContent(contentName, category = "Interior Package") {
  if (typeof window !== "undefined" && window.fbq) {
    try {
      window.fbq("track", "ViewContent", {
        content_name: contentName,
        content_category: category,
      });
    } catch (_e) {
      // ignore
    }
  }
}
