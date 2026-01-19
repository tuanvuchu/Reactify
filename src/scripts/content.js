import { t } from "../lib/i18n";

function formatName(name) {
  return name
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatCategory(category) {
  return category.toLowerCase().trim().replaceAll(" ", "").replaceAll("&", "_");
}

function unicodeToEmoji(unified) {
  return String.fromCodePoint(parseInt(unified, 16));
}

function randomString(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let index = 0; index < length; index++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function randomNumber(digits) {
  if (digits < 1) return 0;
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getStoryId() {
  const element = document.querySelector(".xh8yej3.x1n2onr6[data-id]");
  return element.dataset.id;
}

function getUserId() {
  const iUser = document.cookie.match(/i_user=(\d+)/);
  if (iUser) {
    return iUser[1];
  }
  const cUser = document.cookie.match(/c_user=(\d+)/);
  if (cUser) {
    return cUser?.[1] || "";
  }
}

function getFbDtsg() {
  const scriptTags = document.querySelectorAll("script");
  for (const key of scriptTags) {
    const match = key.textContent.match(
      /"DTSGInitialData"[^"]*"token":"([^"]+)"/,
    );
    if (match) {
      return match[1];
    }
  }
}

async function sendReply(userId, fbDtsg, storyId, reaction) {
  try {
    const variables = {
      input: {
        attribution_id_v2: `StoriesCometSuspenseRoot.react,comet.stories.viewer,unexpected,${Date.now()},${randomNumber(
          5,
        )},,,;CometHomeRoot.react,comet.home,via_cold_start,${Date.now()},${randomNumber(
          6,
        )},4748854339,,`,
        lightweight_reaction_actions: { offsets: [0], reaction: reaction },
        message: reaction,
        story_id: storyId,
        story_reply_type: "LIGHT_WEIGHT",
        actor_id: userId,
        client_mutation_id: randomNumber(2),
      },
    };

    const body = new URLSearchParams({
      __a: 1,
      __aaid: 0,
      __ccg: "GOOD",
      __comet_req: 15,
      __crn: "comet.fbweb.CometStoriesSuspenseViewerRoute",
      // __csr: "",
      // __dyn: "",
      // __hblp: "",
      __hs: "20392.HYP:comet_pkg.2.1...0",
      // __hsdp: "",
      // __hsi: "",
      // __req: "",
      // __rev: "",
      // __s: "",
      // __sjsp: "",
      __spin_b: "trunk",
      __spin_r: randomNumber(10),
      __spin_t: randomNumber(10),
      __user: userId,
      av: userId,
      doc_id: "9697491553691692",
      dpr: 1,
      fb_api_caller_class: "RelayModern",
      fb_api_req_friendly_name: "useStoriesSendReplyMutation",
      fb_dtsg: fbDtsg,
      // jazoest: "",
      // lsd: "",
      server_timestamps: true,
      variables: JSON.stringify(variables),
    });
    await fetch("https://www.facebook.com/api/graphql/", {
      method: "POST",
      headers: {
        "X-FB-Friendly-Name": "useStoriesSendReplyMutation",
        "X-ASBD-ID": randomNumber(6),
        "X-FB-LSD": randomString(22),
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "*/*",
      },
      body: body.toString(),
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function handleReaction(emoji) {
  try {
    const [userId, fbDtsg, storyId] = await Promise.all([
      getUserId(),
      getFbDtsg(),
      getStoryId(),
    ]);

    if (!userId || !fbDtsg || !storyId) {
      throw new Error(t("somethingWentWrong"));
    }
    await sendReply(userId, fbDtsg, storyId, emoji);
  } catch (error) {
    console.error(error);
  }
}

function injectHTML(target) {
  const html = `<div class="emoji-wrapper x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x193iq5w xeuugli x1r8uery x1iyjqo2 xs83m0k">
      <div class="emoji-container">
        <div class="emoji-picker">
          <div class="emoji-list-container">
            <ul class="tabs-content" value="frequently_used"></ul>
            <ul class="tabs-content" value="smileys_emotion"></ul>
            <ul class="tabs-content" value="people_body"></ul>
            <ul class="tabs-content" value="animals_nature"></ul>
            <ul class="tabs-content" value="food_drink"></ul>
            <ul class="tabs-content" value="activities"></ul>
            <ul class="tabs-content" value="travel_places"></ul>
            <ul class="tabs-content" value="objects"></ul>
            <ul class="tabs-content" value="symbols"></ul>
            <ul class="tabs-content" value="flags"></ul>
          </div>
          <ul class="tabs-list-trigger">
            <li class="tabs-trigger" title="${t(
              "frequentlyUsed"
            )}" value="frequently_used">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="none"
                stroke="#9096a3">
                <path d="M12 6v6H8" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </li>
            <li class="tabs-trigger" title="${t(
              "smileysEmotion"
            )}" value="smileys_emotion" data-state="active">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="#9096a3">
                <circle cx="12" cy="12" r="10" />
                <path d="M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z" fill="#474646" />
                <circle cx="9" cy="10" r="1.2" fill="#474646" />
                <circle cx="15" cy="10" r="1.2" fill="#474646" />
              </svg>
            </li>
            <li class="tabs-trigger" title="${t(
              "peopleBody"
            )}" value="people_body">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="#9096a3"
                stroke="#9096a3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 21a8 8 0 0 0-16 0Z" />
                <circle cx="10" cy="8" r="5" />
                <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
              </svg>
            </li>

            <li class="tabs-trigger" title="${t(
              "animalsNature"
            )}" value="animals_nature">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="#9096a3">
                <path
                  d="M20.69 9.67a4.5 4.5 0 1 0-7.04-5.5 8.35 8.35 0 0 0-3.3 0 4.5 4.5 0 1 0-7.04 5.5C2.49 11.2 2 12.88 2 14.5 2 19.47 6.48 22 12 22s10-2.53 10-7.5c0-1.62-.48-3.3-1.3-4.83" />
                <path d="M11.25 17.25h1.5L12 18z" stroke="#474646" />
                <path d="m15 12 2 2" stroke="#474646" />
                <path d="m9 12-2 2" stroke="#474646" />
              </svg>
            </li>
            <li class="tabs-trigger" title="${t(
              "foodDrink"
            )}" value="food_drink">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="#9096a3">
                <path d="M5 16a2 2 0 0 0-2 2 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 2 2 0 0 0-2-2q0 0 0 0" stroke="#474646" />
                <path d="M12 16H4a2 2 0 1 1 0-4h16a2 2 0 1 1 0 4h-4.25Z" stroke="#474646" />
                <path d="M5 12a2 2 0 0 1-2-2 9 7 0 0 1 18 0 2 2 0 0 1-2 2Z" stroke="#474646" />
                <path d="m6.67 12 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2Z" stroke="#474646" />
              </svg>
            </li>
            <li class="tabs-trigger" title="${t(
              "activities"
            )}" value="activities">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="none">
                <circle cx="12" cy="12" r="10" fill="#9096a3" stroke="#474646" />
                <path d="M11.1 7.1a16.55 16.55 0 0 1 10.9 4" stroke="#474646" />
                <path d="M12 12a12.6 12.6 0 0 1-8.7 5" stroke="#474646" />
                <path d="M16.8 13.6a16.55 16.55 0 0 1-9 7.5" stroke="#474646" />
                <path d="M20.7 17a12.8 12.8 0 0 0-8.7-5 13.3 13.3 0 0 1 0-10" stroke="#474646" />
                <path d="M6.3 3.8a16.55 16.55 0 0 0 1.9 11.5" stroke="#474646" />
              </svg>
            </li>
            <li class="tabs-trigger" title="${t(
              "travelPlaces"
            )}" value="travel_places">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="#9096a3">
                <path stroke="#9096a3" d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8Z" />
                <rect width="18" height="8" x="3" y="10" rx="2" stroke="#9096a3" />
                <path d="M7 14h1" stroke="#474646" />
                <path d="M17 14h1" stroke="#474646" />

                <path d="M5 18v2" stroke="#9096a3" />
                <path d="M19 18v2" stroke="#9096a3" />
              </svg>
            </li>
            <li class="tabs-trigger" title="${t("objects")}" value="objects">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="#9096a3"
                stroke="#9096a3" stroke-width="2">
                <path
                  d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                <path d="M9 18h6" />
                <path d="M10 22h4" />
              </svg>
            </li>
            <li class="tabs-trigger" title="${t("symbols")}" value="symbols">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="none">
                <path d="M14 14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1" stroke="#9096a3" stroke-width="1.5" />
                <path d="M14 4a1 1 0 0 1 1-1" stroke="#9096a3" stroke-width="1.5" />
                <path d="M15 10a1 1 0 0 1-1-1" stroke="#9096a3" stroke-width="1.5" />
                <path d="M19 14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1" stroke="#9096a3" stroke-width="1.5" />
                <path d="M21 4a1 1 0 0 0-1-1" stroke="#9096a3" stroke-width="1.5" />
                <path d="M21 9a1 1 0 0 1-1 1" stroke="#9096a3" stroke-width="1.5" />
                <path d="m3 7 3 3 3-3" stroke="#9096a3" stroke-width="1.5" />
                <path d="M6 10V5a2 2 0 0 1 2-2h2" stroke="#9096a3" stroke-width="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1" stroke="#9096a3" stroke-width="1.5" />
              </svg>
            </li>
            <li class="tabs-trigger" title="${t("flags")}" value="flags">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="#9096a3"
                stroke="#9096a3" stroke-width="1.5">
                <path
                  d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528" />
              </svg>
            </li>
          </ul>
        </div>
      </div>
      <div class="emoji-button" role="button" aria-label="${t("more")}">
        <div class="emoji-button-tooltip x5hsz1j x10e4vud x1v7wizp x127lhb5 xjb1437 x1rgw4pv x1vjm0to xnqoqkk x16lu3ki xmqbgn8 x126bsmu x1pg5gke x117nqv4 x1nrll8i xyqdw3p x1gabggj xg8j3zb xaso8d8 x10l6tqk xuuh30 x1s85apg">${t(
          "more"
        )}</div>
        <svg class="emoji-button-svg" xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 24 24"
          stroke="pink" stroke-width="2">
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
        </svg>
      </div>
    </div>`;

  const observer = new MutationObserver(() => {
    const toolbar = document.querySelector('div.x78zum5[role="toolbar"]');
    if (!toolbar) return;
    const target = toolbar.querySelector(
      "div.x9f619.x1ja2u2z.x78zum5.x2lah0s.x1n2onr6.x1qughib.x1qjc9v5.xozqiw3.x1q0g3np.xyri2b.x1c1uobl.x18d9i69.xexx8yu",
    );

    if (!target) return;
    const target1 = target.querySelector(
      "div.x9f619.x1ja2u2z.x78zum5.x2lah0s.x1n2onr6.x1qughib.x1qjc9v5.xozqiw3.x1q0g3np.xyri2b.x1c1uobl.x18d9i69.xexx8yu",
    );
    if (!target1) return;

    if (target1.querySelector(".emoji-wrapper")) return;
    target1.insertAdjacentHTML("beforeend", html);
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

async function main() {
  const emojiButton = document.querySelector(".emoji-button");
  const emojiPicker = document.querySelector(".emoji-picker");

  emojiButton.addEventListener("click", () => {
    emojiPicker.style.display = emojiPicker.style.display === "" ? "block" : "";
  });
  const url = chrome.runtime.getURL("emoji.json");
  async function loadEmoji() {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  const data = await loadEmoji();
  rederEmoji(data);
  const triggers = document.querySelectorAll(".tabs-trigger");
  const grids = document.querySelectorAll(".tabs-content");

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      triggers.forEach((t) => t.removeAttribute("data-state"));
      grids.forEach((g) => (g.style.display = "none"));
      trigger.setAttribute("data-state", "active");
      const value = trigger.getAttribute("value");
      const tabs = document.querySelector(`.tabs-content[value="${value}"]`);

      if (tabs) tabs.style.display = "flex";
    });
  });
}

async function getFrequentlyUsed() {
  return await chrome.storage.local.get("frequently_used");
}

async function addNewFrequentlyUsed(item) {
  const { frequently_used: list = [] } =
    await chrome.storage.local.get("frequently_used");
  if (list.some((p) => p.unified === item.unified)) return;
  list.push(item);
  const test = await getFrequentlyUsed();
  const test1 = test.frequently_used;
  rederEmoji(test1, "frequently_used");
  if (list.length > 25) list.shift();
  await chrome.storage.local.set({ frequently_used: list });
}

async function rederEmoji(emoji, category) {
  emoji.forEach((p) => {
    const cat = category || p.category;
    const grid = document.querySelector(
      `.tabs-content[value="${formatCategory(cat)}"]`,
    );
    if (!grid) return;
    const li = document.createElement("li");
    const name = formatName(p.name);
    li.title = name;
    li.dataset.emoji = unicodeToEmoji(p.unified);
    const img = document.createElement("img");
    img.src = chrome.runtime.getURL(`64/${p.unified.toLowerCase()}.png`);
    img.alt = name;
    li.addEventListener("click", () => {
      handleReaction(li.getAttribute("data-emoji"));
      addNewFrequentlyUsed(p);
      const rect = li.getBoundingClientRect();
      const imageAnimation = document.createElement("img");
      imageAnimation.src = li.querySelector("img").src;
      imageAnimation.className = "emoji-click-animation";
      imageAnimation.style.left = rect.left + window.scrollX + "px";
      imageAnimation.style.top = rect.top + window.scrollY + "px";
      imageAnimation.style.width = li.querySelector("img").width + "px";
      document.body.appendChild(imageAnimation);

      const amplitude = Math.random() * 100 - 50;
      const duration = 1000;
      let start = null;

      function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = (timestamp - start) / duration;
        if (progress > 1) {
          imageAnimation.remove();
          return;
        }
        const y = -progress * 250;
        const x = amplitude * Math.sin(progress * Math.PI * 2);
        imageAnimation.style.transform = `translate(${x}px, ${y}px)`;
        imageAnimation.style.opacity = 1 - progress;
        requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
    });
    li.appendChild(img);
    grid.appendChild(li);
  });
}

function watchBtnMore() {
  const observer = new MutationObserver(() => {
    const btnMore = document.querySelector(".emoji-button");
    if (btnMore) {
      observer.disconnect();
      main();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

injectHTML();
watchBtnMore();
