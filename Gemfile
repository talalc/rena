source 'https://rubygems.org'

ruby '2.1.4'
gem 'rails', '4.1.0'

gem 'pg', '0.17.1'
gem 'rails_12factor', group: :production

group :production do
  gem 'sass-rails', '~> 4.0.3'
  gem 'uglifier', '>= 1.3.0'
  gem 'coffee-rails', '~> 4.0.0'

  gem 'jquery-rails'
  gem 'jbuilder', '~> 2.0'
  gem 'sdoc', '~> 0.4.0', group: :doc
  gem 'spring', group: :development
end

group :development, :test do
  gem 'pry-rails'
  gem 'rspec-rails'
  gem 'shoulda-matchers'
  gem 'capybara'
  gem 'selenium-webdriver'
  gem 'jasmine'
  gem 'coveralls', require: false
  gem 'annotate', '>=2.6.0'
  gem 'rails-erd'
end
