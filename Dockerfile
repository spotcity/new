FROM python:3-alpine
ADD . /app
WORKDIR app
RUN apk update && apk add bash curl nano
RUN pip install -r requirements.txt
CMD [ "python", "./app.py" ]
