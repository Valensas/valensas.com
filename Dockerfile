FROM jekyll/jekyll:latest

COPY Gemfile* ./

RUN gem install bundler

RUN bundle install

ENTRYPOINT [ "jekyll" ]

CMD [ "serve" ]