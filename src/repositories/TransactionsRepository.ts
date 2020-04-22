import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(t => t.type === 'income')
      .reduce((acc, cur) => acc + cur.value, 0);

    const outcome = this.transactions
      .filter(t => t.type === 'outcome')
      .reduce((acc, cur) => acc + cur.value, 0);

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ title, type, value }: CreateTransaction): Transaction {
    const transaction = new Transaction({
      title,
      type,
      value,
    });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
