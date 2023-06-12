const ratings = document.querySelectorAll("#review-rating");
const averageRating = document.querySelector(".average-rating");
const star = '<i class="fa-solid fa-star" style="color:#ffcc26;"></i>';
const half = '<i class="fa-solid fa-star-half" style="color:#ffcc26;"></i>';

function makeStar(ratingNum, htmlElement) {
  let ratingStar = star.repeat(Math.floor(ratingNum));

  if (ratingNum - Math.floor(ratingNum) >= 0.5) {
    ratingStar += half;
  }
  htmlElement.innerHTML = ratingStar;
}

if (ratings) {
  let sum = 0;
  for (let rating of ratings) {
    sum += parseInt(rating.textContent);
  }
  let average = sum;
  average /= ratings.length;
  makeStar(average, averageRating);
}

for (let rating of ratings) {
  makeStar(rating.textContent, rating);
}
