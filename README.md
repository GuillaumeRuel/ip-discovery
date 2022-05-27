# IP Discovery App

## LandR Technical Test

### Requirements

- nodejs >16
- npm >8.3

### Local development startup

```bash
npm install

npm run start
```

### Local docker startup

```bash
docker build --tag app .

docker run -p 5000:5000 app
```

- navigate to localhost:5000

- The service will respond to:
  - GET : return the ip address and the location of the ip
    - For localhost testing add the following rule to your header `"x-forwarded-for: ip_to_test`
  - POST : return the ip adress and location of the ips inside the body
    - ex: {"ips": [8.8.8.8, 1.2.3.4]}
