const sentences = [
  ["治愈", "慢一点也没关系，好戏都在后面。"],
  ["治愈", "今天很好，明天也会有新的好。"],
  ["治愈", "把疲惫留在昨天，把期待带去明天。"],
  ["治愈", "允许一切发生，也允许自己重新出发。"],
  ["治愈", "日子偶尔难过，但也处处有糖。"],
  ["治愈", "你不用时刻发光，休息也算成长。"],
  ["治愈", "风会记得每一朵花认真开过。"],
  ["治愈", "别急，生活会把答案慢慢写给你。"],
  ["治愈", "心有小暖，岁月不寒。"],
  ["治愈", "把今天过好，就是给明天最好的礼物。"],
  ["清醒", "不解释，是成年人留给自己的体面。"],
  ["清醒", "情绪要有出口，生活要有节奏。"],
  ["清醒", "不必讨好所有人，真诚留给值得的人。"],
  ["清醒", "先照顾好自己，再奔赴想要的生活。"],
  ["清醒", "不困在过去，也不预支烦恼。"],
  ["清醒", "选择比努力重要，方向比速度重要。"],
  ["清醒", "热闹是别人的，步调要是自己的。"],
  ["清醒", "懂得翻篇，才有新的故事。"],
  ["清醒", "边界感，是所有舒服关系的开始。"],
  ["清醒", "不要为还没发生的事，提前失去快乐。"],
  ["生活", "普通的日子，也藏着细碎的光。"],
  ["生活", "一半烟火，一半清欢。"],
  ["生活", "认真吃饭，好好睡觉，慢慢生活。"],
  ["生活", "记得给忙碌的日子留一点空白。"],
  ["生活", "三餐四季，温柔有趣。"],
  ["生活", "把平凡的小事，过成喜欢的样子。"],
  ["生活", "天气晴朗，宜收集快乐。"],
  ["生活", "幸福不是答案，是一路上的小事。"],
  ["生活", "今日份的生活，值得好好保存。"],
  ["生活", "有花看，有饭吃，有人惦记。"],
  ["成长", "你走的每一步，都算数。"],
  ["成长", "山高路远，看世界，也找自己。"],
  ["成长", "别怕走慢，只怕停在原地。"],
  ["成长", "把自己还给自己，把别人还给别人。"],
  ["成长", "不必一下子优秀，先一天比一天勇敢。"],
  ["成长", "路要自己走，答案要自己找。"],
  ["成长", "熬过无人问津，才配得上诗和远方。"],
  ["成长", "每一次告别，都在为新的相遇腾位置。"],
  ["成长", "与其等风来，不如追着风走。"],
  ["成长", "你只管向前，时间会替你证明。"],
  ["浪漫", "有人爱晚风，有人爱晚风里的你。"],
  ["浪漫", "见山是山，见你是欢喜。"],
  ["浪漫", "日落尤其温柔，人间皆是浪漫。"],
  ["浪漫", "想和你一起，把日子过成慢镜头。"],
  ["浪漫", "星星醉酒到处跑，月亮跌进深海里。"],
  ["浪漫", "世界很大，幸好我们遇见。"],
  ["浪漫", "心动没有标准，喜欢就是答案。"],
  ["浪漫", "你在身边，平常的日子也闪闪发亮。"],
  ["浪漫", "晚风捎来心事，月光替我保密。"],
  ["浪漫", "所有温柔眷恋，都是对你灿若星辰。"],
  ["松弛", "没关系，人生允许偶尔掉线。"],
  ["松弛", "不赶什么浪潮，也不搭什么船。"],
  ["松弛", "允许生活偶尔没有标准答案。"],
  ["松弛", "不慌不忙，按自己的节奏抵达。"],
  ["松弛", "偶尔摆烂，是在给快乐充电。"],
  ["松弛", "世界很吵，听自己的就好。"],
  ["松弛", "把心放宽，日子自然有光。"],
  ["松弛", "有空就快乐，没空就忙里偷闲。"],
  ["松弛", "不追着时间跑，也不会错过花开。"],
  ["松弛", "今天的任务：自在，尽兴，平安。"]
].map(([category, text], index) => ({ id: index + 1, category, text }));

const grid = document.querySelector("#sentence-grid");
const empty = document.querySelector("#empty");
const search = document.querySelector("#search");
const randomText = document.querySelector("#random-text");
const toast = document.querySelector("#toast");
let activeCategory = "全部";
let currentRandom = sentences[0].text;
let toastTimer;

document.querySelector("#today").textContent = new Intl.DateTimeFormat("zh-CN", {
  month: "long", day: "numeric", weekday: "short"
}).format(new Date());

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}

function render() {
  const keyword = search.value.trim().toLowerCase();
  const filtered = sentences.filter(item =>
    (activeCategory === "全部" || item.category === activeCategory) &&
    (!keyword || item.text.toLowerCase().includes(keyword) || item.category.includes(keyword))
  );
  grid.innerHTML = filtered.map(item => `
    <article class="sentence-card">
      <div class="card-meta"><span>${String(item.id).padStart(2, "0")}</span><span>${item.category}</span></div>
      <p>${escapeHtml(item.text)}</p>
      <button class="card-copy" type="button" data-copy="${escapeHtml(item.text)}">复制文案 ↗</button>
    </article>
  `).join("");
  empty.hidden = filtered.length !== 0;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const input = document.createElement("textarea");
    input.value = text; input.style.position = "fixed"; input.style.opacity = "0";
    document.body.appendChild(input); input.select(); document.execCommand("copy"); input.remove();
  }
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1600);
}

document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => {
  document.querySelector(".filter.active")?.classList.remove("active");
  button.classList.add("active");
  activeCategory = button.dataset.category;
  render();
}));

grid.addEventListener("click", event => {
  const button = event.target.closest("[data-copy]");
  if (button) copyText(button.dataset.copy);
});

search.addEventListener("input", render);
document.querySelector("#random-btn").addEventListener("click", () => {
  const next = sentences[Math.floor(Math.random() * sentences.length)].text;
  currentRandom = next;
  randomText.animate([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }], { duration: 300 });
  randomText.textContent = `“${next}”`;
  document.querySelector("#spotlight").scrollIntoView({ behavior: "smooth", block: "center" });
});
document.querySelector("#copy-random").addEventListener("click", () => copyText(currentRandom));

render();
