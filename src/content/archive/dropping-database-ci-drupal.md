---
title: "Dropping the database with every build: true CI for Drupal"
description: "How I replaced fragile database-snapshot deployments with a true CI workflow for Drupal 6—using Features, Strongarm, and Hudson to rebuild the entire site from code on every build."
dateFormatted: "Jul 11, 2010"
archiveUrl: "https://web.archive.org/web/20100711024545/http://akora.info/node/62"
---

In this post, I detailed my transition from a fragile, database-dependent deployment process to a "true" **Continuous Integration (CI)** workflow for a complex Drupal 6 project. Relying on database snapshots from a development environment provided a "false indication" of success—it failed to account for incremental changes or true portability.

**The core shift I implemented involved:**

- **Moving Configuration to Code:** Instead of relying on the database, I refactored the project to use modules like **Features**, **Strongarm**, and **Patterns** to keep configuration settings in version control (SVN).
- **The "Clean Slate" Approach:** I reconfigured the CI server (Hudson) to drop the database entirely and perform a fresh Drupal installation with every build, ensuring the site could be rebuilt solely from the codebase.
- **Automation:** Selenium RC and shell scripts automated the entire installation and testing process.

**Key lessons I shared included:**

- **Start early:** Implementing CI at the beginning of a project avoids the "scary" mid-project refactors I had to perform.
- **Database Portability:** Once a site is live, moving the database from Dev to Production is no longer a viable or safe strategy.
- **Business Value:** While refactoring for CI took an entire sprint, it was essential for delivering a stable, shippable product at the end of every cycle.

If you're building anything non-trivial on Drupal, treating your configuration as code from day one is the single most valuable investment you can make.
