class CreateMatches < ActiveRecord::Migration
  def change
    create_table :matches do |t|
      t.string :p1name
      t.string :p1color
      t.boolean :p1won
      t.string :p2name
      t.string :p2color
      t.boolean :p2won

      t.timestamps
    end
  end
end
