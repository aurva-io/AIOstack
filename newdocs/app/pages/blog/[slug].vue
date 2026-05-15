<script setup lang="ts">
definePageMeta({
  layout: false,
  header: false,
  footer: false,
})

const route = useRoute()
const slug = route.params.slug as string

const { data: post } = await useAsyncData(`blog-${slug}`, () =>
  queryCollection('blog').path(`/blog/${slug}`).first()
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

function formatDate(d: string | Date | undefined) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

useSeoMeta({
  title: post.value?.title,
  description: post.value?.description,
})
</script>

<template>
  <div class="v4-page dark">
    <LandingNavbar />
    <div class="v4-frame">

      <!-- ── HEADER ── -->
      <section class="v4-section v4-post-hero">
        <div class="v4-rule v4-rule-h" :style="{ top: 0 }" />
        <div class="v4-coordinates" />
        <div class="v4-container">
          <NuxtLink to="/blog" class="v4-post-back">← All posts</NuxtLink>

          <div class="v4-post-header">
            <div class="v4-post-eyebrow">
              <span class="v4-section-num">§ AURVA · BLOG</span>
            </div>
            <h1 class="v4-post-title">{{ post?.title }}</h1>
            <div class="v4-post-meta">
              <span v-if="post?.date" class="v4-mono v4-mono-dim">{{ formatDate(post.date) }}</span>
              <span v-if="post?.author" class="v4-mono v4-mono-dim">{{ post.author }}</span>
              <span v-if="post?.readTime" class="v4-mono v4-mono-dim">{{ post.readTime }}</span>
            </div>
            <p v-if="post?.description" class="v4-post-desc">{{ post.description }}</p>
            <div v-if="post?.keywords?.length" class="v4-post-keywords">
              <span v-for="kw in post.keywords" :key="kw" class="v4-post-kw">{{ kw }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ── BODY ── -->
      <section class="v4-section v4-bordered v4-post-body">
        <div class="v4-rule v4-rule-h" :style="{ top: 0 }" />
        <div class="v4-container">
          <div class="v4-prose">
            <ContentRenderer v-if="post" :value="post" />
          </div>
        </div>
      </section>

      <!-- ── NAV ── -->
      <section class="v4-section v4-bordered v4-post-nav">
        <div class="v4-rule v4-rule-h" :style="{ top: 0 }" />
        <div class="v4-container">
          <NuxtLink to="/blog" class="v4-btn v4-btn-ghost">← All posts</NuxtLink>
        </div>
      </section>

    </div>
    <LandingFooter />
  </div>
</template>

<style scoped>
/* ── Header ── */
.v4-post-hero { padding: 52px 0 48px; }

.v4-post-back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--v4-mono);
  font-size: 11px;
  letter-spacing: .06em;
  color: rgba(255,255,255,.35);
  text-decoration: none;
  margin-bottom: 32px;
  transition: color 0.15s;
}
.v4-post-back:hover { color: rgba(170,220,138,.8); }

.v4-post-header {
  max-width: 68ch;
  margin: 0 auto;
}

.v4-post-eyebrow { margin-bottom: 16px; }

.v4-post-title {
  font-family: var(--v4-sans);
  font-size: clamp(24px, 3.5vw, 40px);
  font-weight: 700;
  line-height: 1.2;
  color: rgba(255,255,255,.92);
  margin: 0 0 16px;
  letter-spacing: -.02em;
}

.v4-post-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.v4-post-desc {
  font-size: 18px;
  line-height: 1.55;
  color: rgba(255,255,255,.5);
  margin: 0 0 20px;
}

.v4-post-keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.v4-post-kw {
  font-family: var(--v4-mono);
  font-size: 10px;
  letter-spacing: .07em;
  text-transform: uppercase;
  color: rgba(255,255,255,.3);
  border: 1px solid rgba(255,255,255,.1);
  padding: 3px 8px;
  white-space: nowrap;
}

/* ── Body ── */
.v4-post-body { padding: 60px 0 80px; }
.v4-post-nav  { padding: 32px 0; }

/* ── Prose ── */
.v4-prose {
  font-size: 19px;
  line-height: 1.65;
  color: rgba(255,255,255,.75);
  max-width: 68ch;
  margin: 0 auto;
}

