namespace :bootstrap do
  desc 'Install postgres via homebrew before running bundle exec (required on OS X)'
  task :postgres do
    system("brew install postgres")
  end
end
