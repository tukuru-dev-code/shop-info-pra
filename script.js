// =========================================================
// こもれび整体院 動きのプログラム
// ・メニューの開け閉め
// ・LINEボタン（見た目だけ）を押してもページが動かないようにする
// ・スクロールでセクションをふわっと表示
// ※ よくある質問の開け閉めは HTML の <details> でできているので、ここでは何もしない
// ※ ページ内の移動は style.css の scroll-padding-top でヘッダー分ずらしている
// =========================================================

// ---------- メニューの開け閉め ----------
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav__link");

// メニューを開く・閉じる処理（open が true なら開く）
function setMenuOpen(open) {
  menuButton.classList.toggle("is-open", open);
  nav.classList.toggle("is-open", open);
  // 読み上げソフト向けに、今の状態を伝える
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
}

// ≡ボタンを押したら、開いていれば閉じる・閉じていれば開く
menuButton.addEventListener("click", () => {
  const isOpen = menuButton.classList.contains("is-open");
  setMenuOpen(!isOpen);
});

// メニューのリンクを押したら、移動と同時にメニューを閉じる
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setMenuOpen(false);
  });
});

// ---------- スムーズなスクロール ----------
// 動きを減らす設定にしていない人だけ、ページ内の移動をなめらかにする
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.style.scrollBehavior = "smooth";
}

// ---------- LINEボタン（見た目だけ） ----------
// リンク先がダミー（#）なので、押してもページの一番上に飛ばないようにする
document.querySelectorAll(".js-dummy-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
  });
});

// ---------- スクロールでふわっと表示 ----------
const fadeItems = document.querySelectorAll(".fade-in");

if ("IntersectionObserver" in window) {
  // 画面に入ってきたら is-visible を付けて表示する（一度表示したら見張りをやめる）
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 } // 15%見えたら表示
  );

  fadeItems.forEach((item) => observer.observe(item));
} else {
  // 古いブラウザでこの仕組みが使えないときは、最初から全部表示しておく
  fadeItems.forEach((item) => item.classList.add("is-visible"));
}
