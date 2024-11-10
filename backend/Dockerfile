FROM python:3.9

WORKDIR /usr/src/app

COPY . .

RUN apt-get update && \
    apt-get install -y \
    wkhtmltopdf \
    libxrender1 \
    libxext6 \
    libfontconfig1 \
    && apt-get clean

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5001

CMD ["python", "app.py"]