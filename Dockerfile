FROM                ubuntu

MAINTAINER          Aman Tuladhar

RUN                 apt-get update \
                    && apt-get install -y ruby ruby-dev cmake zlibc zlib1g-dev zlib1g libxml2-dev nodejs\
                    && ln -s /usr/bin/nodejs /usr/bin/node \
                    && gem install bundler

WORKDIR             /app

ADD                 Gemfile /app
ADD                 Gemfile.lock /app

RUN                 bundle install

EXPOSE              4000

CMD                 bundle exec jekyll serve -H 0.0.0.0