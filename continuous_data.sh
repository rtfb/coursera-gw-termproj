#!/bin/bash

for i in {1980..2012}
do
    grep -l -r $i csv/ | sort > all_years/$i.txt
done
