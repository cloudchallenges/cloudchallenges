// Client-side filtering logic for /challenge index
// Reads JSON from #challenges-data and renders service/tag buttons and the challenge list.

interface Challenge {
  id: string;
  title: string;
  summary?: string;
  services?: Record<string, string[]>;
  tags?: string[];
}

const dataEl = document.getElementById('challenges-data');
let CHALLENGES: Challenge[] = [];
if (dataEl) {
  try {
    const raw = dataEl.textContent || '';
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) CHALLENGES = parsed as Challenge[];
    else {
      console.error('Challenges JSON is not an array:', parsed);
      CHALLENGES = [];
    }
  } catch (err) {
    console.error('Failed to parse challenges JSON:', err);
    console.error('Raw challenges-data content:', dataEl.textContent);
    CHALLENGES = [];
  }
}

const providerButtons: HTMLElement[] = Array.from(document.querySelectorAll<HTMLElement>('.provider-btn, .provider-toggle'));
const serviceContainer = document.getElementById('serviceButtons') as HTMLElement | null;
const tagContainer = document.getElementById('tagButtons') as HTMLElement | null;
const clearBtn = document.getElementById('clearFilters') as HTMLElement | null;
const listEl = document.getElementById('challengeList') as HTMLUListElement | null;

let selectedProvider: string | null = null;
let selectedService: string | null = null;
let selectedTags: Set<string> = new Set();

function getServicesForProvider(provider: string | null): string[] {
  const services = new Set<string>();
  CHALLENGES.forEach((c) => {
    if (!provider) {
      Object.keys(c.services || {}).forEach((p) => {
        (c.services?.[p] || []).forEach((item) => services.add(item));
      });
    } else if (c.services && c.services[provider]) {
      (c.services[provider] || []).forEach((item) => services.add(item));
    }
  });
  return [...services].sort();
}

function getTags(filtered: Challenge[]): string[] {
  const tags = new Set<string>();
  filtered.forEach((c) => (c.tags || []).forEach((t) => tags.add(t)));
  return [...tags].sort();
}

function showServiceGroupsForProvider(provider: string | null): void {
  if (!serviceContainer) return;
  const groups = Array.from(serviceContainer.querySelectorAll<HTMLElement>('.service-group'));
  groups.forEach((g) => {
    const p = g.dataset.provider;
    if (!provider || p === provider) {
      g.style.display = '';
    } else {
      g.style.display = 'none';
    }
  });
}

function clearChildren(el: HTMLElement | null): void {
  if (!el) return;
  while (el.firstChild) el.removeChild(el.firstChild);
}

function getAllServiceButtons(): HTMLElement[] {
  if (!serviceContainer) return [];
  return Array.from(serviceContainer.querySelectorAll<HTMLElement>('.service-btn, .service-toggle'));
}

function getAllTagButtons(): HTMLElement[] {
  if (!tagContainer) return [];
  return Array.from(tagContainer.querySelectorAll<HTMLElement>('.tag-btn, .tag-toggle'));
}

function updateTagButtonsAvailability(filtered: Challenge[]): void {
  const available = new Set(getTags(filtered));
  for (const btn of getAllTagButtons()) {
    const tag = btn.dataset.tag;
    if (!tag) continue;
    if (available.has(tag)) {
      btn.style.display = '';
    } else {
      btn.style.display = 'none';
      // if a hidden tag was selected, unselect it
      if (selectedTags.has(tag)) selectedTags.delete(tag);
      btn.classList.remove('active');
      btn.setAttribute('aria-checked', 'false');
    }
  }
}

function wireServiceButtons(): void {
  for (const btn of getAllServiceButtons()) {
    btn.addEventListener('click', () => {
      const s = btn.dataset.service;
      if (!s) return;
      selectedService = selectedService === s ? null : s;
      for (const b of getAllServiceButtons()) b.classList.toggle('active', b.dataset.service === selectedService);
      for (const b of getAllServiceButtons()) b.setAttribute('aria-checked', String(b.dataset.service === selectedService));
      applyFilters();
    });
  }
}

function wireTagButtons(): void {
  for (const btn of getAllTagButtons()) {
    const t = btn.dataset.tag;
    if (!t) continue;
    btn.addEventListener('click', () => {
      if (selectedTags.has(t)) selectedTags.delete(t);
      else selectedTags.add(t);
      btn.classList.toggle('active', selectedTags.has(t));
      btn.setAttribute('aria-checked', String(selectedTags.has(t)));
      applyFilters();
    });
  }
}

function renderList(items: Challenge[]): void {
  if (!listEl) return;
  clearChildren(listEl);
  if (!items.length) {
    const li = document.createElement('li');
    li.textContent = 'No challenges match the filters';
    listEl.appendChild(li);
    return;
  }
  items.forEach((c) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `/challenge/${c.id}`;
    a.textContent = c.title;
    li.appendChild(a);
    if (c.summary) {
      const p = document.createElement('p');
      p.textContent = c.summary;
      li.appendChild(p);
    }
    listEl.appendChild(li);
  });
}

function applyFilters(): void {
  let filtered: Challenge[] = CHALLENGES.slice();
  if (selectedProvider) {
    const sp = selectedProvider as string;
    filtered = filtered.filter((c) => Boolean(c.services && c.services[sp]));
  }
  if (selectedService) {
    filtered = filtered.filter((c) => {
      if (!c.services) return false;
      const vals = Object.values(c.services).flat();
      return vals.includes(selectedService as string);
    });
  }
  if (selectedTags.size) {
    const tags = Array.from(selectedTags);
    filtered = filtered.filter((c) => tags.every((t) => (c.tags || []).includes(t)));
  }

  updateTagButtonsAvailability(filtered);
  renderList(filtered);
}

// wire provider buttons
providerButtons.forEach((btn) => {
  const p = btn.dataset.provider ?? null;
  btn.addEventListener('click', () => {
    if (selectedProvider === p) selectedProvider = null;
    else selectedProvider = p;
    // update provider button active states and aria
    providerButtons.forEach((b) => {
      const isActive = b.dataset.provider === selectedProvider;
      b.classList.toggle('active', isActive);
      b.setAttribute('aria-checked', String(isActive));
    });
    // reset service and selectedService
    selectedService = null;
    // show/hide service groups
    showServiceGroupsForProvider(selectedProvider);
    // reset service active states/aria
    for (const b of getAllServiceButtons()) {
      b.classList.remove('active');
      b.setAttribute('aria-checked', 'false');
    }
    applyFilters();
  });
});

// clear button
if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    selectedProvider = null;
    selectedService = null;
    selectedTags.clear();
    providerButtons.forEach((b) => {
      b.classList.remove('active');
      b.setAttribute('aria-checked', 'false');
    });
    showServiceGroupsForProvider(null);
    for (const b of getAllServiceButtons()) {
      b.classList.remove('active');
      b.setAttribute('aria-checked', 'false');
    }
    for (const b of getAllTagButtons()) {
      b.classList.remove('active');
      b.setAttribute('aria-checked', 'false');
      b.style.display = '';
    }
    renderList(CHALLENGES);
  });
}

// init
// wire up existing service/tag buttons and init
showServiceGroupsForProvider(null);
wireServiceButtons();
wireTagButtons();
renderList(CHALLENGES);
