#!/bin/sh

for f in csv/*
do
    sed -i s/Nov/Oct,Nov/ $f
done
