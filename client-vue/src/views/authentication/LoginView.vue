<template>
  <div class="login-wrapper">
    <div class="login-card">
      Please login to access the page
      <Input
          title="Email"
          type="email"
          :value="email"
          placeholder="Enter your email"
          :onChange="(e) => this.email = e.target.value"
      />
      <Input
          title="Password"
          type="password"
          :value="password"
          placeholder="Enter your password"
          :onChange="(e) => this.password = e.target.value"
      />

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <div class="actions">
        <Button :onClick="handleLogin">Login</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Input } from '@/components';
import { fetchData } from '@/utils';
import { auth, setAuth } from '@/store/auth-store';

export default {
  name: 'LoginView',
  components: { Button, Input },
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  mounted() {
    if (auth.token) {
      this.$router.push({ name: 'Account' });
    }
  },
  methods: {
    handleLogin() {
      if (!this.email || !this.password) {
        this.error = !this.email ?
            'Email ' + (!this.password ? 'and password must be provided!' : 'must be provided!') :
            'Password must be provided!';
        return;
      }

      const user = JSON.stringify({
        email: this.email,
        password: this.password
      });
      fetchData(process.env.VUE_APP_BACKEND_URL + '/user/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: user,
      })
          .then(res => res.json())
          .then(res => {
            if (res.errors) {
              this.error = res.errors.map(err => err.msg + ' ' + err.param).join(' and ');
              return;
            } else if (res.error) {
              this.error = res.error;
              return;
            }
            this.$router.push({ name: 'Account' });
            setAuth(res.email, res.token);
          });
    },
  }
};
</script>

<style scoped>
.login-wrapper {
  position: absolute;
  inset: 0 0 0 0;
  display: flex;
  background-color: var(--background-color);
  justify-content: center;
  flex-flow: column nowrap;
  align-items: center;
  padding: 1rem;
}

.login-wrapper > .login-card {
  z-index: 1;
  max-width: 600px;
  width: 100%;
  padding: 2rem;
  margin-top: 150px;
  background-color: var(--background-second);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  color: var(--primary-color);
  border-radius: 18px;
}

.login-wrapper .login-card .actions {
  display: flex;
  gap: 2rem;
  justify-content: center;
}
.login-wrapper .login-card .error-message {
  color: red;
  font-weight: bold;
}

</style>
