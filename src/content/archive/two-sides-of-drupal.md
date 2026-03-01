---
title: "The two sides of Drupal"
description: "A comparison of database-centric versus code-centric configuration approaches in Drupal, drawn from two real client projects—and why the answer is almost always a deliberate blend of both."
dateFormatted: "Oct 20, 2009"
archiveUrl: "https://web.archive.org/web/20091020063604/http://akora.info/node/47"
---

In this post, I explored two distinct paradigms for using Drupal based on two projects I was handling at the time—a content-heavy marketing site and a high-functionality web service front-end. I compared the pros and cons of keeping configuration in the database versus hard-coding it into the codebase.

**I analyzed two specific approaches:**

- **The Database-Centric Approach (Flexibility):** Giving content managers "full control" to change menus, views, and settings directly in the live environment. This allowed rapid changes without developer intervention, but made deployments difficult—new configurations had to be manually "replayed" across environments.
- **The Code-Centric Approach (Stability):** Moving as much configuration as possible into module code and version control. This minimized deployment overhead and enabled better caching and easy rollbacks, though small configuration changes became more time-consuming as they required a full code deployment.

**My Conclusion:** Drupal's greatest strength is its ability to combine these two methods. By finding the right balance between "easy admin changes" and "version-controlled code," the workflow can be tailored to the specific needs of the project and the client. There's no universal right answer—only the right answer for your context.
