---
title: "Build your own Google Bookmarks & GMarks bookmark manager application with Drupal in 45 minutes"
description: "A step-by-step tutorial on building a self-hosted, platform-independent bookmark manager using Drupal modules like CCK, Views, Link Checker, and Active Tags—in under an hour."
dateFormatted: "Jul 23, 2010"
archiveUrl: "https://web.archive.org/web/20100723112924/http://akora.info/node/61"
---

In this post, I provided a step-by-step tutorial on how to build a self-hosted, platform-independent bookmark manager to replace services like Google Bookmarks. My goal was to create a tool that offered full data control, fast tagging, and automated link validation, all within a 45-minute setup window.

**The technical stack I used included:**

- **Core Modules:** CCK and Views for the foundation.
- **Specialized Modules:** Link (for URL fields), Link Checker (for daily validation), Active Tags (for AJAX-powered tagging), and Finder (for an autocomplete search interface).
- **Efficiency:** I demonstrated using Drush to install the entire module stack in seconds.

**The process I outlined involved:**

- **Content Modeling:** Creating a "Link" content type and a "Tags" taxonomy vocabulary to handle the data.
- **Interface Building:** Setting up a sortable Table View to list bookmarks and using the Vocabulary Index module for alphabetical tag browsing.
- **Advanced Features:** Configuring a daily link-checker scan and building an AJAX-driven "Finder" block to allow for rapid searching without page reloads.

With just 45 minutes of configuration, a complete, custom solution matching the functionality of commercial tools was achievable—a testament to Drupal's power as a rapid application development framework.
