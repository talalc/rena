class GamesController < ApplicationController

  def match
    @p1name = params[:p1name]
    @p1color = params[:p1color]
    @p2name = params[:p2name]
    @p2color = params[:p2color]
  end

end