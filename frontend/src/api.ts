import axios from 'axios';
const API_BASE = '/api';

export interface Account {
  _id: string;
  type: 'debit' | 'credit' | 'savings' | 'checking';
  last4: string;
  name: string;
  frozen: boolean;
  balance: number;
}

export async function getAccounts(token: string): Promise<Account[]> {
  const res = await axios.get(`${API_BASE}/accounts`, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
}

export async function createAccount(token: string, type: string, initialAmount: number): Promise<Account> {
  const res = await axios.post(`${API_BASE}/accounts`, { type, initialAmount }, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
}

export async function freezeAccount(token: string, id: string, isFrozen: boolean): Promise<Account> {
  const res = await axios.put(`${API_BASE}/accounts/${id}/freeze`, { isFrozen }, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
}

export async function deleteAccount(token: string, id: string): Promise<void> {
  await axios.delete(`${API_BASE}/accounts/${id}`, { headers: { Authorization: `Bearer ${token}` } });
}

// Add funds to an account
export async function depositFunds(token: string, accountId: string, amount: number): Promise<Account> {
  const res = await axios.post(
    `${API_BASE}/accounts/${accountId}/deposit`,
    { amount },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

// Transferencia de fondos desde una cuenta específica
export async function transferFunds(token: string, fromAccountId: string, toEmail: string, amount: number): Promise<void> {
  await axios.post(
    `${API_BASE}/transactions/transfer`,
    { fromAccountId, toEmail, amount },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

// Fetch all transactions for the logged-in user
export interface Transaction {
  _id: string;
  date: string;
  type: 'transfer' | 'deposit' | 'withdraw' | 'account_opened' | 'account_closed' | 'status_change';
  amount?: number;
  description: string;
  direction: 'in' | 'out' | 'neutral';
  accountId: string;
  last4?: string;
}
export async function getTransactions(token: string): Promise<Transaction[]> {
  const res = await axios.get(
    `${API_BASE}/transactions`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

// Logout del usuario
export async function logout(): Promise<void> {
  await axios.post(
    `${API_BASE}/auth/logout`,
    {},
    { withCredentials: true }
  );
}
