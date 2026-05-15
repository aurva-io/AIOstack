<script setup lang="ts">
definePageMeta({
  layout: false,
  header: false,
  footer: false,
})

const { data: posts } = await useAsyncData('blog-index', () =>
  queryCollection('blog')
    .order('date', 'DESC')
    .all()
)

function formatDate(d: string | Date | undefined) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function slugFromPath(path: string) {
  return path.replace(/^\/blog\//, '')
}
</script>

<template>
  <div class="v4-page dark">
    <LandingNavbar />
    <div class="v4-frame">

      <section class="v4-section v4-blog-hero">
        <div class="v4-rule v4-rule-h" :style="{ top: 0 }" />
        <div class="v4-coordinates" />
        <div class="v4-container">
          <span class="v4-section-num">§ AURVA · BLOG</span>
          <h1 class="v4-display" style="margin-top:16px">
            Research &amp; writing<br>
            <span class="v4-em">from the team.</span>
          </h1>
          <p class="v4-lead" style="margin-top:20px;max-width:560px">
            Deep dives on runtime security, eBPF internals, AI agent behavior, and the threat landscape.
          </p>
        </div>
      </section>

      <section class="v4-section v4-bordered v4-blog-list">
        <div class="v4-rule v4-rule-h" :style="{ top: 0 }" />
        <div class="v4-container">
          <div class="v4-blog-grid">
            <NuxtLink
              v-for="(post, i) in posts"
              :key="post.path"
              :to="post.path"
              class="v4-blog-card"
            >
              <div class="v4-blog-card-top">
                <div class="v4-blog-card-meta">
                  <span class="v4-mono v4-mono-dim">{{ String(i + 1).padStart(2, '0') }}</span>
                  <span v-if="post.date" class="v4-mono v4-mono-dim">{{ formatDate(post.date) }}</span>
                  <span v-if="post.readTime" class="v4-mono v4-mono-dim">{{ post.readTime }}</span>
                </div>
                <h2 class="v4-blog-card-title">{{ post.title }}</h2>
                <p v-if="post.description" class="v4-blog-card-desc">{{ post.description }}</p>
              </div>
              <div class="v4-blog-card-footer">
                <div class="v4-blog-card-footer-left">
                  <span v-if="post.author" class="v4-sig">{{ post.author }}</span>
                  <div v-if="post.keywords?.length" class="v4-blog-card-tags">
                    <span v-for="kw in post.keywords.slice(0, 3)" :key="kw" class="v4-blog-card-tag">{{ kw }}</span>
                  </div>
                </div>
                <span class="v4-blog-card-arrow">→</span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </section>

    </div>
    <LandingFooter />
  </div>
</template>

<style scoped>
.v4-blog-hero { padding: 80px 0 60px; }
.v4-blog-list { padding: 60px 0 80px; }

.v4-blog-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
}

.v4-blog-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 28px 26px;
  border: 1px solid rgba(255,255,255,.07);
  background: rgba(255,255,255,.015);
  text-decoration: none;
  min-height: 220px;
  transition: border-color 0.15s, background 0.15s;
}
.v4-blog-card:hover {
  border-color: rgba(255,255,255,.16);
  background: rgba(255,255,255,.03);
}

.v4-blog-card-top { display: flex; flex-direction: column; gap: 14px; }

.v4-blog-card-meta {
  display: flex;
  gap: 14px;
  align-items: center;
}

.v4-blog-card-title {
  font-family: var(--v4-sans);
  font-size: 17px;
  font-weight: 600;
  line-height: 1.35;
  color: rgba(255,255,255,.88);
  margin: 0;
  transition: color 0.15s;
}
.v4-blog-card:hover .v4-blog-card-title { color: rgba(170,220,138,.95); }

.v4-blog-card-desc {
  font-size: 13px;
  line-height: 1.6;
  color: rgba(255,255,255,.44);
  margin: 0;
}

.v4-blog-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: 16px;
  margin-top: 16px;
  border-top: 1px solid rgba(255,255,255,.06);
}

.v4-blog-card-footer-left {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.v4-blog-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.v4-blog-card-tag {
  font-family: var(--v4-mono);
  font-size: 9px;
  letter-spacing: .07em;
  text-transform: uppercase;
  color: rgba(170,220,138,.55);
  border: 1px solid rgba(170,220,138,.15);
  padding: 2px 6px;
}

.v4-blog-card-arrow {
  font-family: var(--v4-mono);
  font-size: 14px;
  color: rgba(255,255,255,.25);
  flex-shrink: 0;
  transition: color 0.15s, transform 0.15s;
}
.v4-blog-card:hover .v4-blog-card-arrow {
  color: rgba(170,220,138,.7);
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .v4-blog-grid { grid-template-columns: 1fr; }
}
</style>
