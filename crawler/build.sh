aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 471112645630.dkr.ecr.ap-southeast-1.amazonaws.com
docker build -t kuratus-repo .
docker tag kuratus-repo:latest 471112645630.dkr.ecr.ap-southeast-1.amazonaws.com/kuratus-repo:latest
docker push 471112645630.dkr.ecr.ap-southeast-1.amazonaws.com/kuratus-repo:latest