#!/bin/sh

# The "all.inv" file was obtained here:
# $ wget ftp://ftp.ncdc.noaa.gov/pub/data/ghcn/v3/ghcnm.tavg.latest.qca.tar.gz
# $ tar xzvf ghcnm.tavg.latest.qca.tar.gz
# $ cp ghcnm.v3.2.2.20140515/ghcnm.tavg.v3.2.2.20140515.qca.inv all.inv

for i in `cut -d' ' -f1 all.inv`
do
    curl -s -o csv/$i.csv aws.climatemodels.uchicago.edu/timeseries/ghcnm.data/tmean/station.$i.csv
done
