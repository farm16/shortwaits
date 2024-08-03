import { BusinessReviewType } from "@shortwaits/shared-lib";
import { Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

@Table({
  tableName: "business_reviews",
  timestamps: true,
})
export class BusinessReviewModel extends Model<BusinessReviewModel> implements BusinessReviewType {
  @PrimaryKey
  @Default(uuidv4) // Automatically generate UUIDs
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  businessId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  clientId!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  })
  rating!: number;

  @Column({
    type: DataType.TEXT,
  })
  reviewText!: string;

  @Column({
    type: DataType.DATEONLY,
    defaultValue: DataType.NOW,
  })
  reviewDate!: Date;
}