.v4-prose :deep(p) {
  margin: 0 0 1.4em;
}

/* Lead paragraph */
.v4-prose :deep(p:first-of-type) {
  font-size: 21px;
  line-height: 1.6;
  color: rgba(255,255,255,.85);
}

.v4-prose :deep(h2) {
  font-family: var(--v4-sans);
  font-size: 22px;
  font-weight: 600;
  line-height: 1.25;
  color: rgba(255,255,255,.92);
  margin: 2.2em 0 0.5em;
  letter-spacing: -.015em;
}

.v4-prose :deep(h3) {
  font-family: var(--v4-sans);
  font-size: 18px;
  font-weight: 600;
  line-height: 1.3;
  color: rgba(255,255,255,.85);
  margin: 1.8em 0 0.4em;
}

.v4-prose :deep(h4) {
  font-family: var(--v4-sans);
  font-size: 15px;
  font-weight: 600;
  color: rgba(255,255,255,.7);
  margin: 1.4em 0 0.3em;
}

.v4-prose :deep(strong) {
  color: rgba(255,255,255,.9);
  font-weight: 600;
}

.v4-prose :deep(em) {
  font-style: italic;
}

/* Discreet links — don't interrupt reading flow */
.v4-prose :deep(a) {
  color: inherit;
  text-decoration: underline;
  text-decoration-color: rgba(255,255,255,.25);
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
  transition: text-decoration-color 0.15s;
}
.v4-prose :deep(a:hover) {
  text-decoration-color: rgba(255,255,255,.65);
}

/* Lists */
.v4-prose :deep(ul),
.v4-prose :deep(ol) {
  padding-left: 1.5em;
  margin: 0 0 1.4em;
}

.v4-prose :deep(li) {
  margin-bottom: 0.4em;
  line-height: 1.6;
}

.v4-prose :deep(li p) { margin: 0; }

/* Code */
.v4-prose :deep(code) {
  font-family: var(--v4-mono);
  font-size: 0.82em;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.09);
  padding: 0.1em 0.4em;
  border-radius: 2px;
  color: rgba(255,255,255,.82);
}

.v4-prose :deep(pre) {
  background: rgba(0,0,0,.5);
  border: 1px solid rgba(255,255,255,.08);
  padding: 20px 24px;
  overflow-x: auto;
  margin: 0 0 1.4em;
  line-height: 1.5;
}

.v4-prose :deep(pre code) {
  background: none;
  border: none;
  padding: 0;
  font-size: 13.5px;
  color: rgba(255,255,255,.8);
}

/* Blockquote */
.v4-prose :deep(blockquote) {
  border-left: 3px solid rgba(255,255,255,.15);
  padding: 0 0 0 1.2em;
  margin: 0 0 1.4em;
  color: rgba(255,255,255,.55);
  font-style: italic;
}

.v4-prose :deep(blockquote p) { margin: 0; }

/* HR */
.v4-prose :deep(hr) {
  border: none;
  margin: 2.5em auto;
  height: 1px;
  background: rgba(255,255,255,.08);
}

/* Images */
.v4-prose :deep(img) {
  max-width: 100%;
  display: block;
  margin: 1.8em 0;
  border: 1px solid rgba(255,255,255,.07);
}

/* Tables */
.v4-prose :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 1.4em;
  font-size: 0.88em;
}

.v4-prose :deep(thead) {
  border-bottom: 1px solid rgba(255,255,255,.1);
}

.v4-prose :deep(th) {
  font-family: var(--v4-mono);
  font-size: 10px;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: rgba(255,255,255,.35);
  padding: 8px 14px 10px;
  text-align: left;
}

.v4-prose :deep(td) {
  padding: 10px 14px;
  border-bottom: 1px solid rgba(255,255,255,.05);
  color: rgba(255,255,255,.68);
  vertical-align: top;
  line-height: 1.5;
}

.v4-prose :deep(tr:last-child td) { border-bottom: none; }

/* ── Responsive ── */
@media (max-width: 600px) {
  .v4-post-header,
  .v4-prose { max-width: 100%; }
}
</style>
