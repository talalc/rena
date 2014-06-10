class WelcomeController < ApplicationController

  def index
    @matches = Match.last(15).reverse
    @totalmatches = Match.all.count
  end

end