source 'https://rubygems.org'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.1.0'
# Use postgresql as the database for Active Record
gem 'pg'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 4.0.3'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .js.coffee assets and views
gem 'coffee-rails', '~> 4.0.0'
# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# gem 'therubyracer',  platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0',          group: :doc

# Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
gem 'spring',        group: :development

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Use debugger
# gem 'debugger', group: [:development, :test]

group :development, :test do
# sets rails console to open in pry instead of irb
# https://github.com/rweng/pry-rails
  gem 'pry-rails'
# rspec for rails. set up with `rails g rspec:install`
# https://github.com/rspec/rspec-rails
  gem 'rspec-rails'
# one liners to test common rails functionality
# https://github.com/thoughtbot/shoulda-matchers
  gem 'shoulda-matchers'
  gem 'capybara'
  gem 'selenium-webdriver'
  gem 'jasmine' #rails g jasmine:install
  # gem 'simplecov', '~> 0.7.1', :require => false
  gem 'coveralls', require: false
# https://github.com/ctran/annotate_models
  gem 'annotate', ">=2.6.0"
  gem "rails-erd"
end

gem 'rails_12factor', group: :production

# gem "paperclip", "~> 4.1"

ruby "2.1.0"