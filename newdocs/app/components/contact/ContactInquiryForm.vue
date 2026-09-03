<script setup lang="ts">
const props = defineProps<{
  kind: 'sales' | 'engineering'
}>()

const topics = computed(() => props.kind === 'sales'
  ? [
      'Product evaluation',
      'Plans and pricing',
      'Deployment and onboarding',
      'Shadow AI and runtime coverage',
      'Aurva community',
      'Other',
    ]
  : [
      'eBPF and runtime architecture',
      'Identity and data attribution',
      'AI policy and enforcement',
      'Deployment and integrations',
      'Research collaboration',
      'Other',
    ])

const formElement = ref<HTMLFormElement | null>(null)
const destinationEmail = computed(() => props.kind === 'engineering' ? 'swapnil.nair@aurva.io' : 'sales@aurva.io')
const destinationLabel = computed(() => destinationEmail.value.toUpperCase())
const formAction = computed(() => `https://formsubmit.co/${destinationEmail.value}`)
const ajaxEndpoint = computed(() => `https://formsubmit.co/ajax/${destinationEmail.value}`)
const subject = computed(() => `[Aurva website] ${props.kind === 'sales' ? 'Sales' : 'Engineering'} inquiry`)

const form = reactive({
  name: '',
  email: '',
  company: '',
  role: '',
  topic: '',
  message: '',
  website: '',
})

const submitting = ref(false)
const submitted = ref(false)
const errorMessage = ref('')

async function submitForm() {
  submitting.value = true
  submitted.value = false
  errorMessage.value = ''

  try {
    if (!formElement.value) {
      throw new Error('Contact form is unavailable.')
    }

    const response = await fetch(ajaxEndpoint.value, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: new FormData(formElement.value),
    })

    if (!response.ok) {
      throw new Error(`FormSubmit returned ${response.status}.`)
    }

    submitted.value = true
    Object.assign(form, {
      name: '',
      email: '',
      company: '',
      role: '',
      topic: '',
      message: '',
      website: '',
    })
  }
  catch {
    errorMessage.value = `We could not send your message. Please email ${destinationEmail.value} directly.`
  }
  finally {
    submitting.value = false
  }
}
</script>

<template>
  <form
    ref="formElement"
    class="contact-form"
    :action="formAction"
    method="POST"
    @submit.prevent="submitForm"
  >
    <input type="hidden" name="_subject" :value="subject">
    <input type="hidden" name="_template" value="table">
    <input type="hidden" name="inquiry_type" :value="kind">

    <div class="contact-form-head">
      <span>{{ kind === 'sales' ? 'SALES INQUIRY' : 'ENGINEERING INQUIRY' }}</span>
      <small>ROUTES TO {{ destinationLabel }}</small>
    </div>

    <div class="contact-form-grid">
      <label class="contact-field">
        <span>Name</span>
        <input
          v-model="form.name"
          type="text"
          name="name"
          autocomplete="name"
          maxlength="120"
          required
          placeholder="Your name"
        >
      </label>

      <label class="contact-field">
        <span>Work email</span>
        <input
          v-model="form.email"
          type="email"
          name="email"
          autocomplete="email"
          maxlength="254"
          required
          placeholder="you@company.com"
        >
      </label>

      <label class="contact-field">
        <span>Company</span>
        <input
          v-model="form.company"
          type="text"
          name="company"
          autocomplete="organization"
          maxlength="160"
          required
          placeholder="Company name"
        >
      </label>

      <label class="contact-field">
        <span>Role <small>optional</small></span>
        <input
          v-model="form.role"
          type="text"
          name="role"
          autocomplete="organization-title"
          maxlength="120"
          placeholder="Your role"
        >
      </label>

      <label class="contact-field contact-field-wide">
        <span>What would you like to discuss?</span>
        <select v-model="form.topic" name="topic" required>
          <option value="" disabled>Select a topic</option>
          <option v-for="topic in topics" :key="topic" :value="topic">
            {{ topic }}
          </option>
        </select>
      </label>

      <label class="contact-field contact-field-wide">
        <span>Message</span>
        <textarea
          v-model="form.message"
          name="message"
          minlength="10"
          maxlength="5000"
          required
          rows="6"
          :placeholder="kind === 'sales'
            ? 'Tell us about your environment, AI initiatives, and security goals.'
            : 'Share the architecture, integration, or research question you are working through.'"
        />
      </label>

      <label class="contact-honeypot" aria-hidden="true">
        <span>Website</span>
        <input v-model="form.website" type="text" name="_honey" tabindex="-1" autocomplete="off">
      </label>
    </div>

    <div class="contact-form-footer">
      <button type="submit" :disabled="submitting">
        {{ submitting ? 'Sending…' : 'Send inquiry' }}
        <span aria-hidden="true">→</span>
      </button>
      <p>
        Prefer email?
        <a :href="`mailto:${destinationEmail}`">{{ destinationEmail }}</a>
      </p>
    </div>

    <p v-if="submitted" class="contact-form-status contact-form-status-success" role="status">
      Message received. The Aurva team will be in touch.
    </p>
    <p v-if="errorMessage" class="contact-form-status contact-form-status-error" role="alert">
      {{ errorMessage }}
    </p>
  </form>
