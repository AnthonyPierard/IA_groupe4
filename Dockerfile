FROM swipl
COPY . /app
CMD ["swipl", "/app/src/tbot.pl"]


