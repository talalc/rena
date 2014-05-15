class WelcomeController < ApplicationController

  def index
    @matches = Match.all
  end

end