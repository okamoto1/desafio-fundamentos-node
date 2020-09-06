import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
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
    const { income, outcome } = this.transactions.reduce(
      (acc, obj) => {
        if (obj.type === 'income') {
          acc.income += obj.value;
        } else {
          acc.outcome += obj.value;
        }
        return acc;
      },
      {
        income: 0,
        outcome: 0,
      },
    );

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create(dataTransaction: TransactionDTO): Transaction {
    const { title, value, type } = dataTransaction;

    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
