---
title: "Lightweight, multi-platform continuous integration testing server for Drupal websites with Selenium IDE, RC, SVN and some scripting"
description: "How I built a custom automated functional testing framework for Drupal using Selenium, SVN, and shell scripting—covering Linux headless execution with Xvfb and Windows cross-browser testing with IE7."
dateFormatted: "Aug 08, 2010"
archiveUrl: "https://web.archive.org/web/20100808053447/http://akora.info/node/56"
---

In this post, I detailed how I built a custom, automated functional testing framework for Drupal using a combination of **Selenium**, **Subversion (SVN)**, and shell scripting. The goal was to allow a small team to perform daily cross-platform testing—covering both Linux and Windows environments—without needing a massive infrastructure.

**My workflow consisted of three main phases:**

- **Test Authoring:** Developers used the Selenium IDE Firefox extension to record clicks, saving them as HTML test cases and committing them to SVN.
- **Automated Execution on Linux:** A headless RHEL server ran the tests. Since the server had no GUI, I used **Xvfb** (a virtual framebuffer) to trick Firefox into running in a virtual display, then used **Mutt** to email the results from the command line.
- **Cross-Browser Testing on Windows:** To ensure compatibility with Internet Explorer 7, a Windows VM automatically pulled the latest tests from SVN via a batch script and used **Blat** to email the results.

**Key technical hurdles I solved included:**

- **Dynamic Suite Generation:** A shell script automatically generated the Selenium "Table of Contents" suite file so new tests were included in each run as soon as they were committed.
- **System Cleanup:** A specialized Selenium script logged in as superuser to delete test entries after each run, keeping the database clean.

This setup proved that with the right mix of open-source tools and creative scripting, a small team could achieve a sophisticated CI testing loop that rivaled much more expensive enterprise solutions.
