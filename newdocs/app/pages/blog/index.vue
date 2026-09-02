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

function displayAuthor(author: string | undefined) {
  return author === 'AIOStack Team' ? 'Aurva Security' : author
}
</script>

<template>
  <div class="v4-page dark">
    <LandingNavbar />
    <div class="v4-frame">

      <section class="v4-section v4-blog-hero">
        <div class="v4-container">
          <span class="v4-section-num">AURVA · BLOG</span>
          <h1 class="v4-display" style="margin-top:16px">Writings from Aurva.</h1>
          <p class="v4-lead" style="margin-top:28px;max-width:680px">
            Research, field notes, and perspectives on agentic AI, runtime systems, security,
            and the forces reshaping enterprise software.
          </p>
        </div>
      </section>

      <section class="v4-section v4-bordered v4-blog-list">
        <div class="v4-container">
          <div class="v4-blog-grid">
            <NuxtLink
              v-for="post in posts"
              :key="post.path"
              :to="post.path"
              class="v4-blog-card"
            >
              <div class="v4-blog-card-top">
                <div class="v4-blog-card-meta">
                  <span v-if="post.date">{{ formatDate(post.date) }}</span>
                  <span v-if="post.readTime">{{ post.readTime }}</span>
                </div>
                <h2 class="v4-blog-card-title">{{ post.title }}</h2>
              </div>
              <div class="v4-blog-card-footer">
                <div class="v4-blog-card-footer-left">
                  <span v-if="post.author" class="v4-blog-card-author">{{ displayAuthor(post.author) }}</span>
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

      <LandingFinalCTA
        :title-lines="['See the risk.', 'Control the runtime.']"
        copy="Put Aurva research into practice with live visibility across agents, models, identities, data flows, and destinations. Zero friction. Zero code changes."
        primary-label="Install in 10 mins"
        primary-to="/docs/getting-started/introduction"
        secondary-label="Contact sales"
        secondary-href="/contact/sales"
      />

    </div>
    <LandingFooter />
  </div>
</template>

<style scoped>
.v4-blog-hero { padding: 80px 0 60px; }
.v4-blog-list { padding: 60px 0 80px; }

.v4-blog-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}

.v4-blog-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, .42fr);
  align-items: end;
  gap: 40px;
  padding: 24px 26px;
  border: 1px solid rgba(255,255,255,.1);
  background:
    linear-gradient(rgba(255,255,255,.012) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.012) 1px, transparent 1px),
    rgba(255,255,255,.015);
  background-size: 24px 24px;
  text-decoration: none;
  min-height: 118px;
  transition: border-color 0.15s, background 0.15s;
}
.v4-blog-card:hover {
  border-color: rgba(255,255,255,.16);
  background: rgba(255,255,255,.03);
}

.v4-blog-card-top { display: flex; flex-direction: column; gap: 12px; }

.v4-blog-card-meta {
  display: flex;
  gap: 9px;
  align-items: center;
  font-family: var(--v4-sans);
  font-size: 12px;
  font-weight: 500;
  color: rgba(255,255,255,.38);
}

.v4-blog-card-meta span + span::before {
  content: '·';
  margin-right: 9px;
  color: rgba(255,255,255,.22);
}

.v4-blog-card-title {
  font-family: var(--v4-sans);
  font-size: 23px;
  font-weight: 600;
  line-height: 1.35;
  color: rgba(255,255,255,.88);
  margin: 0;
  text-wrap: balance;
  transition: color 0.15s;
}
.v4-blog-card:hover .v4-blog-card-title { color: #fff; }

.v4-blog-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 0;
  margin: 0;
  border: 0;
}

.v4-blog-card-footer-left {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.v4-blog-card-author {
  font-size: 13px;
  font-weight: 550;
  color: rgba(255,255,255,.62);
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
  color: rgba(255,255,255,.4);
  border: 1px solid rgba(255,255,255,.1);
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
  color: rgba(255,255,255,.82);
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .v4-blog-card {
    grid-template-columns: 1fr;
    gap: 20px;
    min-height: 0;
  }

  .v4-blog-card-footer {
    padding-top: 16px;
    border-top: 1px solid rgba(255,255,255,.06);
  }
}
</style>
