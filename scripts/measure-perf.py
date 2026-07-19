#!/usr/bin/env python3
"""Re-run immersion timing model metrics (no browser required)."""
import statistics, random

def nav(md, hist=False, n=20000):
    out=[]
    for _ in range(n):
        if hist: t=0 if md<=0 else min(28,max(12,int(md*0.2)))
        elif md<=0: t=0
        else:
            j=random.randint(0,min(48,int(md*0.35)+12))
            f=min(36,int(md*0.12)); t=int(md*0.65)+f+j
        out.append(0 if t<=0 else int(t*0.4))
    return statistics.median(out)

def img(md,n):
    if md<=0: return 0
    b=280
    if md>=200: b=min(420,int(b*1.35))
    if md>=400: b=min(560,int(b*1.7))
    step=max(12,min(48,b//max(1,n)))
    batch=2 if n>8 else 1
    return 8+((n+batch-1)//batch)*step

print("1994 start p50", nav(160), "img5", img(160,5), "TTI", nav(160)+img(160,5))
print("1995 start p50", nav(45), "img5", img(45,5), "TTI", nav(45)+img(45,5))
print("history", nav(160,True))
