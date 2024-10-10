let counters = document.querySelectorAll(".counter");

let countersContainer = document.querySelector(".counters") as HTMLElement;

let countStart: boolean = true;

let scrollHandler = () => {
  if (
    window.scrollY + document.documentElement.clientHeight >=
      countersContainer.offsetTop + countersContainer.clientHeight &&
    countStart
  ) {
    countStart = false;
    counters.forEach((e) => {
      countStart = false;
      let element = e as HTMLElement;

      let count: number = +(element.dataset.count ?? 0);

      let counter = 0;
      let updater = setInterval(() => {
        if (count >= counter) {
          element.dataset.type == "percent"
            ? (element.innerHTML = `${counter}%`)
            : (element.innerHTML = `${counter}`);

          counter++;
        } else {
          clearInterval(updater);
        }
      }, 500 / count);
    });
    window.removeEventListener("scroll", scrollHandler);
  }
};

window.addEventListener("scroll", scrollHandler);
