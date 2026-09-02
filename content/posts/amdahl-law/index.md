---
title: Amdahl's Law
date: "2020-08-01"
description: "Amdahl's law"
---

Let's say that you want to speed up 75% of your system's execution time by three times.
What is the overall speedup of the whole system? There's a formula to solve this problem. It's called Amdahl's law and can be formulated as follows.

$$
S{\scriptsize max} = \frac{1}{(1-p) + \frac{p}{s}}
$$

Where
* $S{\scriptsize max}$ is the maximum speedup of the system
* $p$ is part of the system that is improved
* $s$ is the speedup of $p$

If you speed up 75% if your system's execution time by three times, the overall speedup of the whole system will be
$$
S{\scriptsize max} = \frac{1}{(1-0.75) + \frac{0.75}{3}} = 2
$$ 

Amdahl's law has few important implications:
1. As $s$ approaches infinity, $\frac{p}{s}$ approaches zero. This means that no matter how far you optimize a system, the overall speedup is always limited by the part of the system that doesn't benefit from the improvement ($\frac{1}{1-p}$).
2. You should make the common case fast.
