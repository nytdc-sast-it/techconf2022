<template>
  <div class="submit-form-wrapper">
    <div class="submit-form-title">科技节弹幕发送平台</div>
    <div class="submit-form-sub-title">尽情的发送弹幕吧~</div>
    <div class="submit-form-error-msg">{{ errorMessage }}</div>
    <a-form
      ref="submitForm"
      :model="submitFormInfo"
      class="submit-form"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="name"
        :rules="[{ required: true, message: '请输入姓名' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input v-model="submitFormInfo.name" placeholder="姓名">
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="id"
        :rules="[
          {
            match: /^[1-2][0-9]{7}$/,
            message: '学号格式错误',
          },
          { required: true, message: '请输入学号' },
        ]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input v-model="submitFormInfo.id" placeholder="学号" allow-clear>
          <template #prefix>
            <icon-lock />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="danmu"
        :rules="[{ required: true, message: '请输入弹幕内容' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="submitFormInfo.danmu"
          placeholder="弹幕内容"
          allow-clear
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <a-button type="primary" html-type="submit" long :loading="loading">
          提交
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
  import useLoading from '@/hooks/loading';
  import { Message } from '@arco-design/web-vue';

  const errorMessage = ref('');
  const { loading, setLoading } = useLoading();

  const submitFormInfo = reactive({
    name: '',
    id: '',
    danmu: '',
  });

  const handleSubmit = async ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
  }) => {
    if (loading.value) return;
    if (!errors) {
      setLoading(true);
      try {
        const ws = new WebSocket('wss://techconf.sastit.com/api/ws');
        ws.onopen = () => {
          ws.send(JSON.stringify(values));
          Message.success('发送成功');
          submitFormInfo.name = '';
          submitFormInfo.id = '';
          submitFormInfo.danmu = '';
          ws.close();
        };
      } catch (err) {
        errorMessage.value = (err as Error).message;
      } finally {
        setLoading(false);
      }
    }
  };
</script>

<style lang="less" scoped>
  .submit-form {
    &-wrapper {
      width: 320px;
    }

    &-title {
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
    }

    &-sub-title {
      color: var(--color-text-3);
      font-size: 16px;
      line-height: 24px;
    }

    &-error-msg {
      height: 32px;
      color: rgb(var(--red-6));
      line-height: 32px;
    }

    &-password-actions {
      display: flex;
      justify-content: space-between;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }
  }
</style>
