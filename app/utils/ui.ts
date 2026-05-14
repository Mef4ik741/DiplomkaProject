export const openModal = (dest: string) => {
  const title = document.getElementById("modal-title");
  const sub = document.getElementById("modal-sub");
  const modal = document.getElementById("modal");
  if (title) title.textContent = "Тур в " + dest;
  if (sub)
    sub.textContent =
      "Оставьте заявку и мы перезвоним с лучшими предложениями по " + dest;
  if (modal) modal.classList.add("open");
};

export const closeModal = (e?: any) => {
  const modal = document.getElementById("modal");
  if (!e || e.target === modal) {
    modal?.classList.remove("open");
  }
};

export const showToast = (msg: string) => {
  const t = document.getElementById("toast");
  if (t) {
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 3500);
  }
};
