URL=localhost:3000

# --warmup it's to "initiate" the requests
npx autocannon $URL -m POST \
  --warmup [-c 1 -d 3] \
  --connection 500 \
  --pipeline 10 \
  --renderStatusCodes


  #cat log.txt| grep 25777 | wc -l