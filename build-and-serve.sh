#!/bin/sh
echo "Building Jekyll Side"
bundle exec jekyll build

# By default Jekyll builds in `development` env, which overrides site.url to host address which
# is breaking the server when running application on server
# See: https://github.com/jekyll/jekyll/issues/5743
export JEKYLL_ENV=nonprod

echo "Serving Jekyll Side"
bundle exec jekyll serve --host=0.0.0.0 --config _config.yml,_config_dev.yml --incremental