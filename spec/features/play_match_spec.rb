require 'spec_helper'

describe Rena do

  it "should take me to root" do
    visit root_path
    expect(page).to have_content 'Rena'
  end

  # it "should let me fill in name" do
    # visit root_path
  # end

end
