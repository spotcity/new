FROM python:3.8-alpine
WORKDIR /app
COPY requirements.txt /app/
RUN pip install -r requirements.txt
ADD . /app
# lazy debug
RUN apk update && apk add bash curl nano
CMD [ "uvicorn", "app:app", "--host", "0.0.0.0" ]
