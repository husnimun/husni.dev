---
title: Amdahl's Law
date: "2020-08-01"
description: "Amdah's law"
---

Let's say that you want to speed up 75% of your system's execution time by three times.
What is the overall speedup of the whole system? There's a formula to solve this problem. It's called Amdahl's law and can be formulated as follows.

`Smax = 1/((1-p) + p/s)`

Where
* `Smax` is the maximum speedup of the system.
* `p` is part of the system that is improved.
* `s` is the speedup of `p`.

If you speed up 75% if your system's execution time by three times, the overall speedup of the whole system will be `1/((1-0.75) + 0.75/3)` = 2 times. 

Amdahl's law has few important implications:
1. As `s` approaches infinity, `p/s` approaches zero. This means that no matter how far you optimize a system, the overall speedup is always limited by the part of the system (`1/(1-p)`) that can't benefit from the improvement.
2. You should make the common case fast.
