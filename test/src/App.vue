<script setup lang="ts">
import { useAccountsStore } from '@/stores/accounts';
import AccountForm from './components/AccountForm.vue';

const store = useAccountsStore();
</script>

<template>
  <div>
    <h1>Управление учетными записями</h1>
    <button @click="store.addAccount()">+ Добавить запись</button>
    
    <div v-for="account in store.accounts" :key="account.id">
      <AccountForm :account="account" />
    </div>
  </div>
</template>