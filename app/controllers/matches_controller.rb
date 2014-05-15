class MatchesController < ApplicationController

  def create
    @match = Match.new
    @match.p1name = params[:p1name]
    @match.p1color = params[:p1color]
    @match.p1won = params[:p1won]
    @match.p2name = params[:p2name]
    @match.p2color = params[:p2color]
    @match.p2won = params[:p2won]
    respond_to do |f|
      if @match.save
        f.json { render json: @match }
      end
    end
  end

end