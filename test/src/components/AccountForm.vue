<template>
  <div class="account-form">
    <el-form :model="localAccount" label-width="120px">
     
      <el-form-item label="Метка (необязательно)">
        <el-input
          v-model="labelText"
          placeholder="Введите метки через ;"
          maxlength="50"
          @blur="validate"
        />
      </el-form-item>

      
      <el-form-item label="Тип записи" required>
        <el-select
          v-model="localAccount.type"
          @change="handleTypeChange"
          placeholder="Выберите тип"
        >
          <el-option label="Локальная" value="Локальная" />
          <el-option label="LDAP" value="LDAP" />
        </el-select>
      </el-form-item>

     
      <el-form-item 
        label="Логин" 
        required
        :error="errors.login"
      >
        <el-input
          v-model="localAccount.login"
          placeholder="Введите логин"
          maxlength="100"
          @blur="validate"
        />
      </el-form-item>

      
      <el-form-item 
        v-if="localAccount.type === 'Локальная'" 
        label="Пароль" 
        required
        :error="errors.password"
      >
        <el-input
          v-model="localAccount.password"
          type="password"
          placeholder="Введите пароль"
          maxlength="100"
          show-password
          @blur="validate"
        />
      </el-form-item>

      
      <el-form-item>
        <el-button type="danger" @click="store.deleteAccount(account.id)">
          Удалить
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useAccountsStore } from '@/stores/accounts';
import { ref, computed } from 'vue';

const store = useAccountsStore();

const props = defineProps<{
  account: {
    id: string;
    label: { text: string }[];
    type: 'LDAP' | 'Локальная';
    login: string;
    password: string | null;
  };
}>();

const localAccount = ref({ ...props.account });
const errors = ref({
  login: '',
  password: ''
});


const labelText = computed({
  get: () => localAccount.value.label.map(item => item.text).join(';'),
  set: (value: string) => {
    localAccount.value.label = value.split(';')
      .filter(tag => tag.trim())
      .map(text => ({ text }));
  },
});


const validate = () => {
  let isValid = true;
  
  
  if (!localAccount.value.login.trim()) {
    errors.value.login = 'Обязательное поле';
    isValid = false;
  } else {
    errors.value.login = '';
  }

  
  if (localAccount.value.type === 'Локальная' && !localAccount.value.password) {
    errors.value.password = 'Обязательное поле';
    isValid = false;
  } else {
    errors.value.password = '';
  }

  if (isValid) {
    store.updateAccount(localAccount.value);
  }
};


const handleTypeChange = () => {
  if (localAccount.value.type === 'LDAP') {
    localAccount.value.password = null;
    errors.value.password = ''; 
  }
  validate();
};
</script>

<style scoped>
.account-form {
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}


:deep(.el-form-item__error) {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
}
</style>