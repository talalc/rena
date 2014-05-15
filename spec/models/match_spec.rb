# == Schema Information
#
# Table name: matches
#
#  id         :integer          not null, primary key
#  p1name     :string(255)
#  p1color    :string(255)
#  p1won      :boolean
#  p2name     :string(255)
#  p2color    :string(255)
#  p2won      :boolean
#  created_at :datetime
#  updated_at :datetime
#

# require 'spec_helper'

describe Match do
  it "should log match history" do
    m = Match.new
    m.p1name = 'Talal'
    m.p1color = '#0000FF'
    m.p1won = false
    m.p2name = 'Rob'
    m.p2color = '#FF00FF'
    m.p2won = true
    expect(m.valid?).to eq(true)
    m.save
    expect(m.persisted?).to eq(true)
  end
end
