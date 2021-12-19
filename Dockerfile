FROM jekyll/jekyll

ADD ["./", "/project"]

WORKDIR /project

RUN cd /project \
    && bundle install

EXPOSE 4000