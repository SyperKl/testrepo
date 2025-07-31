import { defineStore } from 'pinia';

type AccountType = 'LDAP' | 'Локальная';

interface AccountLabel {
  text: string;
}

interface Account {
  id: string;
  label: AccountLabel[];
  type: AccountType;
  login: string;
  password: string | null;
}

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as Account[],
  }),
  actions: {
    addAccount() {
      this.accounts.push({
        id: Date.now().toString(),
        label: [],
        type: 'Локальная',
        login: '',
        password: '',
      });
    },
    deleteAccount(id: string) {
      this.accounts = this.accounts.filter(account => account.id !== id);
    },
    updateAccount(updatedAccount: Account) {
      const index = this.accounts.findIndex(a => a.id === updatedAccount.id);
      if (index !== -1) {
        this.accounts[index] = updatedAccount;
      }
    },
  },
  persist: true, 
});