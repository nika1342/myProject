const birthdateInput = document.getElementById("birthdate");
const output = document.getElementById("output");
const countdown = document.getElementById("countdown");
const calculateBtn = document.getElementById("calculateBtn");

const today = new Date();
birthdateInput.max = today.toISOString().split("T")[0];

calculateBtn.addEventListener("click", calculateInfo);

function calculateInfo() {
  output.innerText = "";
  countdown.innerText = "";

  birthdateInput.classList.remove("error");

  const birthdateStr = birthdateInput.value;
  const genderRadio = document.querySelector('input[name="gender"]:checked');
  const gender = genderRadio ? genderRadio.value : null;

  if (!birthdateStr) {
    birthdateInput.classList.add("error");
    output.innerText = "გთხოვთ, ჩაწერეთ სწორი დაბადების თარიღი.";
    return;
  }
  if (!gender) {
    output.innerText = "გთხოვთ, აირჩიოთ სქესი.";
    return;
  }

  const birthDate = new Date(birthdateStr);
  const now = new Date();

  const minYear = now.getFullYear() - 100;
  if (birthDate.getFullYear() < minYear) {
    birthdateInput.classList.add("error");
    output.innerText = `დაბადების წელი არ შეიძლება იყოს ${minYear} წლამდე.`;
    return;
  }

  if (birthDate > now) {
    birthdateInput.classList.add("error");
    output.innerText = "დაბადების თარიღი ვერ იქნება მომავალი თარიღი.";
    return;
  }

  let ageYears = now.getFullYear() - birthDate.getFullYear();
  const m = now.getMonth() - birthDate.getMonth();
  const d = now.getDate() - birthDate.getDate();
  if (m < 0 || (m === 0 && d < 0)) {
    ageYears--;
  }

  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();

  let zodiacSign = "";
  let season = "";

  if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) {
    zodiacSign = "მერწყული";
    season = "ზამთარი";
  } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
    zodiacSign = "თევზები";
    season = "ზამთარი";
  } else if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) {
    zodiacSign = "ვერძი";
    season = "გაზაფხული";
  } else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) {
    zodiacSign = "ტყუპები";
    season = "გაზაფხული";
  } else if ((month == 5 && day >= 21) || (month == 6 && day <= 21)) {
    zodiacSign = "კირჩხიბი";
    season = "გაზაფხული";
  } else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
    zodiacSign = "ლომი";
    season = "ზაფხული";
  } else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
    zodiacSign = "ქალწული";
    season = "ზაფხული";
  } else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
    zodiacSign = "სასწორი";
    season = "შემოდგომა";
  } else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) {
    zodiacSign = "მორიელი";
    season = "შემოდგომა";
  } else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) {
    zodiacSign = "მშვილდოსანი";
    season = "შემოდგომა";
  } else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) {
    zodiacSign = "მერწყული";
    season = "ზამთარი";
  } else {
    zodiacSign = "მერწყული";
    season = "ზამთარი";
  }

  const year = birthDate.getFullYear();
  let leapYearMsg = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
    ? "თქვენ დაბადებული ხართ ნაკიან წელს."
    : "თქვენ დაბადებული ხართ ჩვეულებრივ წელს.";

  // სქესის მიხედვით ტექსტი
  let genderText = gender === "male" ? "ბიჭი" : "გოგო";

  output.innerText = `თქვენი ზოდიაქოა: ${zodiacSign}\n`
    + `თქვენ ხართ ${ageYears} წლის ${genderText}\n`
    + `დაბადების სეზონი: ${season}\n`
    + leapYearMsg;

  let nextBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (nextBirthday < now) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  }

  const diffTime = nextBirthday - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  countdown.innerText = `დაბადებისდღემდე დარჩა: ${diffDays} დღე.`;
}
