# uguu.se api node wrapper

visit [uguu.se](https://uguu.se) for more information.

> uguu.se is not a bridged service. it is a 3rd party service enable you to host files for 24 hours.
## curl example
``` shell
curl --request POST \
  --url 'https://uguu.se/api.php?d=upload-tool' \
  --header 'content-type: multipart/form-data; boundary=---011000010111000001101001' \
  --form file=
  ```

  response: `https://a.uguu.se/HSMrk8wpYdTh_andy.jpeg` as html page