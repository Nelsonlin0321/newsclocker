```shell
source .env
docker build -t newsclocker:latest -f ./Dockerfile . --platform linux/amd64
docker run --env-file .env.docker -p 3000:3000 -it --rm --name newsclocker newsclocker:latest
```
