# Sentinel's Journal - Critical Learnings Only

## 2025-05-14 - [Tabnapping & DOM-XSS Mitigation]
**Vulnerability:** External links were missing `rel="noopener noreferrer"`, and a typing animation used `innerHTML` to render text from data attributes.
**Learning:** Even static portfolio sites have attack vectors; tabnapping can lead to phishing, and `innerHTML` is a common source of DOM-XSS if data sources are ever made dynamic.
**Prevention:** Enforce `rel="noopener noreferrer"` for all `target="_blank"` links and prefer `textContent` over `innerHTML` for text-only updates.
