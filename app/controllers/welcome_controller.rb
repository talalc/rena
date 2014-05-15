class WelcomeController < ApplicationController

  def index
    @matches = Match.last(15).reverse
  end

end