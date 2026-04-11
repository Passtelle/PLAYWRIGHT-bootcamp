// 🏗️ THE PLAN (Data & Variables)
import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH: string = path.join(__dirname, '..', 'wallet_backend.db');
const db: Database.Database = new Database(DB_PATH);

interface User {
  id: number;
  name: string;
  balance: number;
  status: string;
}

interface TransactionResult {
  success: boolean;
  message: string;
}

// ─── Prepared Statements ────────────────────────────────────────────────────
const stmtGetUser = db.prepare<[number], User>(
  'SELECT id, name, balance, status FROM Users WHERE id = ?'
);

const stmtUpdateBalance = db.prepare<[number, number], void>(
  'UPDATE Users SET balance = balance + ? WHERE id = ?'
);

const stmtInsertTransaction = db.prepare<[number, number, number], void>(
  'INSERT INTO Transactions (from_user_id, to_user_id, amount) VALUES (?, ?, ?)'
);

// 🎬 THE WORK (Actions)

/**
 * Deposits a positive amount into a user's account.
 * Throws if the user does not exist or amount is invalid.
 */
export function deposit(userId: number, amount: number): TransactionResult {
  if (amount <= 0) {
    throw new Error(`Deposit amount must be positive. Received: ${amount}`);
  }

  const user: User | undefined = stmtGetUser.get(userId);
  if (!user) {
    throw new Error(`User with id ${userId} not found.`);
  }

  stmtUpdateBalance.run(amount, userId);
  stmtInsertTransaction.run(0, userId, amount); // from_user_id = 0 = system

  return { success: true, message: `Deposited $${amount.toFixed(2)} to user ${userId}.` };
}

/**
 * Withdraws a positive amount from a user's account.
 * Throws if the user does not exist, amount is invalid, or balance is insufficient.
 */
export function withdraw(userId: number, amount: number): TransactionResult {
  if (amount <= 0) {
    throw new Error(`Withdrawal amount must be positive. Received: ${amount}`);
  }

  const user: User | undefined = stmtGetUser.get(userId);
  if (!user) {
    throw new Error(`User with id ${userId} not found.`);
  }

  if (user.balance < amount) {
    throw new Error(
      `Insufficient funds for user ${userId}. Balance: $${user.balance.toFixed(2)}, Requested: $${amount.toFixed(2)}`
    );
  }

  stmtUpdateBalance.run(-amount, userId);
  stmtInsertTransaction.run(userId, 0, amount); // to_user_id = 0 = system

  return { success: true, message: `Withdrew $${amount.toFixed(2)} from user ${userId}.` };
}

/**
 * Transfers an amount between two users inside a single SQL transaction.
 * If either update fails the entire operation rolls back automatically.
 * Throws if either user is suspended, not found, or balance is insufficient.
 */
export const transfer = db.transaction(
  (fromId: number, toId: number, amount: number): TransactionResult => {
    if (amount <= 0) {
      throw new Error(`Transfer amount must be positive. Received: ${amount}`);
    }

    // ✅ THE CHECK — Guard: validate both users before touching balances
    const sender: User | undefined = stmtGetUser.get(fromId);
    if (!sender) {
      throw new Error(`Sender with id ${fromId} not found.`);
    }
    if (sender.status === 'suspended') {
      throw new Error(`Transfer blocked: sender (id ${fromId}) account is suspended.`);
    }

    const recipient: User | undefined = stmtGetUser.get(toId);
    if (!recipient) {
      throw new Error(`Recipient with id ${toId} not found.`);
    }
    if (recipient.status === 'suspended') {
      throw new Error(`Transfer blocked: recipient (id ${toId}) account is suspended.`);
    }

    if (sender.balance < amount) {
      throw new Error(
        `Insufficient funds for sender ${fromId}. Balance: $${sender.balance.toFixed(2)}, Requested: $${amount.toFixed(2)}`
      );
    }

    // Debit sender — if this or the credit below throws, better-sqlite3 rolls back the transaction
    stmtUpdateBalance.run(-amount, fromId);

    // Credit recipient
    stmtUpdateBalance.run(amount, toId);

    // Audit log
    stmtInsertTransaction.run(fromId, toId, amount);

    return {
      success: true,
      message: `Transferred $${amount.toFixed(2)} from user ${fromId} to user ${toId}.`,
    };
  }
);
