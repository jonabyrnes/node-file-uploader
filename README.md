## installing the modules
npm install

## running from the command line
node main.js \
    --protocol s3 \
    --file files/myfile.csv \
    --key {your amazon key} \
    --secret {your amazon secret} \
    --region us-west-2 \
    --bucket my-amazon-bucket

## executing the tests
grunt test

## generating code coverage
grunt coverage