</template>

<style scoped>
.contact-form {
  position: relative;
  border: 1px solid rgba(255,255,255,.18);
  background:
    linear-gradient(rgba(255,255,255,.014) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.014) 1px, transparent 1px),
    rgba(255,255,255,.01);
  background-size: 28px 28px;
}

.contact-form::before,
.contact-form::after {
  position: absolute;
  width: 22px;
  height: 22px;
  content: '';
  pointer-events: none;
}

.contact-form::before {
  top: -1px;
  left: -1px;
  border-top: 2px solid rgba(255,255,255,.66);
  border-left: 2px solid rgba(255,255,255,.66);
}

.contact-form::after {
  right: -1px;
  bottom: -1px;
  border-right: 2px solid rgba(255,255,255,.66);
  border-bottom: 2px solid rgba(255,255,255,.66);
}

.contact-form-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 18px 22px;
  border-bottom: 1px solid rgba(255,255,255,.12);
  font-family: var(--v4-mono);
  font-size: 10px;
  letter-spacing: .12em;
}

.contact-form-head span {
  color: rgba(255,255,255,.78);
}

.contact-form-head small {
  color: var(--v4-fg-3);
  font-size: 9px;
}

.contact-form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px 18px;
  padding: 28px 28px 30px;
}

.contact-field {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 9px;
}

.contact-field-wide {
  grid-column: 1 / -1;
}

.contact-field > span {
  color: rgba(255,255,255,.68);
  font-size: 12px;
  font-weight: 500;
}

.contact-field > span small {
  margin-left: 4px;
  color: var(--v4-fg-3);
  font-size: 10px;
  font-weight: 400;
}

.contact-field input,
.contact-field select,
.contact-field textarea {
  width: 100%;
  border: 1px solid rgba(255,255,255,.14);
  border-radius: 0;
  outline: 0;
  background: rgba(4,5,7,.72);
  color: var(--v4-fg);
  font: inherit;
  font-size: 14px;
  transition: border-color .15s, background .15s;
}

.contact-field input,
.contact-field select {
  height: 46px;
  padding: 0 13px;
}

.contact-field textarea {
  min-height: 146px;
  resize: vertical;
  padding: 13px;
  line-height: 1.5;
}

.contact-field input::placeholder,
.contact-field textarea::placeholder {
  color: rgba(255,255,255,.25);
}

.contact-field input:focus,
.contact-field select:focus,
.contact-field textarea:focus {
  border-color: rgba(255,255,255,.52);
  background: rgba(8,9,11,.94);
}

.contact-form-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 20px 28px;
  border-top: 1px solid rgba(255,255,255,.12);
}

.contact-form-footer button {
  display: inline-flex;
  min-height: 46px;
  align-items: center;
  justify-content: center;
  gap: 28px;
  border: 1px solid var(--v4-fg);
  border-radius: 0;
  padding: 0 20px;
  background: var(--v4-fg);
  color: var(--v4-bg);
  font-family: var(--v4-sans);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background .15s, opacity .15s;
}

.contact-form-footer button:hover:not(:disabled) {
  background: #fff;
}

.contact-form-footer button:disabled {
  cursor: wait;
  opacity: .6;
}

.contact-form-footer p {
  margin: 0;
  color: var(--v4-fg-3);
  font-size: 12px;
}

.contact-form-footer a {
  color: var(--v4-fg-2);
  text-underline-offset: 3px;
}

.contact-form-status {
  margin: 0;
  padding: 14px 28px;
  border-top: 1px solid rgba(255,255,255,.1);
  font-size: 13px;
}

.contact-form-status-success {
  color: rgba(184,219,151,.9);
}

.contact-form-status-error {
  color: rgba(238,139,139,.92);
}

.contact-honeypot {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

@media (max-width: 620px) {
  .contact-form-head {
    align-items: flex-start;
    flex-direction: column;
    gap: 6px;
  }

  .contact-form-grid {
    grid-template-columns: 1fr;
    padding: 22px 20px 24px;
  }

  .contact-field-wide {
    grid-column: auto;
  }

  .contact-form-footer {
    align-items: stretch;
    flex-direction: column;
    padding: 18px 20px;
  }

  .contact-form-footer button {
    width: 100%;
  }

  .contact-form-status {
    padding-right: 20px;
    padding-left: 20px;
  }
}
</style>
