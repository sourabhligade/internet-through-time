#!/usr/bin/env python3
"""v4 nostalgia timing model."""

def theater(md):
    if md <= 0: return 0
    j, f = 40, min(70, int(md * 0.18) + 25)
    return min(1800, int(md * 0.85) + f + j)

def start_at(md):
    return 0 if md <= 0 else int(theater(md) * 0.58)

def img(budget, n):
    step = max(55, min(140, budget // max(1, n)))
    return 120 + n * step

def connect(early=320, line=480, end=400, n=12, busy=False):
    t = min(4, n) * early + max(0, n - 4) * line + end
    if busy: t += 750 + 3 * line
    return t

print("=== Click -> blank wait (startAt) / full status ===")
for y, md, b in [("1994", 280, 1400), ("1995", 130, 1100), ("1996", 115, 1000), ("1997", 75, 750)]:
    print("  %s: blank~%sms  theater~%sms  +6 imgs~%sms" % (
        y, start_at(md), theater(md), img(b, 6)))
print("=== Dial-up connect (~12 lines) ===")
print("  clean %dms (~%.1fs)" % (connect(), connect()/1000))
print("  busy  %dms" % connect(busy=True))
print("  1997  %dms" % connect(240, 360, 300))
