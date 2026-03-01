---
title: "The Linux From Scratch experience – Day 1"
description: "Documenting Day 1 of building a Linux system from the ground up on a Dell PowerEdge server using the LFS book—partitioning, compiling GCC, and hitting a kernel panic at the finish line."
dateFormatted: "Jul 11, 2010"
archiveUrl: "https://web.archive.org/web/20100711024231/http://akora.info/node/63"
---

In this post, I documented the start of my journey into the inner workings of Linux by building a system from the ground up using the **Linux From Scratch (LFS)** book. Ten hours into Day 1, I was driven by the desire to gain full control over my OS, improve security by installing only necessary components, and understand the deep dependencies that make a distribution tick.

**My hardware and environment setup included:**

- **The Machine:** A Dell PowerEdge SC440 server with a Pentium Dual-Core E2160 and 1GB of RAM.
- **The Source:** The LFS LiveCD (version 6.3), which provided a stable environment with all necessary packages, patches, and documentation in one place.
- **The Workspace:** An XFCE desktop to manage multiple terminal windows and browse the documentation simultaneously.

**Key milestones and challenges from Day 1:**

- **Partitioning:** Starting with a clean slate—a 10GB ext3 partition and a 2GB swap file on the SATA drive.
- **The "Clean Build" Lesson:** A compilation error during GCC installation was traced back to using a "dirty" source directory from a previous build cycle. Erasing and re-extracting the source resolved it—a vital lesson in compiler hygiene.
- **The Final Hurdle:** By end of day I had reached the point of making the system bootable, but the first boot ended in a **Kernel Panic**, as the system couldn't detect the SATA drive.

While the day ended with a non-booting system, the bulk of the LFS manual had been navigated successfully. The kernel panic was likely a configuration error in the kernel build—setting the stage for Day 2 and mastering kernel compilation.
