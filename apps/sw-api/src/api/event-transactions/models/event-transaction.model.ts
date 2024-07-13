import { EventStatusName, EventTransactionType } from "@shortwaits/shared-lib";
import { AllowNull, Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

@Table({
  tableName: "event_transaction", // Explicitly name the table
  timestamps: true, // Enable timestamps if needed
  underscored: true, // Use snake_case for column names
})
export class EventTransactionModel extends Model<EventTransactionModel> implements EventTransactionType {
  @PrimaryKey
  @Default(uuidv4) // Automatically generate UUIDs
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  event_id!: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
  })
  client_id!: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
  })
  local_client_id!: string;

  @AllowNull(false)
  @Column({
    type: DataType.DATEONLY,
  })
  transaction_date!: Date;

  @AllowNull(true)
  @Column({
    type: DataType.DECIMAL(10, 2), // Specify precision and scale for decimal
  })
  transaction_amount!: number;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
  })
  transaction_type!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  payment_method!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  transaction_status!: EventStatusName;

  @AllowNull(true)
  @Column({
    type: DataType.TEXT, // Use TEXT for larger strings
  })
  notes?: string;

  // for sqlite
  @AllowNull(true)
  @Column({
    type: DataType.TEXT,
  })
  promo_codes?: string;
}
