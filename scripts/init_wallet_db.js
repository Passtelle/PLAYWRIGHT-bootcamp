// 🏗️ THE PLAN (Data & Variables)
const Database = require('better-sqlite3');
const path = require('path');

/** @type {string} */
const DB_PATH = path.join(__dirname, '..', 'wallet_backend.db');

/** @typedef {{ id: number, name: string, balance: number, status: string }} User */
/** @type {User[]} */
const TEST_USERS = [
  { id: 1, name: 'Alice Martin',  balance: 1500.00, status: 'active'    },
  { id: 2, name: 'Bob Chen',      balance:  250.75, status: 'active'    },
  { id: 3, name: 'Carol Nguyen',  balance:    0.00, status: 'suspended' },
];

// 🎬 THE WORK (Actions)
/**
 * Initialises wallet_backend.db with Users and Transactions tables,
 * then seeds exactly 3 clean test users.
 * @returns {void}
 */
function initWalletDatabase() {
  const db = new Database(DB_PATH, { verbose: console.log });

  db.exec(`
    CREATE TABLE IF NOT EXISTS Users (
      id      INTEGER PRIMARY KEY,
      name    TEXT    NOT NULL,
      balance REAL    NOT NULL DEFAULT 0.00,
      status  TEXT    NOT NULL DEFAULT 'active'
    );

    CREATE TABLE IF NOT EXISTS Transactions (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      from_user_id INTEGER NOT NULL,
      to_user_id   INTEGER NOT NULL,
      amount       REAL    NOT NULL,
      timestamp    TEXT    NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (from_user_id) REFERENCES Users(id),
      FOREIGN KEY (to_user_id)   REFERENCES Users(id)
    );
  `);

  const insertUser = db.prepare(
    'INSERT OR REPLACE INTO Users (id, name, balance, status) VALUES (@id, @name, @balance, @status)'
  );

  const seedUsers = db.transaction(
    /** @param {User[]} users */ (users) => {
      for (const user of users) {
        insertUser.run(user);
      }
    }
  );

  seedUsers(TEST_USERS);

  db.close();
}

// ✅ THE CHECK (Assertions)
/**
 * Verifies the seeded data matches expectations after init.
 * @returns {void}
 */
function verifyDatabase() {
  const db = new Database(DB_PATH);

  /** @type {{ count: number }} */
  const { count } = /** @type {any} */ (db.prepare('SELECT COUNT(*) AS count FROM Users').get());

  /** @type {{ count: number }} */
  const txCount = /** @type {any} */ (db.prepare('SELECT COUNT(*) AS count FROM Transactions').get());

  const users = db.prepare('SELECT id, name, balance, status FROM Users').all();

  db.close();

  console.log('\n--- Verification ---');
  console.log(`Users seeded  : ${count}  (expected: 3)`);
  console.log(`Transactions  : ${txCount.count} (expected: 0 — clean state)`);
  console.table(users);

  if (count !== 3) {
    throw new Error(`FAIL: Expected 3 users, got ${count}`);
  }

  console.log('\nPASS: wallet_backend.db initialised correctly.');
}

initWalletDatabase();
verifyDatabase();
