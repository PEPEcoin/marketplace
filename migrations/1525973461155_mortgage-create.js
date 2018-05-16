import { txUtils } from 'decentraland-eth'
import { Mortgage } from '../src/Mortgage'

const tableName = Mortgage.tableName
const mortgageStatus = Object.values(Mortgage.STATUS)
  .map(val => `'${val}'`)
  .join(', ')

exports.up = pgm => {
  pgm.createTable(
    tableName,
    {
      tx_hash: { type: 'TEXT', primaryKey: true, unique: true, notNull: true },
      tx_status: {
        type: 'TEXT',
        notNull: true,
        default: txUtils.TRANSACTION_STATUS.pending
      },
      block_number: {
        type: 'INT',
        notNull: true
      },
      status: {
        type: 'TEXT',
        notNull: true,
        default: Mortgage.STATUS.open,
        check: `status IN (${mortgageStatus})`
      },
      x: { type: 'INT', notNull: true },
      y: { type: 'INT', notNull: true },
      borrower: { type: 'VARCHAR(42)', notNull: true },
      lender: { type: 'VARCHAR(42)' },
      loan_id: { type: 'INT', notNull: true },
      mortgage_id: { type: 'INT', notNull: true },
      amount: { type: 'FLOAT', notNull: true },
      dues_in: { type: 'BIGINT', notNull: true },
      expires_at: { type: 'BIGINT', notNull: true },
      block_time_created_at: { type: 'BIGINT' },
      block_time_updated_at: { type: 'BIGINT' },
      created_at: { type: 'TIMESTAMP', notNull: true },
      updated_at: 'TIMESTAMP'
    },
    { ifNotExists: true }
  )

  pgm.createIndex(tableName, 'tx_status')
  pgm.createIndex(tableName, 'mortgage_id')
  pgm.createIndex(tableName, 'status')
  pgm.createIndex(tableName, 'borrower')
  pgm.createIndex(tableName, ['x', 'y'])
}

exports.down = pgm => {
  pgm.dropIndex(tableName, 'tx_status')
  pgm.dropIndex(tableName, 'mortgage_id')
  pgm.dropIndex(tableName, 'status')
  pgm.dropIndex(tableName, 'borrower')
  pgm.dropIndex(tableName, ['x', 'y'])

  pgm.dropTable(tableName)
}