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

class Match < ActiveRecord::Base
end
