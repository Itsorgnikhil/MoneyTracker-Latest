// chartUtils.js

// Income chart data preparation
export const prepareIncomeLineChartData = (transactions) => {
  if (!transactions || transactions.length === 0) return [];

  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(a.date) - new Date(b.date)
  );

  return sortedTransactions.map((t) => {
    const date = new Date(t.date);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    
    return {
      month: `${day}${getDaySuffix(day)} ${month}`,
      income: Number(t.amount),
      bonus: t.bonus || null,
      name: t.name || ''
    };
  });
};

// Expense chart data preparation
export const prepareExpenseLineChartData = (transactions) => {
  if (!transactions || transactions.length === 0) return [];

  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(a.date) - new Date(b.date)
  );

  return sortedTransactions.map((t) => {
    const date = new Date(t.date);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    
    return {
      month: `${day}${getDaySuffix(day)} ${month}`,
      expense: Number(t.amount),
      name: t.name || ''
    };
  });
};

// Helper function for day suffix (1st, 2nd, 3rd, etc.)
function getDaySuffix(day) {
  if (day >= 11 && day <= 13) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

// ... any other chart utility functions you have