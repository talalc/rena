class MatchesController < ApplicationController

  def index
    @matches = Match.all
  end

  def create
    @match = Match.new
  end

end