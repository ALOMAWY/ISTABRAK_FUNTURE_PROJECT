// Start Landing

let screenText = <HTMLElement>(
  document.querySelector(
    ".landing-screen .widgets-layer .container-75 .row .text-area"
  )
);

window.addEventListener("scroll", () => {
  screenText?.classList.add("position-relative");
  screenText?.classList.add("z-1");

  let scrollSize = scrollY;

  if (scrollSize <= 800 && document.documentElement.clientWidth > 768)
    screenText.style.top = scrollSize + "px";
});

// End Landing

// Start Customers Talk

const testimonials = [
  {
    imageSrc: "assets/images/testimonials.jpg",
    comment: `”The mati I bought for my
              daughter is designed with
              quality materials that
              protect her against the
              risk of allergy “`,
    personLogoSrc: "assets/images/user.png",
    personFirstName: "Ali",
    personLastName: "Sa3d",
  },
  {
    imageSrc: "assets/images/testimonials1.jpg",
    comment: `”I love the design and
              quality of the products.
              They are perfect for my
              sensitive skin.“`,
    personLogoSrc: "assets/images/user.png",
    personFirstName: "Hana",
    personLastName: "Ahmed",
  },
  {
    imageSrc: "assets/images/testimonials2.jpg",
    comment: `”The customer service was
              excellent and the product
              exceeded my expectations.“`,
    personLogoSrc: "assets/images/user.png",
    personFirstName: "Omar",
    personLastName: "Khan",
  },
  {
    imageSrc: "assets/images/testimonials3.jpg",
    comment: `”Highly recommend to anyone
              looking for quality and
              durability. Absolutely worth
              every penny.“`,
    personLogoSrc: "assets/images/user.png",
    personFirstName: "Lina",
    personLastName: "Hussein",
  },
  {
    imageSrc: "assets/images/testimonials4.jpg",
    comment: `”A great experience overall.
              The product is top-notch and
              delivery was quick and easy.“`,
    personLogoSrc: "assets/images/user.png",
    personFirstName: "Zaid",
    personLastName: "Salim",
  },
];

let prevButton = <HTMLElement>document.getElementById("gallery-prev-button");

let nextButton = <HTMLElement>document.getElementById("gallery-next-button");

let tracker = 0;

prevButton.addEventListener("click", () => {
  tracker == 0 ? (tracker = testimonials.length - 1) : tracker--;
  setContentInsertHTML(tracker);
});
nextButton.addEventListener("click", () => {
  tracker == testimonials.length - 1 ? (tracker = 0) : tracker++;
  setContentInsertHTML(tracker);
});

function setContentInsertHTML(tracker: number): void {
  let image = <HTMLImageElement>(
    document.querySelector(".gallery-site .content-holder img")
  );

  let comment = <HTMLElement>(
    document.querySelector(".gallery-site .content-holder blockquote")
  );

  let personImage = <HTMLImageElement>(
    document.querySelector(
      ".gallery-site .content-holder .person .person-logo img"
    )
  );

  let personFirstName = <HTMLElement>(
    document.querySelector(
      ".gallery-site .content-holder .person .name .first-name"
    )
  );

  let personLastName = <HTMLElement>(
    document.querySelector(
      ".gallery-site .content-holder .person .name .last-name"
    )
  );

  image.src = testimonials[tracker].imageSrc;

  const PROMISE = new Promise((resolve, rejected) => {
    function setData() {
      comment.innerHTML = testimonials[tracker].comment;

      personImage.src = testimonials[tracker].personLogoSrc;

      personFirstName.innerHTML = testimonials[tracker].personFirstName;

      personLastName.innerHTML = testimonials[tracker].personLastName;
    }

    if (image.getAttribute("src") == testimonials[tracker].imageSrc) {
      resolve(setData());
    } else {
      rejected(
        console.log(
          image.getAttribute("src") === testimonials[tracker].imageSrc
        )
      );
    }
  });
}

// End Customers Talk
