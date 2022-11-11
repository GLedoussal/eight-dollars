function onTextEnabledChange() {
  const textEnabled = document.getElementById("textEnabled").checked;
  // hide the other text options if text is disabled
  const elements = document.getElementsByClassName("text-option");
  for (const elm of elements) {
    elm.style.display = textEnabled ? "block" : "none";
  }
}

function saveOptions() {
  const memeMode = document.getElementById("memeMode").checked;
  const textEnabled = document.getElementById("textEnabled").checked;
  const removeBlueMark = document.getElementById("removeBlueMark").checked;
  const textVerifiedLabel = document.getElementById("textVerifiedLabel").value;
  const twitterBlueVerifiedLabel = document.getElementById(
    "textTwitterBlueLabel"
  ).value;
  const textEnableBorder = document.getElementById("textEnableBorder").checked;
  chrome.storage.sync.set(
    {
      memeMode,
      textEnabled,
      textOptions: {
        verifiedLabel: textEnabled ? textVerifiedLabel : "",
        twitterBlueLabel: textEnabled ? twitterBlueVerifiedLabel : "",
        enableBorder: textEnabled ? textEnableBorder : true
      },
      removeBlueMark: removeBlueMark ? removeBlueMark : false
    },
    function () {
      const status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(function () {
        status.textContent = "";
      }, 750);
    }
  );
}

function restoreOptions() {
  chrome.storage.sync.get(
    {
      memeMode: false,
      textEnabled: true,
      textOptions: {
        verifiedLabel: "Verified",
        twitterBlueLabel: "Paid",
        enableBorder: true,
      },
      removeBlueMark: false
    },
    function (items) {
      document.getElementById("memeMode").checked = items.memeMode;
      document.getElementById("textEnabled").checked = items.textEnabled;
      document.getElementById("removeBlueMark").checked = items.removeBlueMark;
      document.getElementById("textVerifiedLabel").value =
        items.textOptions.verifiedLabel;
      document.getElementById("textTwitterBlueLabel").value =
        items.textOptions.twitterBlueLabel;
      document.getElementById("textEnableBorder").checked =
        items.textOptions.enableBorder;
      onTextEnabledChange();
    }
  );
}

document.addEventListener("DOMContentLoaded", function () {
  restoreOptions();
  document
    .getElementById("textEnabled")
    .addEventListener("change", onTextEnabledChange);
  document.getElementById("save").addEventListener("click", saveOptions);
});
