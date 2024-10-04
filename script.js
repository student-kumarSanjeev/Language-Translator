const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("#transfer");
const fromText = document.querySelector("#fromText");
const toText = document.querySelector("#toText"); // Fix: Ensure this matches the rest of the code
const icons = document.querySelectorAll("img");

selectTag.forEach((tag, id) => {
  for (const conuntriesCode in countries) {
    let selected;
    if (id == 0 && conuntriesCode == "en-GB") {
      selected = "selected";
    } else if (id == 1 && conuntriesCode == "hi-IN") {
      selected = "selected";
    }

    let option = `<option value="${conuntriesCode}" ${selected}>${countries[conuntriesCode]}</option>`;
    tag.insertAdjacentHTML("beforeend", option);
  }
});

translateBtn.addEventListener("click", () => {
  let Text = fromText.value,
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
  const apiULR = `https://api.mymemory.translated.net/get?q=${Text}!&langpair=${translateFrom}|${translateTo}`;

  fetch(apiULR)
    .then((res) => res.json())
    .then((data) => {
      toText.value = data.responseData.translatedText; // Fix: use toText without the 'B'
    });
});

icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    if (target.classList.contains("copy")) {
      if (target.id == "from") {
        navigator.clipboard.writeText(fromText.value);
      } else {
        navigator.clipboard.writeText(toText.value); // Fix: use toText without the 'B'
      }
    } else {
      let utterance;
      if (target.id == "from") {
        utterance = new SpeechSynthesisUtterance(fromText.value);
        utterance.lang = selectTag[0].value;
      } else {
        utterance = new SpeechSynthesisUtterance(toText.value); // Fix: use toText without the 'B'
        utterance.lang = selectTag[1].value;
      }
      speechSynthesis.speak(utterance);
    }
  });
});
