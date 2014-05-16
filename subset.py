#!/usr/bin/env python

import glob


def main():
    files = glob.glob('all_years/*')
    files.sort()
    s = set(open(files[0]).readlines())
    for f in files[1:]:
        s = s.intersection(set(open(f).readlines()))
    for f in s:
        print(f.strip())
    print(len(s))

if __name__ == '__main__':
    main()
